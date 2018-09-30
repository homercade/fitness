var router = require('express').Router();
var db = require('../../lib/database')();
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');

router.use(authMiddleware.memberHasAuth);

var indexController = require('./controllers/index');
router.get('/dashboard', indexController);

//******************************************************* */
//                      PROFILE
//******************************************************* */

// VIEW
function initial(req, res, next) {
    const query = `select u.* ,mems.memrateid,ct.membershipname,cl.memclassname, t.*
    from tbluser u 
    join tbppt p on u.userid = p.memid 
    inner join tblmemrates mems ON u.memrateid=mems.memrateid 
    inner join tblcat ct ON mems.memcat=ct.membershipID 
    inner join tblmemclass cl ON mems.memclass= cl.memclassid 
    join tbltrainer t on t.trainerid = p.trainid
    where usertype= 2  
    AND userid = ?
    group by userid
    `
    db.query(query, [req.session.member.userid], function (err, results, fields) {
        if (err) return res.send(err);
        
        results.forEach((results) => {
            results.signdate = moment(results.signdate).format("LL");
        })
        results.forEach( ( results ) => {
            results.expiry = moment(results.expiry).format("LL");
        })
        req.initial = results;
        return next();
    })
}

//******************************************************* */
//                     CLASSES
//******************************************************* */

// VIEW
function viewClass(req, res, next) {
    db.query('select * from tbleventclass where type = 1', function (err, results, fields) {
        if (err) return res.send(err);
        results.forEach((results) => {
            results.starttime = moment(results.starttime,'HH:mm:ss').format('hh:mm A');
        })
        results.forEach((results) => {
            results.endtime = moment(results.endtime,'HH:mm:ss').format('hh:mm A');
        })
        req.viewClass = results;
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

//******************************************************* */
//                     EVENT
//******************************************************* */

// VIEW
function viewEvent(req, res, next) {
    db.query('select * from tbleventclass where type = 2', function (err, results, fields) {
        if (err) return res.send(err);
        req.viewEvent = results;
        return next();
    })
}

function viewjoined(req, res, next) {
    db.query('select * from tbluce where intUCEUserid= ? and intUCEclassid = ?',[req.session.member.userid, req.body.id], function (err, results, fields) {
        if (err) return res.send(err);
        if (results[0])
            var a = 1
            req.a = a
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

router.post('/event/view',(req,res)=>{
    const query =``
    db.query(query, [req.body.eventid],(err,out)=>{
        res.send(out)
    })
})

router.post('/event/resign', (req, res) => {
db.query("DELETE FROM tbluce WHERE intUCEID = ?", [req.body.uceid], (err, results, fields) => {
    db.query('UPDATE tbleventclass SET slot= slot + 1 where eventclassid=?', [req.body.eventid],(err, results, fields) => {
        if (err) return res.send(err);
    });
});
})

//******************************************************* */
//                    TRAINER
//******************************************************* */

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





// ---------- F U N C T I O N S ---------- //
function dashboard(req, res, next) {
    res.render('member/views/dashboard', {
        profs: req.initial
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
        profs: req.initial,
        eves: req.viewEvent

    });
    return next();
}
    
function classes(req, res, next) {
    res.render('member/views/classes', {
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
    });
    return next();
}

function pending(req, res, next) {
    res.render('member/views/pending', {
        profs: req.initial
    });
    return next();
}

function accepted(req, res, next) {
    res.render('member/views/accepted', {
        profs: req.initial
    });
    return next();
}

function changeTrainer(req, res, next) {
    res.render('member/views/change-trainer', {
        profs: req.initial
    });
    return next();
}

// ------------- GET ---------------//
router.get('/', initial, dashboard);
router.get('/profile', initial, profile);
router.get('/events', viewjoined, joinedEvents, viewEvent, initial, events);
router.get('/trainers', viewTrainers, initial, trainer);
router.get('/classes', viewClass, initial, classes);
router.get('/billing', initial, billing);
router.get('/pending', initial, pending);
router.get('/accepted', initial, accepted);
router.get('/changeTrainer', initial, changeTrainer);
exports.member = router;