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
  db.query(query, [req.session.trainer.trainerid], (err, result) => {
    res.send(result)
  })
})

function notification(req, res, next) {
  const query = `
    SELECT * FROM tblnotification 
    JOIN tblnotificationdesc on tblnotification.notifdescid = tblnotificationdesc.notifdescid 
    JOIN tbluser on tbluser.userid = tblnotification.memid
    WHERE tblnotification.forwhom = 'trainer'
      AND tblnotification.notifdate <= CURDATE()
    ORDER BY notifdate DESC LIMIT 3
    `
  db.query(query, (err, results) => {
  
    results.forEach((results) => {
      results.notifdate = moment(results.notifdate).fromNow()
    })
    req.notifs = results
    return next()
  })
}

router.post('/notification/mark/read', (req, res) => {
  db.query('SELECT * FROM tblnotification WHERE forwhom = "trainer"', (err, results) =>{
    results.forEach(result => {
      if(result.notifstatus === 'unread') {
        db.query('UPDATE tblnotification SET notifstatus = "read" WHERE notifid = ?', [result.notifid], (err) => {
          if (err) console.error(err)
        })
      }
    })
    if (err) console.error(err)
  })
})

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

router.post('/trainee/schedule/add', (req, res) => {
  const queryInsertSession = `
    INSERT INTO tbppt (memid, trainid, sessionID, sessionDate, sessionTime, scheduleStatus, status) 
    VALUES (?, ?, ?, ?, ?, 1, 1);`

  const querySessionForSched = `
    UPDATE tblsession 
    SET sessionForSched = sessionForSched - 1 
    WHERE sessionID = ?`

  const queryInsertNotificationTrainer = `
    INSERT INTO tblnotification (notifdescid, memid, ptid, notifstatus, notifdate, notiftime, forwhom) 
    VALUES (9, ?, ?, "unread", ?, ?, "trainer")`
  
  const queryInsertNotificationMember = `
    INSERT INTO tblnotification (notifdescid, memid, ptid, notifstatus, notifdate, notiftime, forwhom) 
    VALUES (10, ?, ?, "unread", ?, ?, "member")`

  const queryLatestInsert = `SELECT * from tbppt ORDER BY Ptid DESC LIMIT 1`
  
  db.query(queryInsertSession, [
    req.body.memid,
    req.session.trainer.trainerid,
    req.body.sessionid,
    req.body.sessionDate,
    req.body.sessionTime
  ], (err) => {
    db.query(querySessionForSched, [req.body.sessionid], (err) => {
      //Add notification
      db.query(queryLatestInsert, (err, result) => {
        const latestInsertId = result[0].PTid
        const notificationDate = moment(req.body.sessionDate, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD')
        //Add notification - trainer
        db.query(queryInsertNotificationTrainer, [ 
          req.body.memid, 
          latestInsertId, 
          notificationDate,
          req.body.sessionTime
        ], (err) => {
          //Add notification - member
          db.query(queryInsertNotificationMember, [ 
            req.body.memid, 
            latestInsertId, 
            notificationDate,
            req.body.sessionTime
          ], (err) => {
            if (err) console.error(err)
          })
          if (err) console.error(err)
        })
        if (err) console.error(err)
      })
      if (err) console.error(err)
    })
    if(err) console.error(err)
  })
})

//Reschedule schedule
router.post('/trainee/reschedule', (req, res) => {
  const query = `
    UPDATE tbppt 
    SET 
      sessionDate = ?, 
      sessionTime = ?, 
      scheduleStatus = '1', 
      description = NULL 
    WHERE PTid = ?`

  const queryRescheduleNotification = `
    UPDATE tblnotification SET
      notifdate = ?, 
      notiftime = ?
    WHERE ptid = ?`
    
  db.query(query, [req.body.reschedDate, req.body.reschedTime, req.body.reschedId], (err, results) => {
    //Reschedule notification
    const notificationDate = moment(req.body.reschedDate, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD')
    db.query(queryRescheduleNotification, [notificationDate, req.body.reschedTime, req.body.reschedId], (err, results) => {
      if(err) console.error(err)
    })
    if (err) {
      console.error(err)
      res.redirect('accepted')
    }
  })
})

//Delete Schedule
router.post('/trainee/schedule/delete', (req, res) => {
  console.error(req.body.eventSessionId)
  const query = `
    DELETE FROM tbppt WHERE PTid = ?`
    
  const queryDeleteNotification = `
    DELETE FROM tblnotification WHERE ptid = ?`

  db.query(query, [req.body.delId], (err) => {
    db.query('UPDATE tblsession SET sessionForSched = sessionForSched + 1 where sessionID = ?', [req.body.eventSessionId], (err) => {
      //Delete notification
      db.query(queryDeleteNotification, [req.body.delId], (err) => {
        if(err) console.error(err)
      })
      if (err) console.error(err)
    })
    if (err) console.error(err)
  })
})

//Update Schedule if finished
router.post('/schedule/update', (req, res) => {
  const queryUpdateSession = `
    UPDATE tblsession 
    SET session_count = session_count - 1 
    WHERE sessionID = ?`

  const queryUpdateSchedule = `
    UPDATE tbppt 
    SET 
      scheduleStatus = 0,
      description = 'client is absent'
    WHERE PTid = ?`

  if (req.body.status == 1) {
    db.query(queryUpdateSession, [req.body.id], (err, out) => {
      if (err) console.error(err)
      db.query(queryUpdateSchedule, [req.body.ptid], (err, out) => {
        if (err) console.error(err)
      })
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
    if (err) console.error(err)
  })
})

//Check if there is a request for change
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
    db.query('update tbppt set status = 1, sessionID = ? WHERE trainid = ? and memid=?', [
      results.insertId,
      req.session.trainer.trainerid,
      req.body.userId
    ], (err, results, fields) => {
      if (err) console.error(err)
    })
  })
});


// ---------- F U N C T I O N S ---------- //

//    FUNCTION
function dashboard(req, res, next) {
  res.render('trainer/views/dashboard', {
    hello: req.trainer,
    notifs: req.notifs,
    session: req.session
  });
  return next();
}

function trainee(req, res, next) {
  res.render('trainer/views/trainee', {
    trainee: req.viewTrainee,
    hello: req.trainer,
    notifs: req.notifs,
    session: req.session
  });
  return next();
}

function pending(req, res, next) {
  res.render('trainer/views/pending', {
    hello: req.trainer,
    pends: req.viewPend,
    notifs: req.notifs,
    session: req.session
  });
  return next();
}

function notrainee(req, res, next) {
  res.render('trainer/views/no-trainee', {
    hello: req.trainer,
    notifs: req.notifs,
    session: req.session
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
    session: req.session
  })
  return next();
}

function change(req, res, next) {
  res.render('trainer/views/change', {
    hello: req.trainer,
    notifs: req.notifs,
    session: req.session
  })
  return next();
}


//    ROUTER
// router.get('/', hello, dueEvents, dashboard);
router.get('/', hello, notification, dashboard);
router.get('/trainee', hello, notification, allTrainees, trainee);
router.get('/pending', hello, notification, viewPend, pending);
router.get('/no-trainee', hello, notification, notrainee);
router.get('/trainee-sched', hello, notification, viewHistory, individualTrainee, traineeSched);
router.get('/change', hello, notification, change);


exports.trainer = router;