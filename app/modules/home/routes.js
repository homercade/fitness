var express = require('express');
var db = require('../../lib/database')();
var router = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var moment = require('moment');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var multer = require('multer');
const path = require('path');

router.use(authMiddleware.hasAuth);

var indexController = require('./controllers/index');
router.get('/', indexController);

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

//- FILE UPLOAD - MULTER
var storage = multer.diskStorage({
  destination: function( req, file, cb ){
    cb(null, './public/upload')
  },
  filename: function ( req, file, cb ){
    cb(null, 'user'+'-'+Date.now()+path.extname(file.originalname))
  }
})

var upload = multer({ storage:storage })

//insert staff

router.post('/staff', (req, res) => {
  fullname= req.session.user.userfname + " " + req.session.user.userlname
  db.query("INSERT INTO tbluser ( userfname, userlname, usermobile, useremail, usertype,statusfront,userpassword,userusername,Dateadded,addedby) VALUES ( ?, ?, ?, ?, 4,'Inactive',?, ?, CURDATE(), ?)", [req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.pass, req.body.username,fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff'); 
    }
  });
});

//edit staff

router.post('/staff/edit', (req, res) => {
  db.query("UPDATE tbluser SET userfname=?, userlname=?, usermobile=?, useremail=?, userpassword=?, userusername=? WHERE userid=?", [req.body.sfirstName, req.body.slastName, req.body.smobNum, req.body.semail, req.body.pass, req.body.username, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
    }
  });
});

//delete staff

router.post('/staff/delete', (req, res) => {
  db.query("DELETE FROM tbluser WHERE statusfront='Inactive' and userid=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
    }
  });

});


//view Staff
function viewStaff(req, res, next) {
  db.query('SELECT * FROM tbluser WHERE usertype = 4', function (err, results, fields) {
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
  db.query('SELECT * FROM tblbranch where user is NULL', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewBranches = results;
    return next();
  })
}

//assign staff

router.post('/staff/assign', (req, res) => {
  db.query('Select * from tbluser where userid=?',[req.body.id],(err,results,fields)=>{
  if (req.body.branchid!=0 && results[0].branch!=undefined ){
  db.query("UPDATE tblbranch SET user=NULL where branchID=?",[results[0].branch],(err,results,fields)=>{
    db.query("UPDATE tbluser SET branch=NULL where userid=?",[req.body.id],(err,results,fields)=>{
      db.query("UPDATE tbluser SET branch=? ,statusfront='Active' where userid=?", [req.body.branchid, req.body.id], (err, results, fields) => {
        db.query("UPDATE tblbranch SET user=? where branchID=?", [req.body.manager, req.body.branchid], (err, results, fields) => {
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
  db.query("UPDATE tbluser SET branch=? ,statusfront='Active' where userid=?", [req.body.branchid, req.body.id], (err, results, fields) => {
    db.query("UPDATE tblbranch SET user=? where branchID=?", [req.body.manager, req.body.branchid], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/staff');
          }
    });
  });
  }
  else{
  db.query("UPDATE tblbranch SET user=NULL where branchID=?", [results[0].branch], (err, results, fields) => {
     db.query("UPDATE tbluser SET statusfront='Inactive',branch=NULL where userid=?", [req.body.id], (err, results, fields) => {
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
  db.query("INSERT INTO tblclass ( classname, classdesc,status,Dateadded,addedby) VALUES ( ?, ?, 1, CURDATE(), ?)", [req.body.classname, req.body.classdesc, fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//edit classes

router.post('/classes/edit', (req, res) => {
  db.query("UPDATE tblclass SET classname=?, classdesc=? WHERE classID=?", [req.body.classname, req.body.classdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//delete class

router.post('/classes/delete', (req, res) => {
  db.query("UPDATE tblclass SET status=2 WHERE classid=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/classes');
    }
  });
});

//view classes

function viewClass(req, res, next) {
  db.query('SELECT * FROM tblclass WHERE status=1', function (err, results, fields) {
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
  db.query("INSERT INTO tblspecial ( specialname, specialdesc,status) VALUES ( ?, ?,1)", [req.body.specialname, req.body.specialdesc], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//edit special

router.post('/specs/edit', (req, res) => {

  db.query("UPDATE tblspecial SET specialname=?, specialdesc=? WHERE specialID=?", [req.body.specialname, req.body.specialdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//delete special

router.post('/specs/delete', (req, res) => {

  db.query("UPDATE tblspecial SET status=2 WHERE specialID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/specialization');
    }
  });
});

//view special
function viewSpecial(req, res, next) {
  db.query('SELECT * FROM tblspecial WHERE status=1', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewSpecial = results;
    return next();
  })
}

//insert discount

router.post('/discount', (req, res) => {
  fullname= req.session.user.userfname + " " + req.session.user.userlname    
  db.query("INSERT INTO tblpromo (promoname,startdate,enddate,discount,status,statusback,Dateadded,Addedby,description,promotype) VALUES ( ?, ?, ?, ?, ?, 1, CURDATE(), ?, ?, ?)", [req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status, fullname, req.body.desc, req.body.type], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  });
});

//edit discount

router.post('/discount/edit', (req, res) => {

  db.query("UPDATE tblpromo SET promoname=?, startdate=?, enddate=?, discount=?, status=? WHERE promoID=?", [req.body.promoname, req.body.startdate, req.body.enddate, req.body.discount, req.body.status, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  }); 
});

//delete discount

router.post('/discount/delete', (req, res) => {

  db.query("UPDATE tblpromo SET statusback=2 WHERE promoID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/discount');
    }
  });
});

//view discount
function viewDiscount(req, res, next) {
  db.query('SELECT * FROM tblpromo WHERE statusback=1', function (err, results, fields) {
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
  db.query('SELECT (branchID+1)id FROM tblbranch ORDER BY branchID DESC LIMIT 1', function (err, results, fields) {
    if (err) return res.send(err)
    req.newid = results[0].id
    console.log('puta')
    console.log(req.newid)
    return next();
  })
}

//insert branch

router.post('/branch', addid, (req, res) => {
  fullname=req.session.user.userfname + " " + req.session.user.userlname
  db.query("INSERT INTO tblbranch ( branchname,branchstreetname,branchcity,Dateadded,addedby) VALUES (?, ?, ?, CURDATE(),?)", [req.body.branchname,req.body.street, req.body.city,fullname], (err, results, fields) => {
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


// //view staff dropdowns
// function viewStaffDropdown(req, res, next) {
//   db.query('SELECT * FROM tbluser WHERE usertype=4 AND statusfront="Inactive"', function (err, results, fields) {
//     if (err) return res.send(err);
//     req.viewStaffDropdown = results;
//     return next();
//   })
// }


//view branch
function viewBranch(req, res, next) {
  db.query('SELECT * from tblbranch  ', function (err, results, fields) {
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
  db.query("INSERT INTO tblcat ( membershipname,membershipdesc, status, Dateadded, addedby) VALUES (?, ?,1, CURDATE(),?)", [req.body.catname, req.body.catdesc,fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

/*edit membership*/

router.post('/category/edit', (req, res) => {

  db.query("UPDATE tblcat SET membershipname=?,membershipdesc=? WHERE membershipID=?", [req.body.catname, req.body.catdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

//delete category

router.post('/category/delete', (req, res) => {

  db.query("UPDATE tblcat SET status=2 WHERE membershipID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/category');
    }
  });
});

//view category
function viewCategory(req, res, next) {
  db.query('SELECT * FROM tblcat WHERE status=1', function (err, results, fields) {
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

router.post('/trains', (req, res) => {
  if (req.body.Ttype=='Freelance'){
  db.query("INSERT INTO tbltrainer ( trainerfname, trainerlname, trainerbday,trainergender,traineraddress,trainermobile,traineremail,trainerschedule,trainerbranch,trainerspecialization,trainerpassword,trainerusername,type,trainertimestart,trainertimeend) VALUES ( ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.sched.toString(), req.body.branchid, req.body.specialid, req.body.password, req.body.username, req.body.Ttype, req.body.starttime, req.body.endtime], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trains');
    }
  });
  }else{
  db.query("INSERT INTO tbltrainer ( trainerfname, trainerlname, trainerbday,trainergender,traineraddress,trainermobile,traineremail,trainerschedule,trainerbranch,trainerspecialization,trainerpassword,trainerusername,type) VALUES ( ?, ?, ?, ?, ?, ? ,?, 'Monday,Tuesday,Wednesday,Thursday,Friday', ?, ?, ?, ?, ?)", [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.branchid, req.body.specialid, req.body.password, req.body.username, req.body.Ttype], (err, results, fields) => {
    if (err)
      console.log(err);
    else 
      res.redirect('/trains');
  });
  }
});

//view branch dropdowns
function viewbranchdrop(req, res, next) {
  db.query('SELECT * FROM tblbranch ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewbranchdrop = results;
    return next();
  })
}

//view specialization dropdowns
function viewspecialdrop(req, res, next) {
  db.query('SELECT * FROM tblspecial WHERE status=1 ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewspecialdrop = results;
    return next();
  })
}

//edit trainer

router.post('/trains/edit', (req, res) => {
  db.query("UPDATE tbltrainer SET trainerfname=?, trainerlname=?,trainerbday=?,trainergender=?,traineraddress=?,trainermobile=?,traineremail=?,trainerbranch=?,trainerspecialization=?,trainerpassword=?,trainerusername=? WHERE trainerid=?", [req.body.fname, req.body.lname, req.body.bday, req.body.gen, req.body.addr, req.body.mobile, req.body.email, req.body.branchid, req.body.specialid, req.body.pass, req.body.username, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/trains');
    }
  });
});

//delete trainer

router.post('/trains/delete', (req, res) => {
  db.query("DELETE FROM tbltrainer WHERE trainerid=?", [req.body.id], (err, results, fields) => {
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
      //moments time
      for (var i = 0; i < req.viewTrainer.length; i++) {
        req.viewTrainer[i].trainertimestart = moment(results[i].trainertimestart,'HH:mm:ss').format("hh:ss A");
      }
       //moments time
      for (var i = 0; i < req.viewTrainer.length; i++) {
        req.viewTrainer[i].trainertimeend = moment(results[i].trainertimeend,'HH:mm:ss').format("hh:ss A"); 
      }
    return next();
  })
}

//insert facility

router.post('/facility', (req, res) => {
  db.query("INSERT INTO tblfacilities ( facilitiesname, fee, period, UOM) VALUES ( ?, ?, ?, ?)", [req.body.facname, req.body.price, req.body.dura, req.body.uom], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/facility');
    }
  });
});

//edit facility

router.post('/facility/edit', (req, res) => {
  db.query("UPDATE tblfacilities SET facilitiesname=?, fee=?, period=?, UOM=? WHERE facilitiesID=?", [req.body.facname, req.body.price, req.body.dura, req.body.uom, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/facility');
    }
  });
});

//delete facility

router.post('/facility/delete', (req, res) => {
  db.query("DELETE FROM tblfacilities WHERE facilitiesID=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/facility');
    }
  });
});

//view facilities
function viewFac(req, res, next) {
  db.query('SELECT * FROM tblfacilities', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewFac = results;
    return next();
  })
}

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

  db.query("INSERT INTO tblmemrates ( memclass, memfee, memperiod, memcat) VALUES ( ?, ?, ?, ?)", [req.body.class, req.body.memfee, req.body.memdura, req.body.category], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});

//view category dropdowns
function viewcatdrop(req, res, next) {
  db.query('SELECT * FROM tblcat WHERE status=1 ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewcatdrop = results;
    return next();
  })
}

//view class dropdowns
function viewclassdrop(req, res, next) {
  db.query('SELECT * FROM tblmemclass WHERE status=1 ', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewclassdrop = results;
    return next();
  })
}

//edit membership

router.post('/membership/edit', (req, res) => {

  db.query("UPDATE tblmemrates SET  memclass=?, memfee=?, memperiod=?, memcat=? WHERE memrateid=?", [req.body.class, req.body.memfee, req.body.memdura, req.body.category, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});

//delete membership

router.post('/membership/delete', (req, res) => {

  db.query("DELETE FROM tblmemrates WHERE memrateid=? ", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/membership');
    }
  });
});



//view membership
function viewMembership(req, res, next) {
  db.query('SELECT u.*, b.*, s.* from tblmemrates u inner join tblcat b ON u.memcat = b.membershipID JOIN tblmemclass s ON s.memclassid=u.memclass where b.status=1', function (err, results, fields) {
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
  db.query("INSERT INTO tblmemclass ( memclassname,memclassdesc, status, Dateadded, addedby) VALUES (?, ?,1, CURDATE(),?)", [req.body.classname, req.body.classdesc,fullname], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

/*edit membership class*/

router.post('/memclass/edit', (req, res) => {
  db.query("UPDATE tblmemclass SET memclassname=?,memclassdesc=? WHERE memclassid=?", [req.body.classname, req.body.classdesc, req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

//delete memebrship class

router.post('/memclass/delete', (req, res) => {
  db.query("UPDATE tblmemclass SET status=2 WHERE memclassid=?", [req.body.id], (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      res.redirect('/memclass');
    }
  });
});

//view membership classes
function viewHie(req, res, next) {
  db.query('SELECT * FROM tblmemclass WHERE status=1', function (err, results, fields) {
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
    m.* from tbluser u join tblmembership m 
    ON m.usersid=u.userid inner join 
    tblmemrates r ON m.membershiprateid=r.memrateid inner join 
    tblmemclass cl ON r.memclass= cl.memclassid 
    Inner join tblcat ct on r.memcat = ct.membershipID where m.status = "Pending" `, function (err, results, fields) {
    if (err) return res.send(err);
    req.viewPend = results;
    return next(); 
  })
}

//view update interbranch
function viewUpdate(req, res, next) {
  db.query("UPDATE tbluser u join tblmembership m ON m.usersid=u.userid inner join tblmemrates r ON m.membershiprateid=r.memrateid inner join tblmemclass cl ON r.memclass= cl.memclassid Inner join tblcat ct on r.memcat = ct.membershipID SET u.branch=NULL where m.status = 'Pending' and ct.membershipname='Interbranch'  ", (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      return next()
    };
  })
};

//function useraddid
function useraddid(req, res, next) {
  db.query('SELECT (userid+1)id FROM tbluser ORDER BY userid DESC LIMIT 1 ', function (err, results, fields) {
    if (err) return res.send(err)
    req.newuserid = results[0].id
    console.log('puta')
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
    db.query("UPDATE tblmembership SET status='Paid', acceptdate=CURDATE() Where usersid=?", [req.body.id], (err, results, fields) => {
      db.query("UPDATE tbluser u join tblmembership m ON m.usersid=u.userid inner join tblmemrates r ON m.membershiprateid=r.memrateid inner join tblmemclass cl ON r.memclass= cl.memclassid Inner join tblcat ct on r.memcat = ct.membershipID  SET m.expirydate = case when cl.memclassid = r.memclass then curdate() + interval r.memperiod MONTH END, userpassword=12345 where usersid=?", [req.body.id], (err, results, fields) => {
        db.query("UPDATE tblmembership m join tblpayment p on m.usersid = p.userid inner join tblmemrates r on m.membershiprateid = r.memrateid SET p.amount=r.memfee - (r.memfee * ?), p.paymentdate=CURDATE(), p.classification='4' Where p.userid= ? ", [a,req.body.id], (err, results, fields) => {  
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
    db.query("UPDATE tblmembership SET status='Paid', acceptdate=CURDATE() Where usersid=?", [req.body.id], (err, results, fields) => {
      db.query("UPDATE tbluser u join tblmembership m ON m.usersid=u.userid inner join tblmemrates r ON m.membershiprateid=r.memrateid inner join tblmemclass cl ON r.memclass= cl.memclassid Inner join tblcat ct on r.memcat = ct.membershipID  SET m.expirydate = case when cl.memclassid = r.memclass then curdate() + interval r.memperiod MONTH END, userpassword=12345 where usersid=?", [req.body.id], (err, results, fields) => {
        db.query("UPDATE tblmembership m join tblpayment p on m.usersid = p.userid inner join tblmemrates r on m.membershiprateid = r.memrateid SET p.amount=r.memfee, p.paymentdate=CURDATE(), p.classification='1' Where p.userid= ? ", [req.body.id], (err, results, fields) => {  
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
  db.query("select u.* , r.*, ct.*, cl.* ,m.* from tbluser u join tblmembership m ON m.usersid=u.userid inner join tblmemrates r ON r.memrateid=m.membershiprateid inner join tblmemclass cl on r.memclass=cl.memclassid inner join tblcat ct on ct.membershipID=r.memcat where m.status='Paid' and u.branch is NULL", function (err, results, fields) {
    if (err) return res.send(err);
    req.viewInt = results;
    //moments expiration
    for (var i = 0; i < req.viewInt.length; i++) {
      req.viewInt[i].expirydate = moment(results[i].expirydate).format("LL");}
    return next();
  })

}

//view update regular to suspended
function viewSusp(req, res, next) {
  db.query("UPDATE tblmembership m join tbluser u on m.usersid=u.userid SET m.status='Suspended', u.userpassword=NULL where m.expirydate= CURDATE()", (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      return next()
    };
  })
};

//view to payment
function viewPay(req, res, next) {
  db.query('select u.* , r.*, ct.*, cl.* ,m.* from tbluser u join tblmembership m ON m.usersid=u.userid inner join tblmemrates r ON r.memrateid=m.membershiprateid inner join tblmemclass cl on r.memclass=cl.memclassid inner join tblcat ct on ct.membershipID=r.memcat where m.status="Paid" ', function (err, results, fields) {
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
router.post('/payment',(req, res) => {
    db.query("INSERT INTO tblpayment (userid)VALUES(?)", [req.body.id], (err, results, fields) => {
      db.query("UPDATE tbluser u join tblpayment p on p.userid=u.userid inner join tblmembership m on m.usersid=u.userid inner join tblmemrates r on r.memrateid=m.membershiprateid SET p.paymentdate=CURDATE() ,amount=r.memfee , classification =1 where p.paymentdate is null and p.userid= ?", [req.body.id], (err, results, fields) => {
        db.query("UPDATE tbluser u join tblmembership m ON m.usersid=u.userid inner join tblmemrates r ON m.membershiprateid=r.memrateid inner join tblmemclass cl ON r.memclass= cl.memclassid Inner join tblcat ct on r.memcat = ct.membershipID  SET m.expirydate = case when cl.memclassid = r.memclass then m.expirydate + interval r.memperiod MONTH END where u.userid=?", [req.body.id], (err, results, fields) => {
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


//freezing
router.post('/freeze',(req, res) => {
   db.query("INSERT INTO tblfreeze(userfid,freezedmonths,datefrozen,genid) values(?,?,?,4)", [req.body.id,req.body.freezevalue,req.body.effect], (err, results, fields) => {
      db.query("UPDATE tblfreeze f inner join tblgenera g ON f.genid=g.generalID inner join tbluser u ON u.userid=f.userfid set total = fee * freezedmonths Where minus is null and userid=?",[req.body.id], (err, results, fields) => {
        db.query("UPDATE tblfreeze SET freezeduntil=datefrozen + interval ? MONTH,status='Unpaid' Where minus is null and userfid=? ", [req.body.freezevalue,req.body.id], (err, results, fields) => {  
          db.query("INSERT INTO tblpayment(userid,classification)VALUES(?,2)",[req.body.id], (err, results, fields) => {   
            db.query("UPDATE tblfreeze f join tblpayment p on f.userfid=p.userid SET amount=total where paymentdate is null and f.userfid=?", [req.body.id], (err, results, fields) => {  
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
  db.query('select * from tblfreeze where datefrozen=CURDATE()', function (err, results, fields) {
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
  db.query("UPDATE tblfreeze SET status='Paid' where unfreezedate is NULL and userfid=?", [req.body.ids], (err, results, fields) => {
    db.query(`UPDATE tblfreeze f join tblpayment p on p.userid=f.userfid Set paymentdate=CURDATE()
where f.unfreezedate is null and classification = 2 and userfid=?`, [req.body.ids], (err, results, fields) => {
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
    inner join tblpayment p on p.userid=u.userid inner join tblmembership m on m.usersid=u.userid where u.userpassword is null and u.userid = ? and classification =2 SET minus=(DATEDIFF(freezeduntil,datefrozen)) + (DATEDIFF(CURDATE(),freezeduntil)) 
    where u.userpassword is null and u.userid = ?`, [req.body.id], (err, results, fields) => {
      db.query(`UPDATE tbluser u join tblfreeze f on f.userfid=u.userid 
        inner join tblpayment p on p.userid=u.userid 
        inner join tblmembership m on m.usersid=u.userid SET expirydate=expirydate + interval minus DAY where u.userpassword 
        is null and u.userid = ? and classification =2`, [req.body.id], (err, results, fields) => {
          db.query(`UPDATE tbluser u join tblfreeze f on f.userfid=u.userid 
            inner join tblpayment p on p.userid=u.userid inner join tblmembership m on 
            m.usersid=u.userid SET userpassword=12345,usertype=2 where u.userpassword is null 
            and u.userid = ? and classification =2`, [req.body.id], (err, results, fields) => {
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
  db.query('select * from tblclass', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewGcl = results;
    return next();
  })
}

//class trainerdrops
function viewGt(req, res, next) {
  db.query('select * from tbltrainer', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewGt = results;
    return next();
  })
}
//creating groupclass
router.post('/groupclass',(req, res) => {
  db.query(`INSERT INTO 
    tbleventclass(eventclassname,starttime,endtime,slot,type,descr,days)
    VALUES(?, ?, ?, ?, 1, ?, ?)`, 
    [req.body.event, req.body.startt, req.body.endt, req.body.slot, req.body.descr, 
    req.body.sched.toString()], (err, results, fields) => {
    if (err)
        console.log(err);
      else {
        res.redirect('/t/classes');
      }

    });
   })
//creating event
router.post('/event',(req, res) => {
  db.query("INSERT INTO tbleventclass(eventclassname,startdate,enddate,starttime,endtime,slot,type,descr)VALUES(?, ?, ?, ?, ?, ?, 2, ?)", [req.body.event, req.body.start, req.body.end, req.body.startt, req.body.endt, req.body.slot, req.body.desc], (err, results, fields) => {
    if (err)
        console.log(err);
      else {
        res.redirect('/events');
      }

    });
   })


//view of events
function viewEve(req, res, next) {
  db.query('select * from tbleventclass where type=2', function (err, results, fields) {
    if (err) return res.send(err);
    req.viewEve = results;
    //moments expiration
    // for (var i = 0; i < req.viewInt.length; i++) {
    //   req.viewInt[i].expiry = moment(results[i].expiry).format("LL");}
    return next();
  })
}

//view trainer assign
function viewAss(req, res, next){
  db.query('SELECT * from tbltrainer',function(err, results, fields){
    if(err) return res.send(err);
    req.viewAss = results;
    return next();
  })
}


//view trainer-client partners
function viewPer(req, res, next){
  db.query('select u.*, t.*, j.* from tbluser u join tbppt j on j.memid=u.userid inner join tbltrainer t on j.trainid=t.trainerid',function(err, results, fields){
    if(err) return res.send(err);
    req.viewPer = results;
    return next();
  })
}

//assigning trainers
router.post('/assign',(req, res) => {
  db.query("INSERT INTO tbppt(memid,trainid,status)VALUES(?, ?, 2)", [req.body.memberid, req.body.trainerid], (err, results, fields) => {
    if (err)
        console.log(err);
      else {
        res.redirect('/personal');
      }

    });
})

//function regularid
function regid(req, res, next) {
  db.query('SELECT max(userid)+1 id FROM tbluser ', function (err, results, fields) {
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
router.post('/walkin',regid,(req, res) => {
  db.query("INSERT INTO tbluser(userfname,userlname,usermobile)VALUES(?, ?, ?)", [req.body.fname, req.body.lname,req.body.mobile], (err, results, fields) => {
    db.query("INSERT INTO tblpayment(userid,classification,amount)VALUES(?, 3,50)", [req.regid], (err, results, fields) => {
      if (err)
          console.log(err);
        else {
          res.redirect('/walkins');
        }

    });
    });
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
router.post('/payment/session/pay', (req, res) => {
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
    db.query(`INSERT INTO tblpayment (userid, paymentdate, amount, classification) VALUES (?, CURDATE(), ?, 5)`, [ req.body.userid, req.body.amount ], ( err,out ) => {
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
// ACCEPT SCHEDULE
router.post('/session/confirm', (req, res) => {
  db.query(`UPDATE tblsession SET session_count = session_count - 1 where sessionID = ?`, [ req.body.sessionid ], (err, out) => {
    db.query(`UPDATE tbppt SET scheduleStatus = 0 where PTid = ?`, [ req.body.ptid ], (err, out) => {
    })
  })
})
// ACCEPT SCHEDULE
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




//A-TEAM FITNESS FUNCTIONS

// GENERAL
function reports(req, res) {
  res.render('admin/general/views/reports');
}

function userd(req, res) {
  res.render('admin/general/views/user');
}

function utils(req, res) {
  res.render('admin/general/views/utils');
}

// MAINTENANCE
function branch(req, res) {
  res.render('admin/maintenance/views/m-branch', {
    branches: req.viewBranch,
  });
}

function category(req, res) {
  res.render('admin/maintenance/views/m-category', {
    cats: req.viewCategory
  });
}

function classes(req, res) {
  res.render('admin/maintenance/views/m-classes', {
    classes: req.viewClass
  });
}

function discount(req, res) {
  res.render('admin/maintenance/views/m-discount', {
    discounts: req.viewDiscount
  });
}

function facility(req, res) {
  res.render('admin/maintenance/views/m-facility', {
    facs: req.viewFac
  });
}

/*function general(req, res) {
  res.render('admin/maintenance/views/m-general', {
    gens: req.viewGen
  });
}
*/
function membership(req, res) {
  res.render('admin/maintenance/views/m-membership', {
    drops: req.viewcatdrop,
    mems: req.viewMembership,
    classes: req.viewclassdrop
  });
}

function specs(req, res) {
  res.render('admin/maintenance/views/m-specialization', {
    specials: req.viewSpecial
  });
}

function staff(req, res) {
  res.render('admin/maintenance/views/m-staff', {
    staffs: req.viewStaff,
    bra: req.viewBranches
  });
}

function trains(req, res) {
  res.render('admin/maintenance/views/m-trainer', {
    drops: req.viewbranchdrop,
    spes: req.viewspecialdrop,
    trains: req.viewTrainer
  });
}

function memclass(req, res) {
  res.render('admin/maintenance/views/m-mclasses', {
    Hays: req.viewHie
  });
}

// TRANSACTIONS

function t_class(req, res) {
  res.render('admin/transactions/views/t-classes');
}

function t_event(req, res) {
  res.render('admin/transactions/views/t-event');
}

function freezed(req, res) {
  res.render('admin/transactions/views/t-freezed', {
    fres: req.viewFre
  });
}

function income(req, res) {
  res.render('admin/transactions/views/t-income');
}

function payment(req, res) {
  res.render('admin/transactions/views/t-payment', {
    pays: req.viewPay,
    history: req.viewHis
  });
}

function pending(req, res) {
  res.render('admin/transactions/views/t-pending', {
    pends: req.viewPend
  });
}

function personal(req, res) {
  res.render('admin/transactions/views/t-personal',{
    pers: req.viewPer
  });
}

function regular(req, res) {
  res.render('admin/transactions/views/t-regular', {
    regs: req.viewReg,
    ass: req.viewAss,
    Exc: req.viewExc,
    ExcB: req.viewExcB,
    Spes: req.viewSp,
    change: req.MemChange
  });
}

function Interregular(req, res) {
  res.render('admin/transactions/views/t-interregular', {
    intb: req.viewInt,
    ass: req.viewAss,
    Excc: req.viewExcc,
    ExcB: req.viewExcB,
    Spes: req.viewSp,
    change: req.MemChange
  });
}

function Events(req, res) {
  res.render('admin/transactions/views/t-event',{
    eves: req.viewEve
  });
}

function walkins(req, res) {
  res.render('admin/transactions/views/t-walkins',{
    walk:req.viewWal
  });
}

function trainSessions(req, res) {
  res.render('admin/transactions/views/t-training-sessions',{
    sessions: req.sessionsToday
  });
}

function GClasses(req, res) {
  res.render('admin/transactions/views/t-classes',{
    classes: req.viewGcl,
    train: req.viewGt
  })
}

function pendingPtChange(req, res) {
  res.render('admin/transactions/views/t-pt-change',{
    pends :req.pendingChange
  })
}

function paymentSession(req, res) {
  res.render('admin/transactions/views/t-payment-session',{
    paid :req.paymentSession
  })
}



//A-TEAM FITNESS GETS

//GENERAL
router.get('/reports', reports);
router.get('/user', userd);
router.get('/utilities', utils);

//MAINTENANCE
router.get('/branch', viewBranch, branch);
router.get('/category', viewCategory, category);
router.get('/classes', viewClass, classes);
router.get('/discount', viewDiscount, discount);
router.get('/facility', viewFac, facility);
/*router.get('/general', viewGen, general);*/
router.get('/membership', viewclassdrop, viewMembership, viewcatdrop, membership);
router.get('/specialization', viewSpecial, specs);
router.get('/staff',viewBranches, viewStaff, staff);
router.get('/trains', viewTrainer, viewspecialdrop, viewbranchdrop, trains);
router.get('/memclass', viewHie, memclass);

//TRANSACTIONS
router.get('/t-class', t_class);
router.get('/t-event', t_event);
router.get('/freezed',viewFre, freezed);
router.get('/income', income);
router.get('/payment', viewPay, payment);
router.get('/pending', check,viewUpdate, viewPend, pending);
router.get('/personal', viewPer,personal);
router.get('/regular',viewMemChange,regid,Nulling,viewSp,viewExcB,viewExc,viewAss, viewSusp, viewReg, regular);
router.get('/interregular',viewMemChange,Nulling,viewSp,viewExcB,viewExcc,viewAss, viewSusp,viewInt, Interregular);
router.get('/events',viewEve, Events);
router.get('/walkins',viewWal, walkins);
router.get('/trainsessions', sessionsToday, trainSessions);
router.get('/t/classes',viewGt,viewGcl, GClasses);
router.get('/pending/pt', viewPendingChange, pendingPtChange);
router.get('/payment/session', viewPaymentSession, paymentSession);
/**
 * Here we just export said router on the 'index' property of this module.
 */
exports.index = router;