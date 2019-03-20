var express = require('express');
var db = require('../../lib/database')();
var router = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var moment = require('moment');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var multer = require('multer');
const path = require('path');
var fs=require('fs')

router.use(authMiddleware.hasAuth);

var indexController = require('./controllers/index');


var mailer = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: true,
    auth:{
        user: 'ateamsupmanila@gmail.com',
        pass: 'ateammanila'
    },
    tls:{
        rejectUnauthorized:false
    }
});
mailer.use('compile', hbs({
    viewpath: '',
    extname:'.html'
}));

// //- FILE UPLOAD - MULTER
// var storage = multer.diskStorage({
//   destination: function( req, file, cb ){
//     cb(null, './public/upload')
//   },
//   filename: function ( req, file, cb ){
//     cb(null, 'user'+'-'+Date.now()+path.extname(file.originalname))
//   }
// })

// var upload = multer({ storage:storage })

//insert staff

router.post('/staff', (req, res) => {
  console.log(req.files)
  pic=`${req.body.sfirstName + req.body.slastName}.jpg`
  fullname= req.session.user.userfname + " " + req.session.user.userlname
  req.files.img.mv('public/assets/images/'+pic, function(err){
  db.query(`INSERT INTO tbluser 
    ( userfname, userlname, usermobile, useremail, 
    usertype,statusfront,userpassword,userusername,
    Dateadded,addedby,profile) 
    VALUES ( ?, ?, ?, ?, 4,'Inactive',?, ?, CURDATE(), ?, ?)`, [req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.password, req.body.username,fullname,pic], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff'); 
    }
  });
});
});

//edit staff
router.post('/staff/edit', (req, res) => {
  db.query(`UPDATE 
    tbluser SET userfname=?, userlname=?, usermobile=?, useremail=?, userpassword=?, 
    userusername=? WHERE userid=?`, [req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.pass, req.body.username, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
    }
  });
});

//delete staff
router.post('/staff/delete', (req, res) => {
  db.query(`DELETE 
    FROM tbluser WHERE statusfront='Inactive' 
    and userid=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
    }
  });

});


//view Staff
function viewStaff(req, res, next) {
  db.query(`SELECT * FROM tbluser WHERE usertype = 4`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewStaff = results;
        //moments dateadded
        for (var i = 0; i < req.viewStaff.length; i++) {
          req.viewStaff[i].Dateadded = moment(results[i].Dateadded).format("LL");
        }
    return next();
  })
}

//viewviewBraches in staff
function viewBranches(req, res, next) {
  db.query(`SELECT * FROM tblbranch where user is NULL`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewBranches = results;
    return next();
  })
}

//assign staff

router.post('/staff/assign', (req, res) => {
  db.query(`Select * from tbluser where userid=?`,[req.body.id],(err,results,fields)=>{
  if (req.body.branchid!=0 && results[0].branch!=undefined ){
  db.query(`UPDATE tblbranch SET user=NULL where branchID=?`,[results[0].branch],(err,results,fields)=>{
    db.query(`UPDATE tbluser SET branch=NULL where userid=?`,[req.body.id],(err,results,fields)=>{
      db.query(`UPDATE tbluser SET branch=? ,statusfront='Active' where userid=?`, [req.body.branchid, req.body.id], (err, results, fields) => {
        db.query(`UPDATE tblbranch SET user=? where branchID=?`, [req.body.manager, req.body.branchid], (err, results, fields) => {
        if (err)
          console.log(err);
        else {
          res.redirect('/staff');
              }
        });
      });
     }); 
    });                     
     }
  else if(req.body.branchid!=0 && results[0].branch==undefined){
  db.query(`UPDATE tbluser SET branch=? ,statusfront='Active' where userid=?`, [req.body.branchid, req.body.id], (err, results, fields) => {
    db.query(`UPDATE tblbranch SET user=? where branchID=?`, [req.body.manager, req.body.branchid], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
          }
    });
  });
  }
  else{
  db.query(`UPDATE tblbranch SET user=NULL where branchID=?`, [results[0].branch], (err, results, fields) => {
     db.query(`UPDATE tbluser SET statusfront='Inactive',branch=NULL where userid=?`, [req.body.id], (err, results, fields) => {
      if (err)
        console.log(err);
      else {
        res.redirect('/staff');
        }
  })
     })
    }
    })
})

//insert classes
router.post('/classes', (req, res) => {
  fullname= req.session.user.userfname + " " + req.session.user.userlname
  db.query(`INSERT INTO tblclass 
    ( classname, classdesc,status,Dateadded,addedby) 
    VALUES ( ?, ?, 1, CURDATE(), ?)`, [req.body.classname, req.body.classdesc, fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//edit classes

router.post('/classes/edit', (req, res) => {
  db.query(`UPDATE tblclass SET classname=?, classdesc=? 
    WHERE classID=?`, [req.body.classname, req.body.classdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//delete class

router.post('/classes/delete', (req, res) => {
  db.query(`UPDATE tblclass SET status=2 WHERE classid=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//view classes
function viewClass(req, res, next) {
  db.query(`SELECT * FROM tblclass WHERE status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewClass = results;
        //moments classdate
    for (var i = 0; i < req.viewClass.length; i++) {
      req.viewClass[i].Dateadded = moment(results[i].Dateadded).format("LL");}
    return next();
  })
}

//insert special
router.post('/specs', (req, res) => {
  db.query(`INSERT INTO tblspecial 
    ( specialname, specialdesc,status) 
    VALUES ( ?, ?,1)`, [req.body.specialname, req.body.specialdesc], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//edit special
router.post('/specs/edit', (req, res) => {
  db.query(`UPDATE 
    tblspecial SET specialname=?, specialdesc=? WHERE specialID=?`, [req.body.specialname, req.body.specialdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//delete special
router.post('/specs/delete', (req, res) => {
  db.query(`UPDATE tblspecial SET status=2 WHERE specialID=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//view special
function viewSpecial(req, res, next) {
  db.query(`SELECT * FROM tblspecial WHERE status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewSpecial = results;
    return next();
  })
}

//insert discount

// router.post('/discount', (req, res) => {
//   fullname= req.session.user.userfname + " " + req.session.user.userlname    
//   db.query(`INSERT INTO tblpromo 
//     (promoname,startdate,enddate,
//     discount,status,statusback,
//     Dateadded,Addedby,description,promotype) 
//     VALUES ( ?, ?, ?, ?, ?, 1, CURDATE(), ?, ?, ?)`, [req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status, fullname, req.body.desc, req.body.type], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/discount');
//     }
//   });
// });

//insert discount
router.post('/discount', (req, res) => { 
  console.log(req.files) 
  promopic=`${req.body.promoname}.jpg`
  fullname= req.session.user.userfname + " " + req.session.user.userlname
  req.files.img.mv('public/assets/images/'+promopic, function(err){
 db.query(`INSERT INTO tblpromo 
(promoname,startdate,enddate,
discount,status,statusback,
Dateadded,Addedby,description,promotype,promopic) 
VALUES ( ?, ?, ?, ?, ?, 1, CURDATE(), ?, ?, ?, ?)`, [req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status, fullname, req.body.desc, req.body.type,promopic], (err, results, fields) => {
if (err)
  console.log(err);
else {
  res.redirect('/discount');
}
});
});
});

//edit discount
router.post('/discount/edit', (req, res) => {
  db.query(`UPDATE tblpromo SET promoname=?, 
    startdate=?, enddate=?, discount=?, status=? 
    WHERE promoID=?`, [req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  }); 
});

//delete discount
router.post('/discount/delete', (req, res) => {
  db.query(`UPDATE tblpromo SET statusback=2 WHERE promoID=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  });
});

//view discount
function viewDiscount(req, res, next) {
  db.query(`SELECT * FROM tblpromo WHERE statusback=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewDiscount = results;
    //moments expiration
    for (var i = 0; i < req.viewDiscount.length; i++) {
      req.viewDiscount[i].Dateadded = moment(results[i].Dateadded).format("LL");}
    return next();
  })
}

//function branchaddid
function addid(req, res, next) {
  db.query(`SELECT (branchID+1)id FROM tblbranch ORDER BY branchID DESC LIMIT 1`, function (err, results, fields) {
    if (err) return res.send(err)
    req.newid = results[0].id
    console.log(req.newid)
    return next();
  })
}


//function oradd
function oradd(req, res, next) {
  db.query(`SELECT (orid+1)id FROM tblor ORDER BY orid DESC LIMIT 1`, function (err, results, fields) {
    if (err) return res.send(err)
    req.oradd = results[0].id
    console.log(req.oradd)
    return next();
  })
}


//insert branch
router.post('/branch', addid, (req, res) => {
  fullname=req.session.user.userfname + " " + req.session.user.userlname
  db.query(`INSERT INTO tblbranch 
    ( branchname,branchstreetname,branchcity,Dateadded,addedby) 
    VALUES (?, ?, ?, CURDATE(),?)`, [req.body.branchname,req.body.street, req.body.city,fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/branch');
    }
  });
});

//edit branch

router.post('/branch/edit', (req, res) => {
  db.query(`UPDATE tblbranch SET branchname=?,branchstreetname=?,branchcity=? WHERE branchID=${req.body.id}`, [req.body.branch, req.body.street, req.body.city], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/branch');
            }
});
});

//delete branch

router.post('/branch/delete', (req, res) => {
  db.query(`DELETE FROM tblbranch WHERE branchID=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/branch');
    }
  });

});

//view branch
function viewBranch(req, res, next) {
  db.query(`SELECT * from tblbranch`, function (err, results, fields) {
    console.log(results)
    if (err) return res.send(err);
    req.viewBranch = results;
        //moments expiration
    for (var i = 0; i < req.viewBranch.length; i++) {
      req.viewBranch[i].Dateadded = moment(results[i].Dateadded).format("LL");}
    return next();
  })
}


//insert membership
router.post('/category', (req, res) => {
  fullname=req.session.user.userfname + " " +req.session.user.userlname 
  db.query(`INSERT INTO tblcat ( membershipname,membershipdesc, status, Dateadded, addedby) 
    VALUES (?, ?,1, CURDATE(),?)`, [req.body.catname, req.body.catdesc,fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

/*edit membership*/
router.post('/category/edit', (req, res) => {
  db.query(`UPDATE tblcat SET membershipname=?,membershipdesc=? 
    WHERE membershipID=?`, [req.body.catname, req.body.catdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

//delete category

router.post('/category/delete', (req, res) => {
  db.query(`UPDATE tblcat SET status=2 WHERE membershipID=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

//view category
function viewCategory(req, res, next) {
  db.query(`SELECT * FROM tblcat WHERE status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewCategory = results;
       //moments dateadded
      for (var i = 0; i < req.viewCategory.length; i++) {
        req.viewCategory[i].Dateadded = moment(results[i].Dateadded).format("LL");
      }
    return next();
  })
}

//insert trainer
// router.post('/trains', (req, res) => {
//   if (req.body.Ttype=='Freelance'){
//   db.query(`INSERT INTO tbltrainer
//    ( trainerfname, trainerlname, 
//    trainerbday,trainergender,traineraddress,
//    trainermobile,traineremail,trainerschedule,trainerbranch,
//    trainerspecialization,trainerpassword,trainerusername,type,
//    trainertimestart,trainertimeend) VALUES 
//    ( ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.sched.toString(), req.body.branchid, req.body.specialid, req.body.password, req.body.username, req.body.Ttype, req.body.starttime, req.body.endtime], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/trains');
//     }
//   });
//   }else{
//   db.query(`INSERT INTO tbltrainer 
//     ( trainerfname, trainerlname, 
//     trainerbday,trainergender,traineraddress,
//     trainermobile,traineremail,trainerschedule,
//     trainerbranch,trainerspecialization,trainerpassword,
//     trainerusername,type) 
//     VALUES ( ?, ?, ?, ?, ?, ? ,?, 'Monday,Tuesday,Wednesday,Thursday,Friday', ?, ?, ?, ?, ?)`, [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.branchid, req.body.specialid, req.body.password, req.body.username, req.body.Ttype], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else 
//       res.redirect('/trains');
//   });
//   }
// });

//insert trainer
router.post('/trains', (req, res) => {
  console.log(req.body)
  pic=`${req.body.fname + req.body.lname}.jpg`
  fullname= req.session.user.userfname + " " + req.session.user.userlname
  req.files.img.mv('public/assets/images/'+pic, function(err){
  db.query(`INSERT INTO tbltrainer
   ( trainerfname, trainerlname, 
   trainerbday,trainergender,traineraddress,
   trainermobile,traineremail,trainerschedule,trainerbranch,
   trainerspecialization,trainerpassword,trainerusername,trainertimestart,trainertimeend,trainerpic) VALUES 
   ( ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ? )`, 
   [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, 
   req.body.mobile, req.body.email, `${req.body['sched[]']}`, 
   req.body.branchid, req.body.specialid, req.body.password, 
   req.body.username, req.body.starttime, req.body.endtime,pic], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trains');
    }
});
});
  });



//view branch dropdowns
function viewbranchdrop(req, res, next) {
  db.query(`SELECT * FROM tblbranch`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewbranchdrop = results;
    return next();
  })
}

//view specialization dropdowns
function viewspecialdrop(req, res, next) {
  db.query(`SELECT * FROM tblspecial WHERE status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewspecialdrop = results;
    return next();
  })
}

//edit trainer
router.post('/trains/edit', (req, res) => {
  db.query(`UPDATE tbltrainer SET trainerfname=?, trainerlname=?,
    trainerbday=?,trainergender=?,traineraddress=?,trainermobile=?,
    traineremail=?,trainerbranch=?,trainerspecialization=?,trainerpassword=?,
    trainerusername=? WHERE trainerid=?`, [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.branchid, req.body.specialid, req.body.pass, req.body.username, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trains');
    }
  });
});

//delete trainer
router.post('/trains/delete', (req, res) => {
  db.query(`DELETE FROM tbltrainer WHERE trainerid=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trainer');
    }
  });
});

//view Trainers
function viewTrainer(req, res, next) {
  db.query(`SELECT u.*,s.* FROM tbltrainer u 
JOIN tblspecial s ON s.specialID =u.trainerspecialization`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewTrainer = results;
      results.forEach(result => {
        //- TIME
        result.trainertimestart = moment(result.trainertimestart,'HH:mm:ss').format("hh:ss A")
        result.trainertimeend = moment(result.trainertimeend,'HH:mm:ss').format("hh:ss A")
        //- SCHED
        const workDaysToArray = result.trainerschedule.split(',')
        const workDaysArray = workDaysToArray.map(day => {
          switch (day) {
            case '1': return "Mon"
              break
            case '2': return "Tue"
              break
            case '3': return "Wed"
              break
            case '4': return "Thur"
              break
            case '5': return "Fri"
              break
            case '6': return "Sat"
              break
            case '0': return "Sun"
              break
          }
        })
        result.trainerschedule = workDaysArray.join(', ')
      })
      req.viewTrainer = results
    
    return next();
  })
}

// //insert facility
// router.post('/facility', (req, res) => {
//   db.query(INSERT INTO tblfacilities ( facilitiesname, fee, period, UOM) VALUES ( ?, ?, ?, ?)", [req.body.facname, req.body.price, req.body.dura, req.body.uom], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/facility');
//     }
//   });
// });

// //edit facility

// router.post('/facility/edit', (req, res) => {
//   db.query("UPDATE tblfacilities SET facilitiesname=?, fee=?, period=?, UOM=? WHERE facilitiesID=?", [req.body.facname, req.body.price, req.body.dura, req.body.uom, req.body.id], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/facility');
//     }
//   });
// });

//delete facility
// router.post('/facility/delete', (req, res) => {
//   db.query("DELETE FROM tblfacilities WHERE facilitiesID=?", [req.body.id], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/facility');
//     }
//   });
// });

//view facilities
// function viewFac(req, res, next) {
//   db.query('SELECT * FROM tblfacilities', function (err, results, fields) {
//     if (err) return res.send(err);
//     req.viewFac = results;
//     return next();
//   })
// }

//insert general fee

// router.post('/general', (req, res) => {
//   fullname=req.session.user.userfname+ " " + req.session.user.userlname
//   db.query("INSERT INTO tblgenera ( genname, fee, UOM, type,Dateadded, addedby) VALUES ( ?, ?, ?, ?, CURDATE(), ?)", [req.body.genname, req.body.fee, req.body.uom, req.body.feetype, fullname ], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/general');
//     }
//   });
// });

//edit general fee

// router.post('/general/edit', (req, res) => {

//   db.query("UPDATE tblgenera SET genname=?, fee=?, genperiod=?, UOM=? WHERE generalID=? ", [req.body.genname, req.body.fee, req.body.dura, req.body.uom, req.body.id], (err, results, fields) => {
//     if (err)
//       console.log(err);
//     else {
//       res.redirect('/general');
//     }
//   });
// });

//view general
// function viewGen(req, res, next) {
//   db.query('SELECT * FROM tblgenera', function (err, results, fields) {
//     if (err) return res.send(err);
//     req.viewGen = results;
//         //moments dateadded
//         for (var i = 0; i < req.viewGen.length; i++) {
//           req.viewGen[i].Dateadded = moment(results[i].Dateadded).format("LL");
//         }
//     return next();
//   })
// }

//insert membership
router.post('/membership', (req, res) => {
  db.query(`INSERT INTO tblmemrates ( memclass, memfee, memperiod, memcat) 
    VALUES ( ?, ?, ?, ?)`, [req.body.class, req.body.memfee, req.body.memdura, req.body.category], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});

//view category dropdowns
function viewcatdrop(req, res, next) {
  db.query(`SELECT * FROM tblcat WHERE status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewcatdrop = results;
    return next();
  })
}

//view class dropdowns
function viewclassdrop(req, res, next) {
  db.query(`SELECT * FROM tblmemclass WHERE status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewclassdrop = results;
    return next();
  })
}

//edit membership
router.post('/membership/edit', (req, res) => {
  db.query(`UPDATE tblmemrates SET  memclass=?, memfee=?, memperiod=?, 
    memcat=? WHERE memrateid=?`, [req.body.class, req.body.memfee, req.body.memdura, req.body.category, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});

//delete membership
router.post('/membership/delete', (req, res) => {
  db.query(`DELETE FROM tblmemrates WHERE memrateid=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});


//view membership
function viewMembership(req, res, next) {
  db.query(`SELECT u.*, b.*, s.* from 
    tblmemrates u inner join tblcat b ON u.
    memcat = b.membershipID JOIN tblmemclass s 
    ON s.memclassid=u.memclass where b.status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewMembership = results;
    //moments dateadded
        for (var i = 0; i < req.viewMembership.length; i++) {
          req.viewMembership[i].Dateadded = moment(results[i].Dateadded).format("LL");
        }
    return next();
  })
}


//insert membership classes
router.post('/memclass', (req, res) => {
  fullname= req.session.user.userfname + " " + req.session.user.userlname
  db.query(`INSERT INTO tblmemclass 
    ( memclassname,memclassdesc, status, Dateadded, addedby) 
    VALUES (?, ?,1, CURDATE(),?)`, [req.body.classname, req.body.classdesc,fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

/*edit membership class*/
router.post('/memclass/edit', (req, res) => {
  db.query(`UPDATE tblmemclass SET memclassname=?,memclassdesc=? 
    WHERE memclassid=?`, [req.body.classname, req.body.classdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

//delete memebrship class
router.post('/memclass/delete', (req, res) => {
  db.query(`UPDATE tblmemclass SET status=2 WHERE memclassid=?`, [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

//view membership classes
function viewHie(req, res, next) {
  db.query(`SELECT * FROM tblmemclass WHERE status=1`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewHie = results;
      //moments dateadded
      for (var i = 0; i < req.viewHie.length; i++) {
        req.viewHie[i].Dateadded = moment(results[i].Dateadded).format("LL");
      }
    return next();
  })
}

//Transactions..... 

//view pending
function viewPend(req, res, next) {
  db.query(`select u.* , r.* , cl.* , ct.* , 
    m.* ,p.* , o.* from tbluser u join tblmembership m 
    ON m.usersid=u.userid inner join 
    tblmemrates r ON m.membershiprateid=r.memrateid inner join 
    tblmemclass cl ON r.memclass= cl.memclassid 
    Inner join tblcat ct on r.memcat = ct.membershipID 
    join tblpayment p on p.userid=u.userid join 
    tblor o on o.orid=p.ornum
    where m.status = "Pending" `, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewPend = results;
    return next(); 
  })
}

//view update interbranch
function viewUpdate(req, res, next) {
  db.query(`UPDATE tbluser u 
    join tblmembership m ON m.usersid=u.userid 
    inner join tblmemrates r ON m.membershiprateid=r.memrateid 
    inner join tblmemclass cl ON r.memclass= cl.memclassid 
    Inner join tblcat ct on r.memcat = ct.membershipID 
    SET u.branch=NULL where m.status = 'Pending' and ct.membershipname='Interbranch'`, (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      return next()
    };
  })
};

//function useraddid
function useraddid(req, res, next) {
  db.query(`SELECT (userid+1)id FROM tbluser ORDER BY userid DESC LIMIT 1`, function (err, results, fields) {
    if (err) return res.send(err)
    req.newuserid = results[0].id
    console.log(req.newuserid)
    return next();
  })
}

//update of pending to regular
router.post('/pending/update', useraddid, (req, res) => {
  db.query(`select * from tblpromo 
    where CURDATE() > startdate and 
    CURDATE() < enddate and status='Active'`, (err, results, fields) => {
    if(results[0]){
    var a= results[0].discount / 100
    db.query(`UPDATE tblmembership SET status='Paid', acceptdate=CURDATE() Where usersid=?`, [req.body.id], (err, results, fields) => {
      db.query(`UPDATE tbluser u 
        join tblmembership m ON m.usersid=u.userid 
        inner join tblmemrates r ON m.membershiprateid=r.memrateid 
        inner join tblmemclass cl ON r.memclass= cl.memclassid 
        Inner join tblcat ct on r.memcat = ct.membershipID  
        SET m.expirydate = case when cl.memclassid = r.memclass 
        then curdate() + interval r.memperiod MONTH END, userpassword=12345 where usersid=?`, [req.body.id], (err, results, fields) => {
        db.query(`UPDATE tblmembership m 
          join tblpayment p on m.usersid = p.userid 
          inner join tblmemrates r on m.membershiprateid = r.memrateid 
          SET p.amount=r.memfee - (r.memfee * ?), p.paymentdate=CURDATE(), 
          p.classification='4', p.branchid=? Where p.userid= ?`, [a, req.session.user.branch,req.body.id], (err, results, fields) => {  
          if (err)
            console.log(err);
          else {
            res.redirect('/pending');
              }
      });
          });
      });
    }
    else{
    db.query(`UPDATE tblmembership SET status='Paid', acceptdate=CURDATE() Where usersid=?`, [req.body.id], (err, results, fields) => {
      db.query(`UPDATE tbluser u 
        join tblmembership m ON m.usersid=u.userid 
        inner join tblmemrates r ON m.membershiprateid=r.memrateid 
        inner join tblmemclass cl ON r.memclass= cl.memclassid 
        Inner join tblcat ct on r.memcat = ct.membershipID  
        SET m.expirydate = case when cl.memclassid = r.memclass 
        then curdate() + interval r.memperiod MONTH END, userpassword=12345 
        where usersid=?`, [req.body.id], (err, results, fields) => {
        db.query(`UPDATE tblmembership m 
          join tblpayment p on m.usersid = p.userid 
          inner join tblmemrates r on m.membershiprateid = r.memrateid 
          SET p.amount=r.memfee, p.paymentdate=CURDATE(), p.classification='1' ,
          p.branchid=? Where p.userid= ?`, [req.session.user.branch,req.body.id], (err, results, fields) => {  
          if (err)
            console.log(err);
          else {
            res.redirect('/pending');
              }
      });
          });
      });
  }
});
  });

//check promo
function check(req, res, next) {
  db.query(`select * from tblpromo 
    where CURDATE() > startdate and 
    CURDATE() < enddate and status='Active'`, function (err, results, fields) {
    if (results[0]){
      console.log(results)
      var a= results[0].discount / 100
      console.log(a)
    }
    return next();
  })
}

  // db.query('UPDATE tbluser SET usertype = 2 WHERE userid = ?', [req.params.userId], (err, results, fields) => {
  //   if(err) console.log(err)

  //   else{
  //     res.redirect('/pending')
  //   }
  // })


//view of regular exclusive members
function viewReg(req, res, next) {
  db.query(`select u.* , r.*, ct.*, cl.* ,m.*,b.* from tbluser u join tblmembership m ON m.usersid=u.userid 
inner join tblmemrates r ON r.memrateid=m.membershiprateid 
inner join tblmemclass cl on r.memclass=cl.memclassid
 inner join tblcat ct on ct.membershipID=r.memcat inner join tblbranch b 
 on b.branchID=u.branch where m.status='Paid'`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewReg = results;
    //moments expiration
    for (var i = 0; i < req.viewReg.length; i++) {
      req.viewReg[i].expirydate = moment(results[i].expirydate).format("LL");}
    return next();
  })
}

//view of regular interbranch members
function viewInt(req, res, next) {
  db.query(`select u.* , r.*, ct.*, cl.* ,m.* 
    from tbluser u join tblmembership m ON m.usersid=u.userid 
    inner join tblmemrates r ON r.memrateid=m.membershiprateid 
    inner join tblmemclass cl on r.memclass=cl.memclassid 
    inner join tblcat ct on ct.membershipID=r.memcat where m.status='Paid' 
    and u.branch is NULL`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewInt = results;
    //moments expiration
    for (var i = 0; i < req.viewInt.length; i++) {
      req.viewInt[i].expirydate = moment(results[i].expirydate).format("LL");}
    return next();
  })

}

// //view update regular to suspended
function viewSusp(req, res, next) {
  db.query(`UPDATE tblmembership m join tbluser u 
    on m.usersid=u.userid SET m.status='Suspended', 
    u.userpassword=NULL where m.expirydate <= CURDATE()`, (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      return next()
    };
  })
};

//view to payment
function viewPay(req, res, next) {
  db.query(`select u.* , r.*, ct.*, cl.* ,m.* 
    from tbluser u join tblmembership m 
    ON m.usersid=u.userid inner join tblmemrates r 
    ON r.memrateid=m.membershiprateid inner join tblmemclass cl on r.memclass=cl.memclassid inner join 
    tblcat ct on ct.membershipID=r.memcat where m.status="Paid"`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewPay = results;
    //moments expiration
    for (var i = 0; i < req.viewPay.length; i++) {
      req.viewPay[i].expirydate = moment(results[i].expirydate).format("LL");
    }
    
    for (var i = 0; i < req.viewPay.length; i++) {
      req.this=(req.viewPay[i].userid)
    }
    console.log(req.this) 
    db.query(`select u.* , r.*, ct.*, cl.* ,m.*,p.* from tbluser u join tblmembership m 
      ON m.usersid=u.userid inner join tblmemrates r 
      ON r.memrateid=m.membershiprateid inner join tblmemclass 
      cl on r.memclass=cl.memclassid inner join tblcat ct on
      ct.membershipID=r.memcat inner join tblpayment p on 
      p.userid=m.usersid where m.status="Paid" and classification=1 
      and u.userid=? order by paymentdate desc`,[req.this] ,function (err, results, fields) {
      if (err) return res.send(err);
      req.viewHis = results;
      //moments his
    for (var i = 0; i < req.viewHis.length; i++) {
      req.viewHis[i].paymentdate = moment(results[i].paymentdate).format("LL");
      }
        return next();
  })
  })
}

//payment
router.post('/payment',oradd,(req, res) => {
    db.query(`INSERT INTO tblpayment (userid,ornum)VALUES(?,?)`, [req.body.id, req.oradd], (err, results, fields) => {
      db.query(`UPDATE tbluser u 
        join tblpayment p on p.userid=u.userid 
        inner join tblmembership m on m.usersid=u.userid 
        inner join tblmemrates r on r.memrateid=m.membershiprateid 
        SET p.paymentdate=CURDATE() ,amount=r.memfee , classification =1, p.branchid=? 
        where p.paymentdate is null and p.userid= ?`, [req.session.user.branchid,req.body.id], (err, results, fields) => {
        db.query(`UPDATE tbluser u join
         tblmembership m ON m.usersid=u.userid 
         inner join tblmemrates r ON m.membershiprateid=r.memrateid 
         inner join tblmemclass cl ON r.memclass= cl.memclassid 
         Inner join tblcat ct on r.memcat = ct.membershipID  
         SET m.expirydate = case when cl.memclassid = r.memclass 
         then m.expirydate + interval r.memperiod MONTH END where u.userid=?`, [req.body.id], (err, results, fields) => {
          // fullname=(results[0].userfname + " " +results[0].userlname)
          //   date=moment(results[0].recentpay).format("LL");
          //   fee=results[0].memfee
            if (err)
              console.log(err);
              // else {
              //   mailer.sendMail({
              //   from: 'ateamsupmanila@gmail.com',
              //   to:results[0].useremail,
              //   subject:'Membership Payment Receipt ',
              //   html:
              //       " <table cellpadding='0' cellspacing='0' width='50%' style='margin:0 auto; box-shadow: 0 2px 10px -2px rgba(0, 0, 0, .2);'> <tr> <td bgcolor='gold' style='width:70%; margin:0 auto; box-shadow: 0 2px 10px -2px rgba(0, 0, 0, .2);'> <table cellpadding='0' cellspacing='0' width='100%' style='max-width: 500px;' class='wrapper'> <tr> <td valign='top' style='padding: 0 10px;' class='logo'><a href='http://litmus.com' target='_blank'> <img src='https://i.imgur.com/zeItuiJ.png' width='60' height='60' style='border:4px solid white; border-radius:50%;position:relative; top:15px;display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;'> <span style='float:right; position:relative; color: white; top:-35px; left:-155px; font-size:28px; font-weight:bold;font-family:sans-serif;'> A - TEAM FITNESS</span></a></td></tr></table> </td></tr><tr> <td bgcolor='#333333'> <table cellpadding='0' cellspacing='0' width='100%' style='max-width: 500px;' class='wrapper'> <tr> <td style='padding: 20px 0;'></td></tr></table> </td></tr><tr> <td bgcolor='#ffffff' align='center' style='padding: 0 15px 10px 15px;' class='section-padding'> <table cellpadding='0' cellspacing='0' width='100%' style='max-width: 500px;' class='responsive-table'> <tr> <td> <table width='100%' cellspacing='0' cellpadding='0'> <tr> <td align='left' style='padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;' class='padding'><br>Hello <b> " +fullname+ " </b>, <br><br>You paid your membership fee recently<b> (" +date+ ").</b>Amounting to a total of <b>PHP "+fee+".00.</b> Regarding this, you will be billed depending on the membership type you are currently applied on. </b><br><br>Contact us if there have been any mistakes on our part.<br><br><br></td></tr></table> </td></tr></table> </td></tr><tr> </tr><tr> <td bgcolor='#333333' align='center' style='padding: 20px 0px;'> <table width='100%' cellspacing='0' cellpadding='0' align='center' style='max-width: 500px;' class='responsive-table'> <tr> <td align='center' style='font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#ffffff;'>Mobile: 0933 412 7526<br>Newton Plaza, 4408 Old. Sta. Mesa St. Sta. Mesa Manila, Philippines<br><a href='#' target='_blank' style='color: #ffffff; text-decoration: none;'>A-Team Fitness.com</a><span style='font-family: Arial, sans-serif; font-size: 12px; color: #444444;'>&nbsp;&nbsp;|&nbsp;&nbsp;</span><a style='color: #ffffff; text-decoration: none;'>by A-Team Fitness team</a></td></tr></table> </td></tr></table>",
              //   /*template: 'send', //name ng html file na irerender*/
              //   },
              //   function(err, response){
              //       if(err){
              //           console.log("BILL NOT SENT");
              //           console.log(err);
              //       }
              //       else{
              //           console.log("BILL SENT!");
              //           }
              //       }
              //       );

              //   
              // }
            res.redirect('/payment');
          });
          });
          });
 
         });

//payment2
router.post('/payment/walkin',(req, res) => {
      db.query(`UPDATE tbluser u 
        join tblpayment p on p.userid=u.userid 
        SET p.paymentdate=CURDATE()
        where p.paymentdate is null and p.userid= ?`, [req.body.uid], (err, results, fields) => {
          res.redirect('/walkins');
          });
          });
 

//freezing
router.post('/freeze',oradd,(req, res) => {
 db.query(`INSERT INTO tblfreeze(userfid,freezedmonths,datefrozen,genid) values(?,?,?,4)`, [req.body.id,req.body.freezevalue,req.body.effect], (err, results, fields) => {
  db.query(`INSERT INTO tblpayment(userid,classification,ornum)VALUES(?,2,?)`,[req.body.id,req.oradd], (err, results, fields) => {
    db.query(`UPDATE tblfreeze f inner join tblgenera g ON f.genid=g.generalID 
      inner join tbluser u ON u.userid=f.userfid 
      set total = fee * freezedmonths Where minus is null and userid=?`,[req.body.id], (err, results, fields) => {
      db.query(`UPDATE tblfreeze SET freezeduntil=datefrozen + interval ?
       MONTH,status='Unpaid' Where minus is null and userfid=?`, [req.body.freezevalue,req.body.id], (err, results, fields) => {          
        db.query(`UPDATE tblfreeze f 
          join tblpayment p on f.userfid=p.userid 
          SET amount=total where paymentdate is null and f.userfid=?`, [req.body.id], (err, results, fields) => {  
          if (err)
            console.log(err);
          else {
            res.redirect('/freezed');
          }
        });
      });
  });
})
  })
 })

//freeze online account
function Nulling(req, res, next) {
  db.query(`select * from tblfreeze where datefrozen=CURDATE()`, function (err, results, fields) {
    if (err) return res.send(err);
    if(results[0])
      db.query(`UPDATE tbluser u join tblfreeze f on u.userid =
        f.userfid SET u.userpassword=NULL,usertype=10 where datefrozen=CURDATE()`
        ,(err, results, fields) => {
    })
    return next();
  })
}

//view freezed accounts
function viewFre(req, res, next) {
  db.query(`select u.* , r.*, ct.*, cl.* ,m.* ,f.*,p.*,g.* from tbluser u join tblmembership m ON m.usersid=u.userid 
inner join tblmemrates r ON r.memrateid=m.membershiprateid 
inner join tblmemclass cl on r.memclass=cl.memclassid 
inner join tblcat ct on ct.membershipID=r.memcat inner join tblfreeze f 
on f.userfid=u.userid inner join tblgenera g on g.generalID =f.genid
inner join tblpayment p on p.userid=u.userid where f.minus is null and classification=2`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewFre = results;
    //moments datefrozen
    for (var i = 0; i < req.viewFre.length; i++) {
      req.viewFre[i].datefrozen = moment(results[i].datefrozen).format("LL");
    }
    //moments freezeduntil
    for (var i = 0; i < req.viewFre.length; i++) {
      req.viewFre[i].freezeduntil = moment(results[i].freezeduntil).format("LL");
    }
    return next();
  })
}

//payment freeze
router.post('/payment/freeze',(req, res) => {
  db.query(`UPDATE tblfreeze SET status='Paid' where unfreezedate is NULL and userfid=?`, [req.body.ids], (err, results, fields) => {
    db.query(`UPDATE tblfreeze f join tblpayment p on p.userid=f.userfid Set paymentdate=CURDATE(),
p.branchid=?
where f.unfreezedate is null and classification = 2 and userfid=?`, [req.session.user.branch,req.body.ids], (err, results, fields) => {
      if (err)
          console.log(err);
        else {
          res.redirect('/freezed'); 
        }
      });
    });
   })

//unfreezing
router.post('/unfreeze',(req, res) => {
  db.query(`UPDATE tbluser u join tblfreeze f on f.userfid=u.userid 
    inner join tblpayment p on p.userid=u.userid inner join tblmembership m on m.usersid=u.userid 
    SET minus=(DATEDIFF(freezeduntil,datefrozen)) + (DATEDIFF(CURDATE(),freezeduntil)), unfreezedate=CURDATE() 
    where f.minus is null and u.userid = ?`, [req.body.id], (err, results, fields) => {
      db.query(`UPDATE tbluser u join tblfreeze f on f.userfid=u.userid 
        inner join tblpayment p on p.userid=u.userid 
        inner join tblmembership m on m.usersid=u.userid SET expirydate=expirydate + interval minus DAY where u.userid = ? and classification =2`, [req.body.id], (err, results, fields) => {
          db.query(`UPDATE tbluser u join tblfreeze f on f.userfid=u.userid 
            inner join tblpayment p on p.userid=u.userid inner join tblmembership m on 
            m.usersid=u.userid SET userpassword=12345,usertype=2 where u.userid = ? and classification =2`, [req.body.id], (err, results, fields) => {
            if (err)
                console.log(err);
              else {
                res.redirect('/freezed');
              }
            });
          });
         })
  })

//class drops
function viewGcl(req, res, next) {
  db.query(`select * from tblclass`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewGcl = results;
    return next();
  })
}

//class trainerdrops
function viewGt(req, res, next) {
  db.query(`select * from tbltrainer`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewGt = results;
    return next();
  })
}

//creating groupclass
router.post('/groupclass',(req, res) => {
  var sched = req.body.sched.toString()
  var start = moment(req.body.startt, 'hh:mm A').format('HH:mm:ss')
  var end = moment(req.body.endt, 'hh:mm A').format('HH:mm:ss')
  db.query(`
  INSERT INTO tbleventclass (starttime, endtime, slot, eventclassname, tbleventclass.type, tbleventclass.desc, days) 
  VALUES ( ?, ?, ?, ?, 1, ?, ? );
  `, [start, end, req.body.slot, req.body.event, req.body.desc, sched ], (err, results, fields) => {
    if (err)
        console.log(err);
      else {
        res.redirect('/t/classes');
      }
    });
   })

function viewClass2 (req, res, next){
  db.query(`SELECT * from tbleventclass where tbleventclass.type = 1`, (err, results) => {
    if (err) console.log(err)
    if (results.length != 0){
      results.forEach((results) => {
      results.starttime = moment(results.starttime, 'HH:mm:ss').format('hh:mm A')
      results.endtime = moment(results.endtime, 'HH:mm:ss').format('hh:mm A')
      })
      req.viewClass2 = results
      return next()
    }
    return next()
  })
}

// function viewClass2 (req, res, next){
//   db.query(`SELECT * from tbleventclass where tbleventclass.type = 2 AND status IS NULL `, (err, results) => {
//     if (err) console.log(err)
//     if (results.length != 0){
//       results.forEach((results) => {
//       results.starttime = moment(results.starttime, 'HH:mm:ss').format('hh:mm A')
//       results.endtime = moment(results.endtime, 'HH:mm:ss').format('hh:mm A')
//       })
//       req.viewClass2 = results
//       return next()
//     }
//     return next()
//   })
// }


//creating event 
router.post('/event',(req, res) => {
  db.query(`INSERT INTO tbleventclass
    (eventclassname,startdate,enddate,starttime,endtime,slot,type,desc)
    VALUES(?, ?, ?, ?, ?, ?, 2, ?)`,
    [req.body.event, req.body.start, req.body.end, 
    req.body.startt, req.body.endt, req.body.slot, req.body.desc], (err, results, fields) => {
    if (err)
        console.log(err);
      else {
        res.redirect('/events');
      }

    });
   })



//view of events
function viewEve(req, res, next) {
  db.query(`select * from tbleventclass where type=2`, function (err, results, fields) {
    if (err) return res.send(err);
    results.forEach((results) => {
      results.starttime = moment(results.starttime,'HH:mm:ss').format('hh:mm A')
      results.endtime = moment(results.endtime,'HH:mm:ss').format('hh:mm A')
    })

    req.viewEve = results;
    //moments expiration
    // for (var i = 0; i < req.viewInt.length; i++) {
    //   req.viewInt[i].expiry = moment(results[i].expiry).format("LL");}
    return next();
  })
}

//view trainer assign
function viewAss(req, res, next){
  db.query(`SELECT * from tbltrainer`,function(err, results, fields){
    if(err) return res.send(err);
    req.viewAss = results;
    return next();
  })
}


//view trainer-client partners
function viewPer(req, res, next){
  db.query(`
    SELECT * from tbluser
    JOIN tbppt on tbppt.memid = tbluser.userid
    JOIN tbltrainer on tbltrainer.trainerid = tbppt.trainid
    GROUP BY userid`,
    
    function(err, results, fields){
    if(err) return res.send(err);
    req.viewPer = results; 
    return next();
  })
}

//assigning trainers
router.post('/assign',(req, res) => {
  db.query(`INSERT INTO tbppt(memid,trainid,status)VALUES(?, ?, 2)`, [req.body.memberid, req.body.trainerid], (err, results, fields) => {
    if (err)
        console.log(err);
      else {
        res.redirect('/personal');
      }

    });
})

//function regularid
function regid(req, res, next) {
  db.query(`SELECT max(userid)+1 id FROM tbluser`, function (err, results, fields) {
    if (err) return res.send(err)
    req.regid = results[0].id
    console.log(req.regid)
    return next();
  })
}

//add exlusive member manually
router.post('/exclusive/add',regid,(req, res) => {
  db.query(`INSERT INTO tbluser
    (userfname,userlname,usergender,userbday,useraddress,
    usermobile,useremail,userusername,branch,usertype,userpassword)
    VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, 2, ?)`, [req.body.fname, req.body.lname, req.body.gen, req.body.bday, req.body.addr, req.body.mobile, req.body.email, req.body.username, req.body.branch, req.body.password], (err, results, fields) => {
    db.query(`INSERT INTO tblmembership
      (usersid,membershiprateid,specializationid)
      VALUES(? , ?,  ?)`,[req.regid, req.body.membership, req.body.special],(err, results, fields) => {
      db.query(`UPDATE tbluser u join 
        tblmembership m on m.usersid=u.userid set signdate=CURDATE(), 
        m.status='PAID' where u.userid=?`, [req.regid], (err, results, fields) => {
        db.query(`UPDATE tbluser u join 
          tblmembership m ON m.usersid=u.userid inner join 
          tblmemrates r ON m.membershiprateid=r.memrateid 
          inner join tblmemclass cl ON r.memclass= cl.memclassid 
          Inner join tblcat ct on r.memcat = ct.membershipID  
          SET m.expirydate = case 
          when cl.memclassid = r.memclass then curdate() + interval r.memperiod 
          MONTH END where usersid=?`, [req.regid], (err, results, fields) => {
        if (err)
            console.log(err);
          else {
            res.redirect('/regular');
          }

        });
      });
    })
  })
  })

//add interbranch member manually

router.post('/interbranch/add',regid,(req, res) => {
  db.query("INSERT INTO tbluser(userfname,userlname,usergender,userbday,useraddress,usermobile,useremail,userusername,usertype,userpassword)VALUES( ?, ?, ?, ?, ?, ?, ?, ?, 2, ?)", [req.body.fname, req.body.lname, req.body.gen, req.body.bday, req.body.addr, req.body.mobile, req.body.email, req.body.username, req.body.password], (err, results, fields) => {
    db.query(`INSERT INTO tblmembership(usersid,membershiprateid,specializationid)VALUES(?,?,?)`,[req.regid,req.body.membership,req.body.special],(err, results, fields) => {
      db.query(`UPDATE tbluser u join tblmembership m on m.usersid=u.userid set signdate=CURDATE(), m.status='PAID' where u.userid=?`, [req.regid], (err, results, fields) => {
        db.query(`UPDATE tbluser u join tblmembership m ON m.usersid=u.userid inner join tblmemrates r ON m.membershiprateid=r.memrateid inner join tblmemclass cl ON r.memclass= cl.memclassid Inner join tblcat ct on r.memcat = ct.membershipID  SET m.expirydate = case when cl.memclassid = r.memclass then curdate() + interval r.memperiod MONTH END where usersid=?`, [req.regid], (err, results, fields) => {
        if (err)
            console.log(err);
          else {
            res.redirect('/regular');
          }

        });
      });
    })
  })
  })

//view exclusinve membership dropdowns
function viewExc(req, res, next){
  db.query('select mr.*,mc.*,ct.* from tblmemrates mr join tblmemclass mc on mc.memclassid = mr.memclass inner join tblcat ct on mr.memcat=ct.membershipID where ct.membershipname = "Exclusive"',function(err, results, fields){
    if(err) return res.send(err);
    req.viewExc = results;
    return next();
  })
} 
//view interbranch membership dropdowns
function viewExcc(req, res, next){
  db.query('select mr.*,mc.*,ct.* from tblmemrates mr join tblmemclass mc on mc.memclassid = mr.memclass inner join tblcat ct on mr.memcat=ct.membershipID where ct.membershipname = "Interbranch"',function(err, results, fields){
    if(err) return res.send(err);
    req.viewExcc = results;
    return next();
  })
}

//view exclusinve/interbranch membership branch dropdowns
function viewExcB(req, res, next){
  db.query('select * from tblbranch where user is not NULL',function(err, results, fields){
    if(err) return res.send(err);
    req.viewExcB = results;
    return next();
  })
} 

//view exclusinve/interbracnh special dropdowns
function viewSp(req, res, next){
  db.query('select * from tblspecial',function(err, results, fields){
    if(err) return res.send(err);
    req.viewSp = results;
    return next();
  })
}

//addwalkin
router.post('/walkin',regid,oradd,(req, res) => {
  db.query("INSERT INTO tbluser(userfname,userlname,usermobile,userusername)VALUES(?, ?, ?, ?)", [req.body.fname, req.body.lname,req.body.mobile, req.body.username], (err, results, fields) => {
    db.query("INSERT INTO tblpayment(userid,classification,amount,branchid,ornum)VALUES(?, 3,50, ?, ?)", [req.regid,req.session.user.branch,req.oradd], (err, results, fields) => {
      if (err)
          console.log(err);
        else {
          res.redirect('/walkins');
        }

    });
    });
})

//walkinvalidation
router.post('/walkinval', (req, res) => {
    db.query(`SELECT u.*, p.* from tbluser u join tblpayment p on
      u.userid=p.userid where p.classification = 3 and p.paymentdate IS NULL`, (err, out) => {
        if(err) console.log(err)
        if(out.length > 0){
           res.send(out)
        } 
    })
})

//view walkin
function viewWal(req, res, next){
  db.query(`select u.*,p.* from tbluser u join tblpayment p on p.userid=u.userid 
    where u.usertype is 
    null and paymentdate is null`,function(err, results, fields){
    if(err) return res.send(err);
    req.viewWal = results;
    return next();
  })
}


// VIEW PENDING PT CHANGE
function viewPendingChange ( req,res,next ) {
  const query = `
  SELECT * FROM tblchange
  JOIN tbluser on tbluser.userid = tblchange.memid
  JOIN tbltrainer on tbltrainer.trainerid = tblchange.trainid
  `
  db.query(query, ( err,results ) => {
    if (err) console.log(err)
    req.pendingChange = results
    return next();
  })
}

// ACCEPT PENDING PT CHANGE
router.post('/pending/pt/accept', (req, res) => {
  db.query(`DELETE from tblchange where changeID = ?`, [ req.body.changeid ], ( err,out ) => {
    if(err) console.log(err)
    db.query(`UPDATE tbppt SET status = 0 WHERE trainid = ? and memid = ?`, [ req.body.trainid, req.body.memid ], ( err,out ) => {
      if(err) console.log(err)
      db.query(`UPDATE tbppt SET scheduleStatus = 2 WHERE memid = ? and trainid = ? and scheduleStatus = 1`, [ req.body.memid, req.body.trainid ], ( err,out ) => {
        if(err) console.log(err)
      }) 
    })
  })
})

// REJECT PENDING PT CHANGE
router.post('/pending/pt/reject', (req, res) => {
  db.query(`DELETE from tblchange where changeID = ?`, [ req.body.changeid ], ( err,out ) => {
    if(err) console.log(err)
  })
})

// VIEW SESSION PAYMENT REQUEST
function viewPaymentSession ( req,res,next ) {
  const query = `
  SELECT * FROM tblsession
  JOIN tbppt on tblsession.sessionID = tbppt.sessionID
  JOIN tbluser on tbluser.userid = tbppt.memid
  JOIN tblmembership on tblmembership.usersid = tbluser.userid
  JOIN tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
  JOIN tblmemclass on tblmemclass.memclassid = tblmemrates.memclass 
  JOIN tblcat on tblcat.membershipID = tblmemrates.memcat
  where amount IS NOT NULL
  group by tbluser.userid
  `
  db.query(query, ( err,results ) => {
    if (err) console.log(err)
    req.paymentSession = results
    return next();
  })
}
// PAY
router.post('/payment/session/pay', oradd,(req, res) => {
  const query = `
  UPDATE tblsession SET 
  session_count = session_count + amount,
  sessionForSched = sessionForSched + amount,
  sessionStatus = NULL, 
  amount = NULL 
  WHERE sessionID = ?
  `
  db.query(query, [ req.body.id ], ( err,out ) => {
    if(err) console.log(err)
    db.query(`INSERT INTO tblpayment (userid, paymentdate, amount, classification, branchid,ornum) VALUES (?, CURDATE(), ?, 5, ?, ?)`, [ req.body.userid, req.body.amount, req.session.user.branch, req.oradd], ( err,out ) => {
      if(err) console.log(err)
    })
  })
})
// REJECT 
router.post('/payment/session/reject', (req, res) => {
  db.query(`UPDATE tblsession SET amount = NULL, sessionStatus = NULL WHERE sessionID = ?`, [ req.body.id ], ( err,out ) => {
    if(err) console.log(err)
  })
})

// VIEW ALL SCHEDULES
function sessionsToday ( req,res,next ) {
  const query = `
  SELECT * from tbppt 
  JOIN tbluser on tbluser.userid = tbppt.memid
  JOIN tbltrainer on tbltrainer.trainerid = tbppt.trainid
  JOIN tblsession on tblsession.sessionID = tbppt.sessionID
  WHERE sessionDate = CURDATE() AND scheduleStatus = 1
  `
  db.query(query, ( err,results ) => {
    if (err) console.log(err)
    req.sessionsToday = results
    return next();
  })
}
// ACCEPT SCHEDULE CONFIRM
router.post('/session/confirm', (req, res) => {
  db.query(`UPDATE tblsession SET session_count = session_count - 1 where sessionID = ?`, [ req.body.sessionid ], (err, out) => {
    db.query(`UPDATE tbppt SET scheduleStatus = 0, description = 'succesful' where PTid = ?`, [ req.body.ptid ], (err, out) => {
    })
  })
})

// ACCEPT SCHEDULE VOID
router.post('/session/void', (req, res) => {
  db.query(`UPDATE tblsession SET sessionForSched = sessionForSched + 1 where sessionID = ?`, [ req.body.sessionid ], (err, out) => {
    db.query(`UPDATE tbppt SET scheduleStatus = 0, description = 'void' where PTid = ?`, [ req.body.ptid ], (err, out) => {
    })
  })
})

// ALL USERS
router.post('/users', (req, res) => {
  db.query('SELECT * FROM tbluser', (err, out) => {
    if(err) console.log(err)
    if(out.length > 0){
        res.send(out)
    }
  })
})

// ALL USERS PARTICIPANT
router.post('/view/event/participant', (req, res) => {
  const query = `
  SELECT * FROM tbluce  
  JOIN tbluser on tbluser.userid =  tbluce.intUCEUserID 
  JOIN  tbleventclass on tbleventclass.eventclassid = tbluce.intUCEClassID
  WHERE eventclassid = ?
  `
  db.query(query, [ req.body.id ],(err, out) => {
    if(err) console.log(err)
    res.send(out)
  })
})

router.post('/view/history', (req, res) => {
  const query = `
  select u.* , p.* from tbluser u 
  join tblpayment p on p.userid = u.userid where u.userid= ? and p.classification='1'
  `
  db.query(query, [ req.body.id ],(err, out) => {
    if(err) console.log(err)
    res.send(out)
  })
})


router.post('/logo', (req, res) => {
  console.log(req.files)
  pic=`${req.session.userfname + req.session.userlname + 'logo'}.jpg`
  req.files.img.mv('public/assets/images/'+pic, function(err){
  db.query(`UPDATE tblutilities Set logo = ? where utilid IS NOT NULL`, [pic], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/utilities'); 
    }
  });
});
}); 

// ALL NOTIFS
router.post('/view/notif', (req, res) => {
  db.query(`select * from tblmembership where status = 'pending'`, (err, out) => {
    if(err) console.log(err)
    res.send(out)
  })
})
router.post('/view/notif/payment', (req, res) => {
  db.query(`SELECT * FROM tblsession where amount IS NOT NULL`, (err, out) => {
    if(err) console.log(err)
    res.send(out)
  })
})

// VIEW ALL ACTIVE MEMBERS
router.post('/graph/membership/members', (req, res) => {
  const query = `
    SELECT memclassname FROM tblmemclass 
  `
  db.query(query, (err, out) => {
    if(err) console.log(err)
    res.send(out)
  })
}) 
router.post('/graph/membership/members/count', (req, res) => {
  const query = `
    SELECT COUNT(*) FROM tblmembership 
    JOIN tblmemrates ON tblmemrates.memrateid = tblmembership.membershiprateid
    JOIN tblmemclass ON tblmemclass.memclassid = tblmemrates.memclass
    WHERE tblmembership.status = 'Paid' AND tblmemclass.memclassname = ?
  `
  db.query(query, [req.body.membership], (err, out) => {
    if(err) console.log(err)
    res.send(out)
  })
}) 

// VIEW UTILITIES
function viewUtils ( req,res,next ) {
  db.query('SELECT * FROM tblutilities', ( err,results ) => {
    if (err) console.log(err)
    req.utils = results[0]
    return next();
  })
}

function viewAdmin ( req,res,next ) {
  db.query('SELECT * FROM tbluser WHERE usertype = 1', ( err,results ) => {
    if (err) console.log(err)
    req.admin = results[0]
    return next();
  })
}

function viewRates ( req,res,next ) {
  db.query('SELECT * FROM tblgenera', ( err,results ) => {
    if (err) console.log(err)
    req.rates = results
    return next();
  })
}

// EDIT UTILITIES
router.post('/edit/utilities', (req, res) => {
  const queryutils = `
    UPDATE tblutilities 
    SET gymname = ?, 
      companyname = ?,
      address = ?,
      city = ?,
      phone = ?,
      email = ?,
      logo = ?,
      workdays = ?,
      currsymbol = ?,
      starttime = ?,
      endtime = ?
    WHERE utilid = 1
  `
  const queryadmin = `
    UPDATE tbluser 
    SET userfname = ?, 
      userlname = ?,
      userusername = ?,
      userpassword = ?
    WHERE userid = ?
  `
  db.query(queryutils, [
    req.body.gymname,
    req.body.companyname,
    req.body.address,
    req.body.city,
    req.body.phone,
    req.body.email,
    req.body.logo,
    req.body.newsched,
    req.body.currsymbol,
    req.body.starttime,
    req.body.endtime
  ],
  (err, out) => {
    db.query(queryadmin, [
      req.body.userfname,
      req.body.userlname,
      req.body.username,
      req.body.password,
      req.body.userid
    ],
    (err, out) => {
      if (err) console.log(err)
      res.send(out)
    })
    if (err) console.log(err)
  })
})


router.post('/edit/rates', (req, res) => {
  const query = `
    UPDATE tblgenera SET fee = ? WHERE generalID = ?
  `
  db.query(query, [req.body.rate, req.body.id], (err, out) => {
    if (err) console.log(err)
    res.send(out)
  })
})

// DASHBOARD REPORTS

// COUNT ACTIVE MEMBERS
function countActiveMembers (req, res, next)  {
  db.query(`SELECT usersid FROM tblmembership WHERE status = 'paid'`, (err, results) => {
    if (err) console.log(err)
    req.countActiveMembers = results.length
    return next()
  })
}

// COUNT ACTIVE TRAINERS 
function countActiveTrainers (req, res, next)  {
  db.query(`SELECT trainerfname FROM tbltrainer`, (err, results) => {
    if (err) console.log(err)
    req.countActiveTrainers = results.length
    return next()
  })
}

// VIEW TOP USER
function viewTopUser (req, res, next)  {
  const query = `
    SELECT userid, MAX(pay_sum) AS total 
    FROM (SELECT userid, SUM(amount) AS pay_sum 
      FROM tblpayment 
        GROUP BY userid)a 
    GROUP BY pay_sum 
    ORDER BY total 
    DESC LIMIT 1
  `
  db.query(query, (err, results) => {
    if (err) console.log(err)
    const topUser = results[0]
    const query = `
      SELECT userid, 
        userfname, 
        userlname,
        pic, 
        acceptdate 
      FROM tbluser
      JOIN tblmembership ON tblmembership.usersid = tbluser.userid
      WHERE userid = ?
    `
    db.query(query, [topUser.userid], (err, results) => {
      if (err) console.log(err)
      results[0].total = Number.parseFloat(topUser.total).toFixed(2)
      results[0].acceptdate = moment(results[0].acceptdate).format('ll')
      req.topUser = results[0]
      return next()
    })
  })
}

// VIEW MEMBERS COUNT PER MONTH


router.post('/view/member/per/month', (req, res) => {
  const query = `
  SELECT A.monthname, IF(B.total IS NULL, 0, B.total )total 
  FROM (
    SELECT MONTHNAME(STR_TO_DATE(1, '%m'))monthname, (1)month
      UNION SELECT MONTHNAME(STR_TO_DATE(2, '%m'))monthname, (2)month
      UNION SELECT MONTHNAME(STR_TO_DATE(3, '%m'))monthname, (3)month
      UNION SELECT MONTHNAME(STR_TO_DATE(4, '%m'))monthname, (4)month
      UNION SELECT MONTHNAME(STR_TO_DATE(5, '%m'))monthname, (5)month
      UNION SELECT MONTHNAME(STR_TO_DATE(6, '%m'))monthname, (6)month
      UNION SELECT MONTHNAME(STR_TO_DATE(7, '%m'))monthname, (7)month
      UNION SELECT MONTHNAME(STR_TO_DATE(8, '%m'))monthname, (8)month
      UNION SELECT MONTHNAME(STR_TO_DATE(9, '%m'))monthname, (9)month
      UNION SELECT MONTHNAME(STR_TO_DATE(10, '%m'))monthname, (10)month
      UNION SELECT MONTHNAME(STR_TO_DATE(11, '%m'))monthname, (11)month
      UNION SELECT MONTHNAME(STR_TO_DATE(12, '%m'))monthname, (12)month
      )A LEFT JOIN (
      SELECT MONTHNAME(acceptdate)monthname, 
      COUNT(acceptdate)total 
      FROM tblmembership 
      GROUP BY monthname
    )B ON A.monthname= B.monthname ORDER BY A.month ASC
  `
  db.query(query, (err, out) => {
    if (err) console.log(err)
    res.send(out)
  })
})

//change membership dropdowns
function viewMemChange ( req,res,next ) {
  const query = `
  select r.*, cl.*,ct.* from tblmemrates r inner join tblmemclass cl on
  r.memclass=cl.memclassid inner join tblcat ct on 
  ct.membershipID=r.memcat
  `
  db.query(query, ( err,results ) => {
    if (err) console.log(err)
    req.MemChange = results
    return next();
  })
}

//change membership OR
function viewMemChangeOr ( req,res,next ) {
  const query = `
  select * from tblgenera where generalID=6
  `
  db.query(query, ( err,results ) => {
    if (err) console.log(err)
    req.MemChangeOr = results
    return next();
  })
}

//change membership
router.post('/changemem',oradd, (req, res) => {
  db.query(`UPDATE tblmembership 
    SET membershiprateid=? where usersid=? `,[req.body.memid,req.body.usersid], (err, results, fields) => {
    db.query(`UPDATE tbluser u 
    join tblmembership m ON m.usersid=u.userid 
    inner join tblmemrates r ON m.membershiprateid=r.memrateid 
    inner join tblmemclass cl ON r.memclass= cl.memclassid 
    Inner join tblcat ct on r.memcat = ct.membershipID  
    SET m.upgradedate = curdate() + interval ? MONTH END
    where usersid=?`,[req.body.per ,req.body.usersid], (err, results, fields) => {
      db.query(`Insert Into tblpayment 
        (userid,paymentdate,amount,classification,branchid,or)
        VALUES(?, CURDATE(), ?, 6, ?, ?) `,
        [req.body.usersid, req.body.total, req.session.user.branch,req.oradd], (err, results, fields) => {
          db.query(`UPDATE tbluser u 
          join tblmembership m ON m.usersid=u.userid 
          inner join tblmemrates r ON m.membershiprateid=r.memrateid 
          inner join tblmemclass cl ON r.memclass= cl.memclassid 
          Inner join tblcat ct on r.memcat = ct.membershipID  
          SET m.expirydate=m.upgradedate
          where usersid=?`,[req.body.usersid], (err, results, fields) => {
          if(err) console.log(err) 
          else{
             res.redirect('/regular')
          }
  })
})
  })
  })
   })

//change membership
router.post('/changememin', oradd,(req, res) => {
  db.query(`UPDATE tblmembership 
    SET membershiprateid=? where usersid=? `,[req.body.memid,req.body.usersid], (err, results, fields) => {
    db.query(`UPDATE tbluser u 
    join tblmembership m ON m.usersid=u.userid 
    inner join tblmemrates r ON m.membershiprateid=r.memrateid 
    inner join tblmemclass cl ON r.memclass= cl.memclassid 
    Inner join tblcat ct on r.memcat = ct.membershipID  
    SET m.upgradedate = case 
    when cl.memclassid = r.memclass then curdate() + interval r.memperiod MONTH END
    where usersid=?`,[req.body.usersid], (err, results, fields) => {
      db.query(`Insert Into tblpayment 
        (userid,paymentdate,amount,classification,branchid,or)
        VALUES(?, CURDATE(), ?, 6, ?, ?) `,
        [req.body.usersid, req.body.total, req.session.user.branch, req.oradd], (err, results, fields) => {
          db.query(`UPDATE tbluser u 
          join tblmembership m ON m.usersid=u.userid 
          inner join tblmemrates r ON m.membershiprateid=r.memrateid 
          inner join tblmemclass cl ON r.memclass= cl.memclassid 
          Inner join tblcat ct on r.memcat = ct.membershipID  
          SET m.expirydate=m.upgradedate
          where usersid=?`,[req.body.usersid], (err, results, fields) => {
          if(err) console.log(err) 
          else{
             res.redirect('/interregular')
          }
  })
})
  })
  })
   })

//view receipts
function viewReceipt(req, res, next) {
  db.query(`select u.*,p.* ,o.* from tbluser u join tblpayment p on p.userid = u.userid 
    join tblor o on o.orid=p.ornum where p.paymentdate is not null order by p.paymentdate desc`, function (err, results, fields) {
    if (err) return res.send(err); 
    req.viewReceipt = results;
       //moments dateadded
      for (var i = 0; i < req.viewReceipt.length; i++) {
        req.viewReceipt[i].paymentdate = moment(results[i].paymentdate).format("LL");
      }
    return next();
  })
}

//promoval
router.post('/promoval', (req, res) => {
    db.query(`SELECT * from tblpromo`, (err, out) => {
        if(err) console.log(err)
        if(out.length > 0){
           res.send(out)
        } 
    })
})

//expire promos
function Exppro(req, res, next) {
  db.query(`UPDATE tblpromo Set status= 'Inactive' , statusback='2' where enddate < CURDATE()`, (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      return next()
    };
  })
};


// QUERIES

// USER 
function quser (req,res,next) {
  const query = `
  SELECT * FROM tbluser
  JOIN tblmembership on tblmembership.usersid = tbluser.userid
  JOIN tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
  JOIN tblcat on tblcat.membershipID = tblmemrates.memcat
  JOIN tblmemclass on tblmemclass.memclassid = tblmemrates.memclass
  JOIN tblspecial on tblspecial.specialID = tblmembership.specializationid
  WHERE tblmembership.status != 'pending'
  `
  db.query(query, ( err,results ) => {
    results.forEach(( results ) => {
      results.acceptdate = moment(results.acceptdate).format("MMM DD, YYYY");
      results.userbday = moment().diff(results.userbday, 'years', false)
      // req.pt[0].trainerbday = moment().diff(req.pt[0].trainerbday, 'years', false)
    })
    req.quser = results
    return next()
  })
}

function qmembership (req,res,next) {
  const query = `
  SELECT * FROM tblmemrates
  JOIN tblcat on tblcat.membershipID = tblmemrates.memcat
  JOIN tblmemclass on tblmemclass.memclassid = tblmemrates.memclass
  `
  db.query(query, ( err,results ) => {
    results.forEach(( results ) => {
      results.Dateadded = moment(results.Dateadded).format("MMM DD, YYYY");
    })
    req.qmembership = results
    return next()
  })
}

function qwalkin (req,res,next) {
  const query = `
  SELECT * FROM tbluser 
  JOIN tblpayment on tblpayment.userid = tbluser.userid
  Where tbluser.usertype IS NULL
  `
  db.query(query, ( err,results ) => {
    results.forEach(( results ) => {
      results.paymentdate = moment(results.paymentdate).format("MMM DD, YYYY");
    })
    req.qwalkin = results
    return next()
  })
}

function qStaff (req,res,next) {
  const query = `
  SELECT * FROM tbluser 
  JOIN tblbranch on tblbranch.branchID = tbluser.branch
  WHERE usertype = 4
  `
  db.query(query, ( err,results ) => {
    req.qStaff = results
    return next()
  })
}

function qTrainer (req,res,next) {
  const query = `
  SELECT * FROM tbltrainer
  left JOIN tblbranch on tblbranch.branchID = tbltrainer.trainerbranch
  JOIN tblspecial on tblspecial.specialID = tbltrainer.trainerspecialization
  `
  db.query(query, ( err,results ) => {
    results.forEach(( results ) => {
      results.trainerbday = moment().diff(results.trainerbday, 'years', false)
    })
    req.qTrainer = results
    return next()
  })
}

function qClass (req,res,next) {
  const query = `
  SELECT * FROM tbleventclass where type = 1
  `
  db.query(query, ( err,results ) => {
    results.forEach(( results ) => {
      results.starttime = moment(results.starttime, 'HH:mm:ss').format("hh:mm A")
      results.endtime = moment(results.endtime, 'HH:mm:ss').format("hh:mm A")
    })
    req.qClass = results
    return next()
  })
}

function qEvent (req,res,next) {
  const query = `
  SELECT * FROM tbleventclass where type = 2
  `
  db.query(query, ( err,results ) => {
    results.forEach(( results ) => {
      results.startdate = moment(results.starttime, 'MM/DD/YYYY').format("MMM DD, YYYY")
      results.enddate = moment(results.enddate, 'MM/DD/YYYY').format("MMM DD, YYYY")
      results.starttime = moment(results.starttime, 'HH:mm:ss').format("hh:mm A")
      results.endtime = moment(results.endtime, 'HH:mm:ss').format("hh:mm A")
    })
    req.qEvent = results
    return next()
  })
}

function qSession (req,res,next) {
  const query = `
  SELECT * FROM tbppt 
  JOIN tbluser on tbluser.userid = tbppt.memid
  JOIN tbltrainer on tbltrainer.trainerid = tbppt.trainid
  WHERE scheduleStatus = 0
  `
  db.query(query, ( err,results ) => {
    results.forEach(( results ) => {
      if (results.description == null){
        results.description =  'Success'
      }
      else if (results.description != null){
        results.description =  'Unsuccesful'
      }
      results.sessionDate = moment(results.sessionDate).format("MMM DD, YYYY")
      results.sessionTime = moment(results.sessionTime, 'hh:mm a').format("hh:mm A")
      results.branch = moment(results.sessionTime, 'hh:mm a').add(1,'h').format("hh:mm A")
    })
    req.qSession = results
    return next()
  })
}

// REPORTS

function totalPayment (req, res, next) {
  const query = `SELECT * from tblpayment join tbluser on tblpayment.userid = tbluser.userid inner join
  tblbranch on tblpayment.branchid=tblbranch.branchID where tblpayment.paymentdate is not NULL and tblpayment.amount is not null
  and tblpayment.amount is not null`
  db.query(query, ( err, results, fields ) => {
      if (err) console.log(err)
      req.total = results
      //moments dateadded
      for (var i = 0; i < req.total.length; i++) {
        req.total[i].paymentdate = moment(results[i].paymentdate).format("LL");
      }
      return next()
  })
}

//insert OR
router.post('/OR', (req, res) => {
  fullname= req.session.user.userfname + " " + req.session.user.userlname
  db.query(`INSERT INTO tblor 
    ( ornum,dateadded,addedby) 
    VALUES ( ?, CURDATE(), ?)`, [req.body.OR, fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/ORs');
    }
  });
})

//view OR
function viewOR(req, res, next) {
  db.query(`select * from tblor`, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewOR = results;
       //moments dateadded
      for (var i = 0; i < req.viewOR.length; i++) {
        req.viewOR[i].dateadded = moment(results[i].dateadded).format("LL");
      }
    return next();
  })
}

//edit OR
router.post('/OR/edit', (req, res) => {
  db.query(`UPDATE tblor SET ornum = ? where orid=?`, [req.body.OR, req.body.edit], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/ORs');
    }
  });
})

 //view to aSSIGN
 function viewCard(req, res, next) {
  db.query(`select u.* , r.*, ct.*, cl.* ,m.*,b.* from tbluser u join tblmembership m ON m.usersid=u.userid 
inner join tblmemrates r ON r.memrateid=m.membershiprateid 
inner join tblmemclass cl on r.memclass=cl.memclassid
 inner join tblcat ct on ct.membershipID=r.memcat inner join tblbranch b 
 on b.branchID=u.branch `, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewCard = results;
    return next();
  })
}

//edit Card
router.post('/card', (req, res) => {
  db.query(`UPDATE tblmembership SET cardnum= ? where memberid=?`, [req.body.cardnum, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/card');
    }
  });
})

//A-TEAM FITNESS FUNCTIONS

// GENERAL
function reports(req, res) {
  res.render('admin/general/views/reports', {
    utils: req.utils,
    admin: req.admin,
  });
}

function userd(req, res) {
  res.render('admin/general/views/user', {
    utils: req.utils,
    admin: req.admin,
  });
}

function dashboard(req, res) {
  res.render('admin/general/views/dashboard', {
    utils: req.utils,
    admin: req.admin,
    session: req.session,
    memberships: req.viewHie,
    classes: req.viewClass2,
    activeMembersCount: req.countActiveMembers,
    countActiveTrainers: req.countActiveTrainers,
    topUser: req.topUser
  });
}

function utils(req, res) {
  res.render('admin/general/views/utils', {
    utils: req.utils,
    admin: req.admin,
    rates: req.rates
  });
}

// MAINTENANCE
function branch(req, res) {
  res.render('admin/maintenance/views/m-branch', {
    utils: req.utils,
    admin: req.admin,
    branches: req.viewBranch,
  });
}

function ORs(req, res) {
  res.render('admin/maintenance/views/m-ORs',{
    utils: req.utils,
    admin: req.admin,
    ors: req.viewOR
  })
}

function category(req, res) {
  res.render('admin/maintenance/views/m-category', {
    utils: req.utils,
    admin: req.admin,
    cats: req.viewCategory
  });
}

function classes(req, res) {
  res.render('admin/maintenance/views/m-classes', {
    utils: req.utils,
    admin: req.admin,
    classes: req.viewClass
  });
}

function discount(req, res) {
  res.render('admin/maintenance/views/m-discount', {
    utils: req.utils,
    admin: req.admin,
    discounts: req.viewDiscount
  });
}

function membership(req, res) {
  res.render('admin/maintenance/views/m-membership', {
    utils: req.utils,
    admin: req.admin,
    drops: req.viewcatdrop,
    mems: req.viewMembership,
    classes: req.viewclassdrop
  });
}

function specs(req, res) {
  res.render('admin/maintenance/views/m-specialization', {
    utils: req.utils,
    admin: req.admin,
    specials: req.viewSpecial
  });
}

function staff(req, res) {
  res.render('admin/maintenance/views/m-staff', {
    utils: req.utils,
    admin: req.admin,
    staffs: req.viewStaff,
    bra: req.viewBranches
  });
}

function trains(req, res) {
  res.render('admin/maintenance/views/m-trainer', {
    utils: req.utils,
    admin: req.admin,
    drops: req.viewbranchdrop,
    spes: req.viewspecialdrop,
    trains: req.viewTrainer
  });
}

function memclass(req, res) {
  res.render('admin/maintenance/views/m-mclasses', {
    utils: req.utils,
    admin: req.admin,
    Hays: req.viewHie
  });
}

// TRANSACTIONS

function t_event(req, res) {
  res.render('admin/transactions/views/t-event', {
    utils: req.utils,
    admin: req.admin,
  });
}

function freezed(req, res) {
  res.render('admin/transactions/views/t-freezed', {
    utils: req.utils,
    admin: req.admin,
    fres: req.viewFre
  });
}

function income(req, res) {
  res.render('admin/transactions/views/t-income',{
    utils: req.utils,
    admin: req.admin,

  });
}

function payment(req, res) {
  res.render('admin/transactions/views/t-payment', {
    utils: req.utils,
    admin: req.admin,
    pays: req.viewPay,
    history: req.viewHis
  });
}

function pending(req, res) {
  res.render('admin/transactions/views/t-pending', {
    utils: req.utils,
    admin: req.admin,
    pends: req.viewPend
  });
}

function personal(req, res) {
  res.render('admin/transactions/views/t-personal',{
    utils: req.utils,
    admin: req.admin,
    pers: req.viewPer
  });
}

function regular(req, res) {
  res.render('admin/transactions/views/t-regular', {
    utils: req.utils,
    admin: req.admin,
    regs: req.viewReg,
    ass: req.viewAss,
    Exc: req.viewExc,
    ExcB: req.viewExcB,
    Spes: req.viewSp,
    change: req.MemChange,
    gene: req.MemChangeOr
  });
}

function Interregular(req, res) {
  res.render('admin/transactions/views/t-interregular', {
    utils: req.utils,
    admin: req.admin,
    intb: req.viewInt,
    ass: req.viewAss,
    Excc: req.viewExcc,
    ExcB: req.viewExcB,
    Spes: req.viewSp,
    change: req.MemChange,
    gene: req.MemChangeOr
  });
}

function Events(req, res) {
  res.render('admin/transactions/views/t-event',{
    utils: req.utils,
    admin: req.admin,
    eves: req.viewEve
  });
}

function walkins(req, res) {
  res.render('admin/transactions/views/t-walkins',{
    utils: req.utils,
    admin: req.admin,
    walk:req.viewWal
  });
}

function trainSessions(req, res) {
  res.render('admin/transactions/views/t-training-sessions',{
    utils: req.utils,
    admin: req.admin,
    sessions: req.sessionsToday
  });
}

function GClasses(req, res) {
  res.render('admin/transactions/views/t-classes',{
    utils: req.utils,
    admin: req.admin,
    clazz : req.viewClass2,
    classes: req.viewGcl,
    train: req.viewGt
  })
}

function pendingPtChange(req, res) {
  res.render('admin/transactions/views/t-pt-change',{
    utils: req.utils,
    admin: req.admin,
    pends :req.pendingChange
  })
}

function paymentSession(req, res) {
  res.render('admin/transactions/views/t-payment-session',{
    utils: req.utils,
    admin: req.admin,
    paid :req.paymentSession
  })
}

function receipt(req, res) {
  res.render('admin/transactions/views/t-reciepts',{
    utils: req.utils,
    admin: req.admin,
    paid :req.paymentSession,
    rec :req.viewReceipt
  })
}

function card(req, res) {
  res.render('admin/transactions/views/t-cardassign',{
    utils: req.utils,
    admin: req.admin,
    car: req.viewCard
  })
}


router.post('/', (req, res) => {
  db.query(`SELECT a.memberid, DATE_FORMAT(expirydate,'%M %e, %Y (%W)') AS expiryDate, b.userfname, b.userlname, c.memclassname, d.membershipname, e.memrateid 
  FROM tblmembership a 
  INNER JOIN tbluser b ON a.usersid = b.userid  
  INNER JOIN tblmemrates e ON e.memrateid=a.membershiprateid 
  INNER JOIN tblmemclass c ON e.memclass=c.memclassid 
  INNER JOIN tblcat d ON d.membershipID=e.memcat WHERE DATE(NOW()) < DATE(expirydate) AND a.cardnum=?;`, [req.body.cardNumber], function(err, results, fields){
    console.log('Card Value is: ' + req.body.cardNumber);
    if(err) throw(err)
    else{
      if(results==0){
        res.send('noCard');
      }
      else{
        res.send(results);
      }
    }
  })
})


//QUERIES
function qClasses(req, res) {
  res.render('admin/queries/views/class',{
    utils: req.utils,
    admin: req.admin,
    qClass: req.qClass
  })
}
function qEvents(req, res) {
  res.render('admin/queries/views/event',{
    utils: req.utils,
    admin: req.admin,
    qEvent: req.qEvent
  })
}
function qMembers(req, res) {
  res.render('admin/queries/views/member',{
    utils: req.utils,
    admin: req.admin,
    quser : req.quser
  })
}
function qMembership(req, res) {
  res.render('admin/queries/views/membership',{
    utils: req.utils,
    admin: req.admin,
    qmembership : req.qmembership
  })
}
function qSessions(req, res) {
  res.render('admin/queries/views/session',{
    utils: req.utils,
    admin: req.admin,
    qSession : req.qSession
  })
}
function qStaffs(req, res) {
  res.render('admin/queries/views/staff',{
    utils: req.utils,
    admin: req.admin,
    qStaff: req.qStaff
  })
}
function qTrainers(req, res) {
  res.render('admin/queries/views/trainer',{
    utils: req.utils,
    admin: req.admin,
    qTrainer : req.qTrainer
  })
}
function qWalkins(req, res) {
  res.render('admin/queries/views/walkin',{
    utils: req.utils,
    admin: req.admin,
    qwalkin: req.qwalkin
  })
}


//- REPORTS
function rsales(req, res) {
  res.render('admin/reports/views/sales',{
    utils: req.utils,
    admin: req.admin,
    qClass:req.total
  })
}


//A-TEAM FITNESS GETS

//GENERAL
router.get('/', viewSusp, viewUtils, viewAdmin, viewHie, viewClass2, countActiveMembers, countActiveTrainers, viewTopUser, dashboard);
router.get('/reports', viewUtils, viewAdmin, reports);
router.get('/user', viewUtils, viewAdmin, userd);
router.get('/utilities', viewUtils, viewAdmin, viewRates, utils);

//MAINTENANCE
router.get('/branch', viewUtils, viewAdmin, Exppro, viewBranch, branch);
router.get('/category', viewUtils, viewAdmin, Exppro, viewCategory, category);
router.get('/classes', viewUtils, viewAdmin, Exppro, viewClass, classes);
router.get('/discount', viewUtils, viewAdmin, Exppro, viewDiscount, discount);
router.get('/membership', viewUtils, viewAdmin, Exppro, viewclassdrop, viewMembership, viewcatdrop, membership);
router.get('/specialization', viewUtils, viewAdmin, Exppro, viewSpecial, specs);
router.get('/staff',viewUtils, viewAdmin, Exppro, viewBranches, viewStaff, staff);
router.get('/trains', viewUtils, viewAdmin, Exppro, viewTrainer, viewspecialdrop, viewbranchdrop, trains);
router.get('/memclass', viewUtils, viewAdmin, Exppro, viewHie, memclass);
router.get('/ORs',viewUtils, viewAdmin, Exppro, viewOR,ORs);

//TRANSACTIONS
router.get('/t-event', viewUtils, viewAdmin, t_event);
router.get('/freezed', viewUtils, viewAdmin, viewFre, freezed);
router.get('/income', viewUtils, viewAdmin,  income);
router.get('/payment', viewUtils, viewAdmin, viewPay, payment);
router.get('/pending', viewUtils, viewAdmin, check,viewUpdate, viewPend, pending);
router.get('/personal', viewUtils, viewAdmin, viewPer,personal);
router.get('/regular', viewUtils, viewAdmin, viewSusp,viewMemChangeOr,viewMemChange,regid,Nulling,viewSp,viewExcB,viewExc,viewAss, viewReg, regular);
router.get('/interregular', viewUtils, viewAdmin, viewSusp,viewMemChangeOr,viewMemChange,Nulling,viewSp,viewExcB,viewExcc,viewAss,viewInt, Interregular);
router.get('/events', viewUtils, viewAdmin, viewEve, Events);
router.get('/walkins', viewUtils, viewAdmin, viewWal, walkins);
router.get('/trainsessions', viewUtils, viewAdmin, sessionsToday, trainSessions);
router.get('/t/classes', viewUtils, viewAdmin, viewClass2,viewGt,viewGcl, GClasses);
router.get('/pending/pt', viewUtils, viewAdmin, viewPendingChange, pendingPtChange);
router.get('/payment/session', viewUtils, viewAdmin, viewPaymentSession, paymentSession);
router.get('/receipt', viewUtils, viewAdmin, viewReceipt,receipt);
router.get('/card', viewUtils, viewAdmin, viewCard,card);

//QUERIES
router.get('/queries/classes', viewUtils, viewAdmin, qClass, qClasses);
router.get('/queries/events', viewUtils, viewAdmin, qEvent, qEvents);
router.get('/queries/members', viewUtils, viewAdmin, quser, qMembers);
router.get('/queries/membership', viewUtils, viewAdmin, qmembership, qMembership);
router.get('/queries/PTsessions', viewUtils, viewAdmin, qSession, qSessions);
router.get('/queries/staffs', viewUtils, viewAdmin, qStaff,qStaffs);
router.get('/queries/trainers',viewUtils, viewAdmin, qTrainer, qTrainers);
router.get('/queries/walkins', viewUtils, viewAdmin, qwalkin, qWalkins);


// REPORTS
router.get('/reports/sales', viewUtils, viewAdmin, totalPayment, rsales);

/**
 * Here we just export said router on the 'index' property of this module.
 */
exports.index = router;