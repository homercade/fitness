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

    var now = moment().format('MM/DD/YYYY')

    db.query('select * from tbleventclass', (err, out) => {
        for( i = 0; i < out.length; i++){
            if (out[i].enddate != null){
                if (out[i].enddate > now){
                    continue
                } 
                else {
                    db.query(`UPDATE tbleventclass SET status = 0 where eventclassid = ?`, [ out[i].eventclassid ], (err, out) => {
                    })
                }
            }
        }
        
        db.query(`select * from tbleventclass where status is NULL`, (err, out) => {
            res.send(out)
        })
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

function dueEvents( req,res,next ){
    var date = new Date()
    var now = moment(date).format('YYYY-MM-DD')
    var now2 = moment(date).format()

    const query=`
    SELECT * FROM tbleventclass 
    JOIN tbluce on tbluce.intUCEClassId  = tbleventclass.eventclassid
    JOIN tbluser on tbluser.userid = tbluce.intUCEUserId
    where tbluser.userid = ? AND type = 2
    `
    db.query(query, [ req.session.member.userid ], (err, results) =>{

        if (results.length != 0){
            var tomorrow = moment(results[0].enddate).subtract(1, 'day').format('YYYY-MM-DD')
            if (results.length != 0){
                if ( tomorrow == now ){
                    db.query('SELECT * FROM tblnotification where memid = ?',[ req.session.member.userid ], (err, results)=>{
                        if(results.length != 0 ){
                            if(moment(results[0].notifdate).format('YYYY-MM-DD')!= now){
                                db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (6, ?, "unread", ?)',
                                [ req.session.member.userid, now2 ], ( err, results ) => {
                                    notification (req,res,next)
                                })
                            }
                            else{
                                notification (req,res,next)
                            }
                        }
                        else{
                            db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (6, ?, "unread", ?)',
                            [ req.session.member.userid, now2 ], ( err, results ) => {
                                notification (req,res,next)
                            })
                        }
                    })
                }
            }
            else{
                notification (req,res,next)
            }
        }
        else{
            notification (req,res,next)
        }
        return next()
    })
    
}

function dueDate (req,res,next){
    
    var date = new Date()
    var now = moment(date).format('YYYY-MM-DD')
    var now2 = moment(date).format()

    const query = `
    SELECT * FROM tblmembership 
    JOIN tbluser on tbluser.userid = tblmembership.usersid 
    WHERE usersid = ?
    `
    db.query(query, [ req.session.member.userid ], ( err,results )=>{
        if (results != 0){
            var week = moment(results[0].expirydate).subtract(7, 'days').format('YYYY-MM-DD')  
            var fourDays = moment(results[0].expirydate).subtract(4, 'days').format('YYYY-MM-DD')
            var tomorrow = moment(results[0].expirydate).subtract(1, 'day').format('YYYY-MM-DD')

            if ( now == week){
                db.query('SELECT * FROM tblnotification where memid = ?',[ req.session.member.userid ], (err, results)=>{
                    if(results.length != 0 ){
                        if(moment(results[0].notifdate).format('YYYY-MM-DD')!= now){
                            db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (1, ?, "unread", ?)',
                            [ req.session.member.userid, now2 ], ( err, results ) => {
                                notification (req,res,next)
                            })
                        }
                        else{
                            notification (req,res,next)
                        }
                    }
                    else{
                        db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (1, ?, "unread", ?)',
                        [ req.session.member.userid, now2 ], ( err, results ) => {
                            notification (req,res,next)
                        })
                    }
                })
            }
            else if ( now == fourDays){
                db.query('SELECT * FROM tblnotification where memid = ?',[ req.session.member.userid ], (err, results)=>{
                    if(results.length != 0 ){
                        if(moment(results[0].notifdate).format('YYYY-MM-DD')!= now){
                            db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (2, ?, "unread", ?)',
                            [ req.session.member.userid, now2 ], ( err, results ) => {
                                notification (req,res,next)
                            })
                        }
                        else{
                            notification (req,res,next)
                        }
                    }
                    else{
                        db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (2, ?, "unread", ?)',
                        [ req.session.member.userid, now2 ], ( err, results ) => {
                            notification (req,res,next)
                        })
                    }
                })
            }
            else if ( tomorrow == now ){
                db.query('SELECT * FROM tblnotification where memid = ?',[ req.session.member.userid ], (err, results)=>{
                    if(results.length != 0 ){
                        if(moment(results[0].notifdate).format('YYYY-MM-DD')!= now){
                            db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (3, ?, "unread", ?)',
                            [ req.session.member.userid, now2 ], ( err, results ) => {
                                notification(req,res,next)
                            })
                        }
                        else{
                            notification(req,res,next)
                        }
                    }
                    else{
                        db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (3, ?, "unread", ?)',
                        [ req.session.member.userid, now2 ], ( err, results ) => {
                            notification(req,res,next)
                        })
                    }
                })
            }
        }else{
            notification (req,res,next)
        }
        notification (req,res,next)
    })
}

function notification (req,res,next){
    const query = `
    SELECT * FROM tblnotification 
    JOIN tblnotificationdesc on tblnotification.notifdescid = tblnotificationdesc.notifdescid 
    JOIN tbluser on tbluser.userid = tblnotification.memid
    WHERE memid = ? AND (tblnotificationdesc.notifdescid = 1 OR tblnotificationdesc.notifdescid = 2 OR tblnotificationdesc.notifdescid = 3)
    order by notifid desc limit 3
        `
    db.query(query, [ req.session.member.userid ], ( err,results ) => {
        if (results.length != 0){
            results.forEach(( results ) => {
                results.notifdate = moment(results.notifdate).fromNow()
            })
            req.notifs = results
            return next()
        }
        else {
            console.log('walang notifs gago')
            req.notifs = results
            return next()
        }
    })
}



//******************************************************* */
//                      PROFILE.
//******************************************************* */

function fee (req,res,next){
    db.query('SELECT * from tblgenera where generalID = 5', (err,results)=>{
        req.fee = results[0]
        return next()
    })
}
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
            group by tbluser.userid
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
                console.log(req.initial, '2nd query')
                return next()
            })
        }
        else {
            req.initial = results;
            console.log(req.initial, '1st query')
            return next()
        }
    })
}


router.post('/profile/edit', ( req,res ) => {
    const query = `UPDATE tbluser SET useraddress = ?, usermobile = ?, useremail = ?, userusername = ?, userpassword = ? where userid = ?`
    db.query(query, [
        req.body.address,
        req.body.contact,
        req.body.email,
        req.body.username,
        req.body.password,
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
    db.query('select * from tbleventclass where type = 1 AND status is NULL', function (err, results, fields) {
        if (err) return res.send(err);
      
        results.forEach(( results ) => {
            results.starttime = moment(results.starttime, 'HH:mm:ss').format('hh:mm A')
            results.endtime = moment(results.endtime, 'HH:mm:ss').format('hh:mm A')
        })
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
    db.query('select * from tbleventclass where type = 2 AND status = 0', function (err, results, fields) {
        if (err) return res.send(err);     
        results.forEach((results) => {
            results.startdate = moment(results.startdate,'MM/DD/YYYY').format('MMM DD, YYYY');
            results.enddate = moment(results.enddate,'MM/DD/YYYY').format('MMM DD, YYYY');
            results.starttime = moment(results.starttime,'HH:mm:ss').format('hh:mm A');
            results.endtime = moment(results.endtime,'HH:mm:ss').format('hh:mm A');
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

function checkFinishedSession(req, res, next) {
    const today = moment().format('YYYY-MM-DD')     
    console.log("TODAY: ", today)
    const query = `SELECT * from tbppt`;
    const query2 = `UPDATE tblsession SET session_count = session_count - 1 where sessionID = ?`;
    const query3 = `UPDATE tbppt SET scheduleStatus = 0 where PTid = ?`;

    db.query(query, (err, results) => {
        if (err) console.error(err)
            results.forEach( result => {
                const date = result.sessionDate
                if ( date < today && result.scheduleStatus != 0){
                    db.query(query2, [result.sessionID], (err) => {
                        if (err) console.error(err)
                        console.log("SUCCESS")
                        db.query(query3, [result.PTid], (err) => {
                            if (err) console.error(err)
                            console.log("SUCCESS")
                        })
                    })
                }
            })
        console.log("TBPPT: ",results)
        return next()
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
    const query =`SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid join tbltrainer on tbltrainer.trainerid = tbppt.trainid where userid = ? AND scheduleStatus != 0`
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
// Reschedule

router.post('/trainee/reschedule', (req, res) => {
    const query = `
    UPDATE tbppt SET 
    sessionDate = ?, 
    sessionTime = ?, 
    scheduleStatus = '1', 
    description = NULL 
    WHERE PTid = ?`
  
    db.query(query, [req.body.reschedDate, req.body.reschedTime, req.body.reschedId], (err, results) => {
      if (err) {
        console.log(err)
        res.redirect('trainee')
      }
    })
  })


// Change Trainer
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

//- History
function viewHistory ( req,res,next ){
    db.query('SELECT * from tbppt JOIN tbluser on tbluser.userid = tbppt.memid where userid = ? AND scheduleStatus = 0',[ req.session.member.userid ], (err,results) => {
        if (err) res.send(err)
        results.forEach(( results ) => {

            var end = moment(results.sessionTime, 'hh:mm a').add(1, 'hour').format('hh:mm A')
            var start = moment(results.sessionTime, 'hh:mm a').format('hh:mm A')
            results.sessionDate = moment(results.sessionDate).format('MMM DD, YYYY')
            results.sessionTime = `${start} - ${end}`
        })
        req.sessions = results
        return next()
    })
}

router.post('/fee', ( req,res ) => {
    db.query('SELECT * from tblgenera where generalID = 5', (err, out) => {
        if (err) console.log(err)
        res.send(out[0])
    })
})



// ---------- F U N C T I O N S ---------- //
function dashboard(req, res, next) {
    res.render('member/views/dashboard', {
        notifs: req.notifs,
        profs: req.initial,
        total :req.total,
        fee :req.fee,
        s: req.session
    })
    return next();
}

function profile(req, res, next) {
    res.render('member/views/profile', {
        notifs: req.notifs,
        profs: req.initial,
        s: req.session
    })
    return next();
}

function events(req, res, next) {
    res.render('member/views/events', {
        notifs: req.notifs, 
        joinedEvents: req.joinedEvents,
        eventIds: req.eventIds,
        profs: req.initial,
        eves: req.viewEvent,
        s: req.session

    });
    return next();
}
    
function classes(req, res, next) {
    res.render('member/views/classes', {
        notifs: req.notifs,
        joinedClasses: req.joinedClasses,
        classIds: req.classIds,
        classes: req.viewClass, 
        profs: req.initial ,
        s: req.session
    });
    return next();
}

// function billing(req, res, next) {
//     res.render('member/views/billing', {
//         profs: req.initial 
//     });
//     return next();
// }

function trainer(req, res, next) {
    res.render('member/views/trainer', {
        notifs: req.notifs,
        profs: req.initial,
        trainers: req.viewTrainers,
        s: req.session
    })
}


function pending(req, res, next) {
    res.render('member/views/pending', {
        notifs: req.notifs,
        profs: req.initial,
        s: req.session
    });
    return next();
}

function accepted(req, res, next) {
    res.render('member/views/accepted', {
        notifs: req.notifs,
        profs: req.initial,
        pt :req.pt,
        sessions : req.sessions,
        s: req.session
    });
    return next();
}

function change(req, res, next) {
    res.render('member/views/change', {
        notifs: req.notifs,
        profs: req.initial,
        s: req.session
        
    });
    return next();
}

// ------------- GET ---------------//
router.get('/',  initial, notification, totalPayment, fee, dueEvents, dueDate,  dashboard, checkFinishedSession);
router.get('/profile', notification, initial, profile);
router.get('/events', notification, joinedEvents, viewEvent, initial, events);
router.get('/trainers', notification, initial, check, viewTrainers, trainer);
router.get('/classes', notification, joinedClasses, viewClass, initial, classes);
router.get('/pending', notification, initial, pending);
router.get('/accepted', notification, viewHistory, checkForChange, personalTrainer, initial, accepted);
router.get('/change', notification, initial, change);
exports.member = router;