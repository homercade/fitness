var router = require('express').Router();
var db = require('../../lib/database')();
var authMiddleware = require('../auth/middlewares/auth');
var moment = require('moment');
var indexController = require('./controllers/index');

router.use(authMiddleware.trainerHasAuth);
router.get('/dashboard', indexController);


//******************************************************* */
//                     DASHBOARD.
//******************************************************* */

router.post('/trainee/viewSched/all', (req, res) => {
  const query = `SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid join tblsession on tblsession.sessionID = tbppt.sessionID
  where trainid = ? AND scheduleStatus != 0`
  db.query(query, [req.session.trainer.trainerid], (err, out) => {
    res.send(out)
  })
})

function dueEvents (req, res, next) {
  var date = new Date()
  var now = moment(date).format('YYYY-MM-DD')
  var now2 = moment(date).format()

  const query = `
  SELECT * FROM tbppt 
  JOIN tbltrainer on tbltrainer.trainerid = tbppt.trainid
  JOIN tbluser on tbluser.userid = tbppt.memid
  WHERE trainid = ? AND scheduleStatus = 1
  `
  db.query(query, [req.session.trainer.trainerid], (err, results) => {
      console.log(results, '<<<<<< ETO')
      if (results.length != 0) {
        console.log(results, '<<<<<< ETO2 ')
        
        for(var i=0; i<results.length; i++){
          var tomorrow = moment(results[i].sessionDate).subtract(1, 'day').format('YYYY-MM-DD')
          console.log(tomorrow, '<<<<<<< tomorrow')
        
          if (tomorrow == now) {
            console.log(results[i].memid, '<<<<<< MEMID')
            db.query('INSERT INTO tblnotification (notifdescid, memid, notifstatus, notifdate) VALUES (9, ?, "unread", ?)',
            [results[i].memid, now2], (err, results) => {
              notification(req, res, next)
            })
          }else {
            console.log('noooo')
          }
        } 
      } else {
        console.log(results, 'WLAANG LANMAN?')
        notification(req, res, next)
    }
    notification(req, res, next)
  })
}

function notification(req, res, next) {
  const query = `
      SELECT * FROM tblnotification 
      JOIN tblnotificationdesc on tblnotification.notifdescid = tblnotificationdesc.notifdescid 
      JOIN tbluser on tbluser.userid = tblnotification.memid
      WHERE tblnotificationdesc.notifdescid = 9 order by notifid desc limit 3 
      `
  db.query(query, (err, results) => {
  
    results.forEach((results) => {
      results.notifdate = moment(results.notifdate).fromNow()
    })
    req.notifs = results
    return next()
  })
}


//******************************************************* */
//                     GENERAL.
//******************************************************* */

function hello(req, res, next) {
  const query = `
  SELECT * 
  FROM tbltrainer 
  WHERE trainerid = ?;
  `;
  db.query(query, [req.session.trainer.trainerid], function (err, results, fields) {
    if (err) return res.send(err);
    req.trainer = results[0];
    return next();
  })
}

router.post('/trainer/newsched', (req, res) => {
  const query = `UPDATE tbltrainer SET trainerschedule = ? WHERE trainerid = ?`
  db.query(query, [req.body.newsched, req.body.id], (err, out) => {
    if (err) {
      console.error(err)
    }
    res.send(out)
  })
})


//******************************************************* */
//                     TRAINEE.
//******************************************************* */

function allTrainees(req, res, next) {
  const query = `
  select * from tbluser
  join tbppt on tbppt.memid = tbluser.userid
  join tbltrainer on tbltrainer.trainerid = tbppt.trainid
  join tblsession on tblsession.sessionID = tbppt.sessionID
  join tblmembership on tblmembership.usersid = tbluser.userid
  join tblspecial on tblspecial.specialID = tblmembership.specializationid
  join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
  join tblcat on tblcat.membershipID = tblmemrates.memcat
  join tblmemclass on tblmemclass.memclassid = tblmemrates.memclass
  where tbppt.trainid  = ? AND tbppt.status = 1
  group by userid
  `;
  db.query(query, [req.session.trainer.trainerid], function (err, results, fields) {
    if (err) return res.send(err);
    if (results.length == 0) {
      res.redirect('no-trainee')
    } else {
      req.viewTrainee = results
      return next();
    }
  })
}
//View Trainee
function individualTrainee(req, res, next) {
  const query = `
  select * from tbluser
  join tbppt on tbppt.memid = tbluser.userid
  join tbltrainer on tbltrainer.trainerid = tbppt.trainid
  join tblsession on tblsession.sessionID = tbppt.sessionID
  join tblmembership on tblmembership.usersid = tbluser.userid
  join tblspecial on tblspecial.specialID = tblmembership.specializationid
  join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
  join tblcat on tblcat.membershipID = tblmemrates.memcat
  join tblmemclass on tblmemclass.memclassid = tblmemrates.memclass
  where tbppt.trainid  = ? and userid = ?
  group by userid
 
  `
  db.query(query, [req.session.trainer.trainerid, req.query.id], function (err, results, fields) {
    if (err) return res.send(err);
    req.general = results[0];
    req.general.userbday = moment().diff(req.general.userbday, 'years', false);
    return next();
  })
}

//View Schedule
router.post('/trainee/viewSched', (req, res) => {
  const query = `SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid join tblsession on tblsession.sessionID = tbppt.sessionID
  where userid = ? AND scheduleStatus != 0`
  db.query(query, [req.query.id], (err, out) => {
    res.send(out)
  })
})

//Add Schedule
router.post('/trainee/schedule', (req, res) => {
  const query = `SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
  FROM tbppt 
  JOIN tbluser ON tbluser.userid = tbppt.memid 
  JOIN tbltrainer ON tbltrainer.trainerid = tbppt.trainid
  join tblmembership on tblmembership.usersid = tbluser.userid
  join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
  JOIN tblcat ON tblcat.membershipID = tblmemrates.memcat
  JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
  JOIN tblsession ON tblsession.sessionID = tbppt.sessionID
  where tbluser.userid = ${req.body.idForSched} AND tbppt.trainid=${req.session.trainer.trainerid}
  GROUP BY tbluser.userid`
  db.query(query, (err, out) => {
    res.send(out)
  })
})

//Add Schedule
router.post('/trainee/schedule/add', (req, res) => {
  const query = `
  INSERT INTO tbppt (memid, trainid, sessionID, sessionDate, sessionTime, scheduleStatus, status) VALUES (?, ?, ?, ?, ?, 1, 1);
  `
  db.query(query, [
    req.body.memid,
    req.session.trainer.trainerid,
    req.body.sessionid,
    req.body.sessionDate,
    req.body.sessionTime
  ], (err) => {
    db.query('UPDATE tblsession SET sessionForSched = sessionForSched - 1 where sessionID = ?', [req.body.sessionid], (err) => {
      res.send(err)
    })
  })
})

//reschedule
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
      res.redirect('accepted')
    }
  })
})

//Delete Schedule
router.post('/trainee/schedule/delete', (req, res) => {
  console.error(req.body.eventSessionId)
  const query = `
  DELETE FROM tbppt WHERE PTid = ?
  `
  db.query(query, [req.body.delId], (err) => {
    db.query('UPDATE tblsession SET sessionForSched = sessionForSched + 1 where sessionID = ?', [req.body.eventSessionId], (err) => {
      res.send(err)
    })
  })
})

//Update Schedule
router.post('/schedule/update', (req, res) => {
  if (req.body.status == 1) {
    db.query(`UPDATE tblsession SET session_count = session_count - 1 where sessionID = ?`, [req.body.id], (err, out) => {
      db.query(`UPDATE tbppt SET scheduleStatus = 0 where PTid = ?`, [req.body.ptid], (err, out) => {})
    })
  } 
})

//Change trainee
router.post('/change', (req, res) => {
  const query = ` 
  INSERT INTO tblchange (status, memid, trainid, sender, description) VALUES (2, ?, ?, 'Member', ?)
  `
  db.query(query, [
    req.body.userid,
    req.session.trainer.trainerid,
    req.body.reason
  ], (err, out) => {
    if (err) console.log(err)
  })
})

//Check
router.post('/check', (req, res) => {
  const query = ` 
  SELECT * from tblchange 
  join tbltrainer on tbltrainer.trainerid = tblchange.trainid 
  join tbluser on tbluser.userid = tblchange.memid 
  where trainerid = ? and userid = ?
  `
  db.query(query, [req.session.trainer.trainerid, req.body.userid], (err, out) => {
    res.send(out)
  })
})

function viewHistory(req, res, next) {
  const query = `
  SELECT * from tbppt 
  JOIN tbluser on tbluser.userid = tbppt.memid
  JOIN tbltrainer on tbltrainer.trainerid = tbppt.trainid 
  WHERE trainid = ? AND userid = ? AND scheduleStatus = 0
  `
  db.query(query, [req.session.trainer.trainerid, req.query.id], (err, results) => {
    if (err) res.send(err)
    console.log('HISTORY: ',results)
    results.forEach((results) => {

      var end = moment(results.sessionTime, 'hh:mm a').add(1, 'hour').format('hh:mm A')
      var start = moment(results.sessionTime, 'hh:mm a').format('hh:mm A')
      results.sessionDate = moment(results.sessionDate).format('MMM DD, YYYY')
      results.sessionTime = `${start} - ${end}`
    })
    req.sessions = results
    return next()
  })
}


//******************************************************* */
//                     PENDING.
//******************************************************* */

//View Pending Request 
function viewPend(req, res, next) {
  const query = `
  SELECT *
  FROM tbluser 
  join tblmembership on tblmembership.usersid = tbluser.userid
  join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
  JOIN tblcat on tblcat.membershipid = tblmemrates.memcat 
  JOIN tblmemclass on tblmemclass.memclassid = tblmemrates.memclass
  JOIN tbppt on tbppt.memid = tbluser.userid 
  JOIN tbltrainer on tbltrainer.trainerid = tbppt.trainid 
  JOIN tblspecial on tblspecial.specialID = tblmembership.specializationid
  WHERE trainid = ? and tbppt.status = 2
  `
  db.query(query, [req.session.trainer.trainerid], function (err, results, fields) {
    if (err) return res.send(err);
    req.viewPend = results;
    return next();
  })
}

//accept pending
router.post('/trainee/accept', (req, res) => {
  db.query(`INSERT INTO tblsession (session_count, sessionForSched) VALUES (1, 1)`, (err, results, fields) => {
    console.log(results, '<<<<<')
    db.query('update tbppt set status = 1, sessionID = ? WHERE trainid = ? and memid=?', [
      results.insertId,
      req.session.trainer.trainerid,
      req.body.userId
    ], (err, results, fields) => {
      if (err) console.log(err)
    })
  })
});


// ---------- F U N C T I O N S ---------- //

//    FUNCTION
function dashboard(req, res, next) {
  console.log(req.notifs, '<<<<< NOTIFS')
  res.render('trainer/views/dashboard', {
    hello: req.trainer,
    notifs: req.notifs,
    s: req.session
  });
  return next();
}

function trainee(req, res, next) {
  res.render('trainer/views/trainee', {
    trainee: req.viewTrainee,
    hello: req.trainer,
    notifs: req.notifs,
    s: req.session
  });
  return next();
}

function pending(req, res, next) {
  res.render('trainer/views/pending', {
    hello: req.trainer,
    pends: req.viewPend,
    notifs: req.notifs,
    s: req.session
  });
  return next();
}

function notrainee(req, res, next) {
  res.render('trainer/views/no-trainee', {
    hello: req.trainer,
    notifs: req.notifs,
    s: req.session
  });
  return next();
}

function traineeSched(req, res, next) {
  res.render('trainer/views/trainee-sched', {
    trainee: req.viewTrainee,
    hello: req.trainer,
    general: req.general,
    sessions: req.sessions,
    notifs: req.notifs,
    s: req.session
  })
  return next();
}

function change(req, res, next) {
  res.render('trainer/views/change', {
    hello: req.trainer,
    notifs: req.notifs,
    s: req.session
  })
  return next();
}


//    ROUTER
router.get('/', hello, dueEvents, dashboard);
router.get('/trainee', hello, notification, allTrainees, trainee);
router.get('/pending', hello, notification, viewPend, pending);
router.get('/no-trainee', hello, notification, notrainee);
router.get('/trainee-sched', hello, notification, viewHistory, individualTrainee, traineeSched);
router.get('/change', hello, notification, change);


exports.trainer = router;