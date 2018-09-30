var router = require('express').Router();
var db = require('../../lib/database')();
var authMiddleware = require('../auth/middlewares/auth');
var moment = require('moment');
var indexController = require('./controllers/index');

router.use(authMiddleware.trainerHasAuth);
router.get('/dashboard', indexController); 


//******************************************************* */
//                     GENERAL
//******************************************************* */

function hello(req, res, next){
  const query = `
  SELECT * 
  FROM tbltrainer 
  JOIN tbppt on tbltrainer.trainerid = tbppt.trainid 
  WHERE tbppt.trainid = ?;
  `;
  db.query(query, [req.session.trainer.trainerid], function(err, results, fields){
    if(err) return res.send(err);
    req.trainer = results[0];
    return next();
  })
}

//******************************************************* */
//                     TRAINEE
//******************************************************* */

//View Trainee
function general(req, res, next){
  const query = `
  SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
  FROM tbppt 
  JOIN tbluser ON tbluser.userid = tbppt.memid 
  JOIN tbltrainer ON tbltrainer.trainerid = tbppt.trainid
  JOIN tblmemrates ON tblmemrates.memrateid = tbluser.memrateid
  JOIN tblcat ON tblcat.membershipID = tblmemrates.memcat
  JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
  JOIN tblsession ON tblsession.sessionID = tbppt.sessionID
  where tbppt.trainid = ?;
  `;
  db.query(query, [req.session.trainer.trainerid], function(err, results, fields){
    if(err) return res.send(err);
    req.general = results[0];
    req.general.userbday = moment().diff(req.general.userbday, 'years', false);
    return next();
  })
}

//View Schedule
router.post('/trainee/viewSched',(req,res)=>{
  const query =`SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid where userid = 84`
  db.query(query,(err,out)=>{
    res.send(out)
  })
})

//Add Schedule
router.post('/trainee/schedule',(req,res)=>{
  const query =`SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
  FROM tbppt 
  JOIN tbluser ON tbluser.userid = tbppt.memid 
  JOIN tbltrainer ON tbltrainer.trainerid = tbppt.trainid
  JOIN tblmemrates ON tblmemrates.memrateid = tbluser.memrateid
  JOIN tblcat ON tblcat.membershipID = tblmemrates.memcat
  JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
  JOIN tblsession ON tblsession.sessionID = tbppt.sessionID
  where tbluser.userid = ${req.body.othermember} AND tbppt.trainid=${req.session.trainer.trainerid}
  GROUP BY tbluser.userid`
  db.query(query,(err,out)=>{
    res.send(out)
  })
})

//Add Schedule
router.post('/trainee/schedule/add',(req,res)=>{
  const query =`
  INSERT INTO newschema.tbppt (memid, trainid, sessionID, sessionDate, sessionTime) VALUES (?, ?, ?, ?, ?);
  `
  db.query(query,[
    req.body.memid,
    req.session.trainer.trainerid,
    req.body.sessionid,
    req.body.sessionDate,
    req.body.sessionTime

  ],(err)=>{
    res.send(err)
  })
})


//View other member button and is clickable
router.post('/trainee/OtherMember',(req,res)=>{
  const query =`SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
  FROM tbppt 
  JOIN tbluser ON tbluser.userid = tbppt.memid 
  JOIN tbltrainer ON tbltrainer.trainerid = tbppt.trainid
  JOIN tblmemrates ON tblmemrates.memrateid = tbluser.memrateid
  JOIN tblcat ON tblcat.membershipID = tblmemrates.memcat
  JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
  JOIN tblsession ON tblsession.sessionID = tbppt.sessionID
  where tbluser.userid != ${req.body.othermember} AND tbppt.trainid=${req.session.trainer.trainerid}
  GROUP BY tbluser.userid`

  db.query(query,(err,out)=>{
    res.send({othermember:out})
  })
})

//View other member detais
router.post('/trainee/OtherMember/view',(req,res)=>{
  const query =`SELECT tbppt.*, tbluser.*, tbltrainer.*, tblmemclass.memclassname, tblcat.membershipname, tblsession.*
  FROM tbppt 
  JOIN tbluser ON tbluser.userid = tbppt.memid 
  JOIN tbltrainer ON tbltrainer.trainerid = tbppt.trainid
  JOIN tblmemrates ON tblmemrates.memrateid = tbluser.memrateid
  JOIN tblcat ON tblcat.membershipID = tblmemrates.memcat
  JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
  JOIN tblsession ON tblsession.sessionID = tbppt.sessionID
  where tbluser.userid = ${req.body.newmember} AND tbppt.trainid=${req.session.trainer.trainerid}
  GROUP BY tbluser.userid`

  db.query(query,(err,out)=>{
    res.send({newmember:out})
  })
})

//******************************************************* */
//                     PENDING
//******************************************************* */

//View Pending Request 
function viewPend(req, res, next){
  db.query('SELECT u.*, mr.*, mc.*, m.*,t.*,pt.* from tbluser u join tblmemrates mr on u.memrateid=mr.memrateid inner join tblcat mc on mc.membershipid=mr.memcat inner join tblmemclass m on mr.memclass=m.memclassid inner join tbppt pt on pt.memid=u.userid inner join tbltrainer t on t.trainerid=pt.trainid where pt.trainid=? and pt.status=2',[req.session.trainer.trainerid], function(err, results, fields){
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
router.post('/accept', (req, res) => {
  db.query("UPDATE tbppt SET status=1, statusfront='Accepted' WHERE trainid=? and memid=?", [req.session.trainer.trainerid, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trainee');
    }
  });
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
      hello: req.trainer,
      general: req.general,
      otherMembers: req.otherMembers
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


//    ROUTER
router.get('/', hello, dashboard);
router.get('/trainee', hello, general, trainee);
router.get('/pending', hello, viewPend, pending);

exports.trainer = router;