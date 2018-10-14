var router = require('express').Router();
var db = require('../../lib/database')();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.memberHasAuth);

var indexController = require('./controllers/index');
router.get('/dashboard', indexController);




//******************************************************* */
//                    DASHBOARD.
//******************************************************* */

router.post('/event/view', (req, res)=>{
    db.query('select * from tbleventclass', (err, out) => {
        res.send(out)
    })
})

function totalPayment (req, res, next) {
    const query = `SELECT * from tblpayment join tbluser on tblpayment.userid = tbluser.userid where tbluser.userid = ?`
    db.query(query, [ req.session.member.userid ], ( err, results, fields ) => {
        if (err) console.log(err)
        let total = 0
        for ( i=0; i < results.length; i++ ){
            total += results[i].amount
        }
        req.total = total
        return next()
        
    })
}

//******************************************************* */
//                      PROFILE.
//******************************************************* */

// VIEW
function initial(req, res, next) {
    const query = `
    select * from tbluser
    join tbppt on tbppt.memid = tbluser.userid
    join tbltrainer on tbltrainer.trainerid = tbppt.trainid
    join tblmembership on tblmembership.usersid = tbluser.userid
    join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
    join tblcat on tblcat.membershipID = tblmemrates.memcat
    join tblmemclass on tblmemclass.memclassid = tblmemrates.memclass
    join tblpayment on tblpayment.userid = tbluser.userid
    where usertype = 2  
    AND tbluser.userid = ?
    group by tbluser.userid
    `
    db.query(query, [req.session.member.userid], function (err, results, fields) {
        if (err) return res.send(err);
        console.log(results, '<<<<<<<<<<<<<<<< initial')
        results.forEach(( results ) => {
            results.acceptdate = moment(results.acceptdate).format("LL");
            results.userbday = moment(results.userbday).format("MMM DD, YYYY");
        })
        results.forEach(( results ) => {
            results.expirydate = moment(results.expirydate).format("MMM DD, YYYY");
            results.acceptdate = moment(results.acceptdate).format("MMM DD, YYYY");
            results.paymentdate = moment(results.paymentdate).format("MMM DD, YYYY");
        })

        if (results.length == 0){
            db.query(`
            select * from tbluser 
            join tblmembership on tblmembership.usersid = tbluser.userid
            join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
            join tblcat on tblcat.membershipID = tblmemrates.memcat
            join tblmemclass on tblmemclass.memclassid = tblmemrates.memclass 
            join tblpayment on tblpayment.userid = tbluser.userid
            where usertype= 2 and tbluser.userid = ?
            `,[req.session.member.userid], (err, results,fields) => {
                if (err) return res.send(err)
                results.forEach(( results ) => {
                    results.signdate = moment(results.signdate).format("LL");
                    results.userbday = moment(results.userbday).format("MMM DD, YYYY");
                })
                results.forEach(( results ) => {
                    results.expirydate = moment(results.expirydate).format("MMM DD, YYYY");
                    results.acceptdate = moment(results.acceptdate).format("MMM DD, YYYY");
                    results.paymentdate = moment(results.paymentdate).format("MMM DD, YYYY");
                })
                req.initial = results;
                return next()
            })
        }
        else {
            req.initial = results;
            return next()
        }
    })
}

// function init(req, res, next) {
//     const query = `
//     select * from tbluser 
//     join tblmembership on tblmembership.usersid = tbluser.userid
//     join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
//     join tblcat on tblcat.membershipID = tblmemrates.memcat
//     join tblmemclass on tblmemclass.memclassid = tblmemrates.memclass;
//     `
//     db.query(query, [req.session.member.userid], function (err, results, fields) {
//         if (err) return res.send(err);
        
//         results.forEach(( results ) => {
//             results.signdate = moment(results.signdate).format("LL");
//             results.userbday = moment(results.userbday).format("MMM DD, YYYY");
//         })
//         results.forEach(( results ) => {
//             results.expiry = moment(results.expiry).format("LL");
//         })

//         req.init = results
//         return next()
//     })
// }

router.post('/profile/edit', ( req,res ) => {
    const query = `UPDATE tbluser SET useraddress = ?, usermobile = ?, useremail = ?, userusername = ? where userid = ?`
    db.query(query, [
        req.body.address,
        req.body.contact,
        req.body.email,
        req.body.username,
        req.session.member.userid
    ], (err, out) => {
        if (err) console.log(err)
    })
})


//******************************************************* */
//                     CLASSES.
//******************************************************* */

// VIEW
function viewClass(req, res, next) {
    db.query('select * from tbleventclass where type = 1', function (err, results, fields) {
        if (err) return res.send(err);
        req.viewClass = results;
        return next();
    })
}

function joinedClasses(req, res, next) {
    const query= `SELECT * FROM tbleventclass 
    join tbluce on tbluce.intUCEClassID = tbleventclass.eventclassid
    join tbluser on tbluser.userid = tbluce.intUCEUserID
    where type = 1 AND userid = ?
    `
    db.query(query, [req.session.member.userid], function (err, results, fields) {
        if (err) return res.send(err);
        req.joinedClasses = results;
        req.classIds = []
        results.forEach(( results ) => {
        req.classIds.push(results.eventclassid)
        })
        
        return next();
    })

}

router.post('/class/join', (req, res) => {
    db.query("INSERT INTO tbluce (intUCEUserID, intUCEClassID) VALUES (?, ?)", [req.session.member.userid, req.body.id], (err, results, fields) => {
      db.query('UPDATE tbleventclass SET slot= slot - 1 where eventclassid=?', [req.body.id],(err, results, fields) => {
        if (err) return res.send(err);
        });
    });
})

  
router.post('/class/resign', (req, res) => {
    db.query("DELETE FROM tbluce WHERE intUCEID = ?", [req.body.uceid], (err, results, fields) => {
        db.query('UPDATE tbleventclass SET slot= slot + 1 where eventclassid=?', [req.body.classid],(err, results, fields) => {
            if (err) return res.send(err);
        });
    });
})



//******************************************************* */
//                     EVENT.
//******************************************************* */

// VIEW
function viewEvent(req, res, next) {
    db.query('select * from tbleventclass where type = 2', function (err, results, fields) {
        if (err) return res.send(err);
        
        results.forEach((results) => {
            results.startdate = moment(results.startdate,'MM/DD/YYYY').format('MMM DD, YYYY');
            results.enddate = moment(results.enddate,'MM/DD/YYYY').format('MMM DD, YYYY');
            // results.starttime = moment(results.starttime,'hh:mm A').format('hh:mm A');
            // results.endtime = moment(results.endtime,'hh:mm A').format('hh:mm A');
        })
        
        req.viewEvent = results;
        return next();
    })
}

function joinedEvents(req, res, next) {
    const query= `SELECT * FROM tbleventclass 
    join tbluce on tbluce.intUCEClassID = tbleventclass.eventclassid
    join tbluser on tbluser.userid = tbluce.intUCEUserID
    where type = 2 AND userid = ?
    `
    db.query(query, [req.session.member.userid], function (err, results, fields) {
        if (err) return res.send(err);
        req.joinedEvents = results;
        req.eventIds = []
        results.forEach(( results ) => {
            req.eventIds.push(results.eventclassid)
        })
        
        return next();
    })

}

router.post('/event/join', (req, res) => {
    db.query("INSERT INTO tbluce (intUCEUserID, intUCEClassID) VALUES (?, ?)", [req.session.member.userid, req.body.id], (err, results, fields) => {
      db.query('UPDATE tbleventclass SET slot= slot - 1 where eventclassid=?', [req.body.id],(err, results, fields) => {
        if (err) return res.send(err);
        });
    });
})


router.post('/event/resign', (req, res) => {
    db.query("DELETE FROM tbluce WHERE intUCEID = ?", [req.body.uceid], (err, results, fields) => {
        db.query('UPDATE tbleventclass SET slot= slot + 1 where eventclassid=?', [req.body.eventid],(err, results, fields) => {
            if (err) return res.send(err);
        });
    });
})

//******************************************************* */
//                    TRAINER.
//******************************************************* */

// APPLY
router.post('/trainer/apply', (req, res) => {
    const query = `
    INSERT INTO tbppt (memid, trainid, status) VALUES (?, ?, 2)
    `
    db.query(query, [ req.session.member.userid, req.body.trainerId ], (err) => {
        if (err) return res.send(err)
    })
})


// VIEW
function viewTrainers(req, res, next) {
    const query = `
        SELECT * 
        FROM tbltrainer
        JOIN tblspecial on tbltrainer.trainerspecialization = tblspecial.specialID
        JOIN tblbranch on tbltrainer.trainerbranch = tblbranch.branchID  
    `
    db.query(query, function (err, results, fields) {
        if (err) return res.send(err);
        req.viewTrainers = results;
        return next();
    })
}

function check(req, res, next){
    const query =`
    SELECT * from tbppt join tbluser on tbppt.memid = tbluser.userid where tbluser.userid = ?
    `
    db.query(query, [req.session.member.userid], function(err, results, fields){
        console.log(results[0], '<< CHECKING IF MAY PERSONAL TRAINER')
        if(err) return res.send(err);
        // req.check = results[0];
        if (results[0] == undefined){
           return next()
        }
        else {
            req.status = results[0].status
            if (req.status == 1){
                res.redirect('accepted')
            } 
            else if (req.status == 2) {
                res.redirect('pending')
            } 
            else {
                res.send('You are neither accepted, pending, or a member')
            }
        }
    })
}



//******************************************************* */
//                    Accepted.
//******************************************************* */

function checkForChange(req, res, next){
    const query = `SELECT * from tblchange join tbluser on tbluser.userid = tblchange.memid where userid = ?`
    db.query(query, [ req.session.member.userid ], (err, results, fields) => {
        if (results.length != 0){
            res.redirect('change')
        }
        return next();
    })
}

router.post('/buy', (req, res) => {
    db.query('UPDATE tblsession SET amount = ? where sessionID = ?', [ req.body.amount, req.body.sessionID ] , (err) => {
        db.query('UPDATE tblsession SET sessionStatus = 2 where sessionID = ?', [ req.body.sessionID ], (err) => {
            if (err) res.redirect('accepted')
        })
    })
})


//View Schedule
router.post('/pt/schedule',(req, res)=>{
    const query =`SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid join tbltrainer on tbltrainer.trainerid = tbppt.trainid where userid = ?`
    db.query(query,[req.session.member.userid],(err,out)=>{
      res.send(out)
    })
  })

router.post('/schedule/reject', (req, res) => {
    const query = `
    UPDATE tbppt SET 
    scheduleStatus = 2, 
    description = ? 
    WHERE PTid = ?
    `
    db.query(query, [ req.body.desc, req.body.rejId ], (err) => {
        if (err) console.error(err);
    })
})

router.post('/schedule/reject/undo', (req, res) => {
    const query = `
    UPDATE tbppt SET 
    scheduleStatus = 1, 
    description = NULL
    WHERE PTid = ?
    `
    db.query(query, [ req.body.rejId ], (err) => {
        if (err) console.error(err);
    })
})


function personalTrainer(req, res, next) {
    const query =  `
    SELECT * FROM tbltrainer 
    join tblbranch on tblbranch.branchID = tbltrainer.trainerbranch
    join tbppt on tbppt.trainid = tbltrainer.trainerid
    join tblsession on tbppt.sessionID = tblsession.sessionID
    join tbluser on tbluser.userid = tbppt.memid 
    join tblmembership on tblmembership.usersid = tbluser.userid
    join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
    join tblcat on tblcat.membershipID = tblmemrates.memcat
    join tblmemclass on tblmemclass.memclassid = tblmemrates.memclass
    where tbluser.userid = ?
     `
    db.query(query, [req.session.member.userid], (err, results, fields) => {
        if(err) return res.send(err)
        req.pt = results
        req.pt[0].trainerbday = moment().diff(req.pt[0].trainerbday, 'years', false)
        return next();
    })
}

router.post('/change', ( req,res ) => {
    const query = ` 
    INSERT INTO tblchange (status, memid, trainid, sender, description) VALUES (2, ?, ?, 'Member', ?)
    `
    db.query(query, [
        req.session.member.userid,
        req.body.trainerid,
        req.body.reason
    ], (err, out) => {
        if (err) console.log(err)
    })
})




// ---------- F U N C T I O N S ---------- //
function dashboard(req, res, next) {
    res.render('member/views/dashboard', {
        profs: req.initial,
        total :req.total
        // classes: req.viewClass,
        // eves: req.viewEvent
    })
    return next();
}

function profile(req, res, next) {
    res.render('member/views/profile', {
        profs: req.initial
    })
    return next();
}

function events(req, res, next) {
    res.render('member/views/events', { 
        joinedEvents: req.joinedEvents,
        eventIds: req.eventIds,
        profs: req.initial,
        eves: req.viewEvent

    });
    return next();
}
    
function classes(req, res, next) {
    res.render('member/views/classes', {
        joinedClasses: req.joinedClasses,
        classIds: req.classIds,
        classes: req.viewClass, 
        profs: req.initial 
    });
    return next();
}

function billing(req, res, next) {
    res.render('member/views/billing', {
        profs: req.initial 
    });
    return next();
}

function trainer(req, res, next) {
    res.render('member/views/trainer', {
        profs: req.initial,
        trainers: req.viewTrainers
    })
}


function pending(req, res, next) {
    res.render('member/views/pending', {
        profs: req.initial
    });
    return next();
}

function accepted(req, res, next) {
    res.render('member/views/accepted', {
        profs: req.initial,
        pt :req.pt
    });
    return next();
}

function change(req, res, next) {
    res.render('member/views/change', {
        profs: req.initial
    });
    return next();
}

// ------------- GET ---------------//
router.get('/', initial, totalPayment, dashboard);
router.get('/profile', initial, profile);
router.get('/events', joinedEvents, viewEvent, initial, events);
router.get('/trainers', initial, check, viewTrainers, trainer);
router.get('/classes', joinedClasses, viewClass, initial, classes);
router.get('/billing', initial, billing);
// trainer
router.get('/pending', initial, pending);
router.get('/accepted', checkForChange, personalTrainer, initial, accepted);
router.get('/change', initial, change);
exports.member = router;