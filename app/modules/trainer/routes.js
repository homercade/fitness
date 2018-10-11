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

router.post('/trainee/viewSched/all',( req,res ) => {
  const query =`SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid join tblsession on tblsession.sessionID = tbppt.sessionID
  where trainid = ?`
  db.query( query, [ req.session.trainer.trainerid ], ( err,out ) => {
    res.send(out)
  })
})


//******************************************************* */
//                     GENERAL.
//******************************************************* */

function hello(req, res, next){
  const query = `
  SELECT * 
  FROM tbltrainer 
  WHERE trainerid = ?;
  `;
  db.query(query, [req.session.trainer.trainerid], function(err, results, fields){
    if(err) return res.send(err);
    req.trainer = results[0];
    return next();
  })
}

//******************************************************* */
//                     TRAINEE.
//******************************************************* */

function allTrainees(req, res, next){
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
  where tbppt.trainid  = ?
  group by userid
  `;
  db.query(query, [req.session.trainer.trainerid], function(err, results, fields){
    if(err) return res.send(err);
    if(results.length == 0){
      res.redirect('no-trainee')
    }
    else{
      req.viewTrainee = results
      return next();
    }
  })
}
//View Trainee
function individualTrainee(req, res, next){
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
  db.query(query, [req.session.trainer.trainerid, req.query.id], function(err, results, fields){
    if(err) return res.send(err);
    req.general = results[0];
    req.general.userbday = moment().diff(req.general.userbday, 'years', false);
    return next();
  })
}

//View Schedule
router.post('/trainee/viewSched',(req,res)=>{
  const query =`SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid join tblsession on tblsession.sessionID = tbppt.sessionID
  where userid = ?`
  db.query(query,[ req.query.id ],(err,out)=>{
    res.send(out)
  })
})

// //View Schedule Individual
// router.post('/trainee/viewSched/individual',(req,res)=>{
//   const query =`SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid where userid = ?`
//   db.query(query,[req.body.id],(err,out) => {
//     res.send(out)
//   })
// })

//Add Schedule
router.post('/trainee/schedule',(req,res)=>{
  const query =`SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
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
  db.query(query,(err,out)=>{
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

  db.query(query, [ req.body.reschedDate, req.body.reschedTime, req.body.reschedId ], (err, results) => {
    if(err){
      console.log(err)
      res.redirect('trainee')
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
  if (req.body.status == 1){  
    db.query(`UPDATE tblsession SET session_count = session_count - 1 where sessionID = ?`, [ req.body.id ], (err, out) => {
      db.query(`UPDATE tbppt SET scheduleStatus = 0 where PTid = ?`, [ req.body.ptid ], (err, out) => {
      })
    })
  }
  else { 
    db.query(`UPDATE tbppt SET scheduleStatus = 0 where PTid = ?`, [ req.body.ptid ], (err, out) => {
    })
  }
})


//View other member button and is clickable
// router.post('/trainee/OtherMember',(req,res)=>{
//   const query =`SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
//   FROM tbppt 
//   JOIN tbluser ON tbluser.userid = tbppt.memid 
//   JOIN tbltrainer ON tbltrainer.trainerid = tbppt.trainid
//   join tblmembership on tblmembership.usersid = tbluser.userid
//   join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
//   JOIN tblcat ON tblcat.membershipID = tblmemrates.memcat
//   JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
//   JOIN tblsession ON tblsession.sessionID = tbppt.sessionID
//   where tbluser.userid != ${req.body.othermember} AND tbppt.trainid=${req.session.trainer.trainerid}
//   GROUP BY tbluser.userid`

//   db.query(query,(err,out)=>{
//     res.send({othermember:out})
//   })
// })

//View other member detais
// router.post('/trainee/OtherMember/view',(req,res)=>{
//   const query =`SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
//   FROM tbppt 
//   JOIN tbluser ON tbluser.userid = tbppt.memid 
//   JOIN tbltrainer ON tbltrainer.trainerid = tbppt.trainid
//   join tblmembership on tblmembership.usersid = tbluser.userid
//   join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
//   JOIN tblcat ON tblcat.membershipID = tblmemrates.memcat
//   JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
//   JOIN tblsession ON tblsession.sessionID = tbppt.sessionID
//   where tbluser.userid = ${req.body.newmember} AND tbppt.trainid=${req.session.trainer.trainerid}
//   GROUP BY tbluser.userid`

//   db.query(query,(err,out)=>{
//     if (err) return res.send(err)
//     res.send({newmember:out})
//   })
// })

//******************************************************* */
//                     PENDING.
//******************************************************* */

//View Pending Request 
function viewPend(req, res, next){
  const query =`
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
  db.query(query,[req.session.trainer.trainerid], function (err, results, fields) {
    if(err) return res.send(err);
    req.viewPend = results;
    return next();
  })
}

//accept reason
// router.post('/change', (req, res) => {
//   db.query("", [], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/trainee');
//     }
//   });
// });

//accept pending
router.post('/trainee/accept', (req, res) => {
  db.query(`INSERT INTO tblsession (session_count, sessionForSched) VALUES (1, 1)`,(err,results, fields) => {
    db.query('update tbppt set status = 1, sessionID = ? WHERE trainid = ? and memid=?',[      
      results.insertId, 
      req.session.trainer.trainerid,
      req.body.userId
    ], (err, results,fields) => {
      if (err) console.log(err)
    })
  })
});






// ---------- F U N C T I O N S ---------- //

//    FUNCTION
function dashboard(req, res, next){
    res.render('trainer/views/dashboard',{
      hello: req.trainer
    });
    return next();
}

function trainee(req, res, next){
    res.render('trainer/views/trainee',{
      trainee: req.viewTrainee,
      hello: req.trainer,
    });
    return next();
}
function pending(req, res, next){
    res.render('trainer/views/pending',{
      hello: req.trainer,
      pends:req.viewPend
    });
    return next();
}
function notrainee(req, res, next){
  res.render('trainer/views/no-trainee',{
    hello: req.trainer
  });
  return next();
}

function traineeSched(req, res, next){
  res.render('trainer/views/trainee-sched',{
    trainee: req.viewTrainee,
    hello: req.trainer,
    general: req.general        
  })
  return next();
}


//    ROUTER
router.get('/', hello, dashboard);
router.get('/trainee', hello, allTrainees, trainee);
router.get('/pending', hello, viewPend, pending);
router.get('/no-trainee', hello, notrainee);
router.get('/trainee-sched', hello, individualTrainee, traineeSched);


exports.trainer = router;