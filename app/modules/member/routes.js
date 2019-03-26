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

router.post('/event/view', (req, res) => {
	var now = moment().format('MM/DD/YYYY')

	db.query('select * from tbleventclass', (err, out) => {
		for (i = 0; i < out.length; i++) {
			if (out[i].enddate != null) {
				if (out[i].enddate > now) {
					continue
				} else {
					db.query(`UPDATE tbleventclass SET status = 0 where eventclassid = ?`, [out[i].eventclassid], (err, out) => {})
				}
			}
		}

		db.query(`select * from tbleventclass where status is NULL`, (err, out) => {
			res.send(out)
		})
	})
})


function totalPayment(req, res, next) {
	const query = `SELECT * from tblpayment join tbluser on tblpayment.userid = tbluser.userid where tbluser.userid = ?`
	db.query(query, [req.session.member.userid], (err, results, fields) => {
		if (err) console.error(err)
		let total = 0
		for (i = 0; i < results.length; i++) {
			total += results[i].amount
		}
		req.total = total
		return next()
	})
}

function notification(req, res, next) {
	const query = `
	SELECT * FROM tblnotification 
	JOIN tblnotificationdesc on tblnotification.notifdescid = tblnotificationdesc.notifdescid 
    JOIN tbluser on tbluser.userid = tblnotification.memid
    WHERE tblnotification.forwhom = 'member'
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
  db.query('SELECT * FROM tblnotification WHERE forwhom = "member"', (err, results) =>{
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
	
router.post('/create-notification', (req, res) => {
	const dateTom = moment().add(1, 'day').format('MM/DD/YYYY')
	const SELECT_EVENTS_STARTING_TOM = `SELECT * FROM tbleventclass WHERE startdate = ?`
	const USERS_IN_THAT_EVENT = `SELECT intUCEUserID FROM tbluce WHERE intUCEClassID = ?`
	const CHECK_NOTIF = `SELECT * FROM tblnotification WHERE memid = ? AND eventid = ?`
	const INSERT_NOTIF = `INSERT INTO tblnotification (notifdescid, memid, eventid, notifstatus, notifdate, notiftime, forwhom) VALUES(?, ?, ?, ?, ?, ?, ?)`

	db.query(SELECT_EVENTS_STARTING_TOM, dateTom, (err, events) => {
		if(events.length > 0){
			for(let i = 0; i < events.length; i++){
				db.query(USERS_IN_THAT_EVENT, events[i].eventclassid, (err, users) => {
					if(users.length > 0){
						for(let j = 0; j < users.length; j++){
							db.query(CHECK_NOTIF, [users[j].intUCEUserID, events[i].eventclassid], (err, results) => {
								if(results.length == 0){
									db.query(INSERT_NOTIF, [6, users[j].intUCEUserID, events[i].eventclassid, 'unread', moment().format('YYYY-MM-DD'), moment(events[i].starttime, 'HH:mm:ss').format('hh:mm a'), 'member'], (err, inserted) => {
										if(err) console.error(err)
									})
								} else return res.send(true)
								if(err) console.error(err)
							})
						}
					} else return res.send(true)
					if(err) console.error(err)
				})
			}
		} else return res.send(true)
		if(err) console.error(err) 
	})
})

function getExpiryDate(req, res, next) {
	db.query('SELECT expirydate from tblmembership where usersid = ?', [req.session.member.userid], (err, results) => {
		console.log(results)
		req.getExpiryDate = results[0]
		const expiryDate = moment(results[0].expirydate).format('MM DD, YYYY')
		const today = moment().format('MM DD, YYYY')
		console.log(expiryDate, today)
		if (expiryDate == today){
			res.redirect('/login?incorrect')
		}
		return next()
	})	
}

//******************************************************* */
//                      PROFILE.
//******************************************************* */

function fee(req, res, next) {
	db.query('SELECT * from tblgenera where generalID = 5', (err, results) => {
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
		results.forEach((results) => {
			results.acceptdate = moment(results.acceptdate).format("LL");
			results.userbday = moment(results.userbday).format("MMM DD, YYYY");
		})
		results.forEach((results) => {
			results.expirydate = moment(results.expirydate).format("MMM DD, YYYY");
			results.acceptdate = moment(results.acceptdate).format("MMM DD, YYYY");
			results.paymentdate = moment(results.paymentdate).format("MMM DD, YYYY");
		})

		if (results.length == 0) {
			db.query(`
				select * from tbluser 
				join tblmembership on tblmembership.usersid = tbluser.userid
				join tblmemrates on tblmemrates.memrateid = tblmembership.membershiprateid
				join tblcat on tblcat.membershipID = tblmemrates.memcat
				join tblmemclass on tblmemclass.memclassid = tblmemrates.memclass 
				join tblpayment on tblpayment.userid = tbluser.userid
				where usertype= 2 and tbluser.userid = ?
				group by tbluser.userid
				`, [req.session.member.userid], (err, results, fields) => {
				if (err) return res.send(err)
				results.forEach((results) => {
					results.signdate = moment(results.signdate).format("LL");
					results.userbday = moment(results.userbday).format("MMM DD, YYYY");
				})
				results.forEach((results) => {
					results.expirydate = moment(results.expirydate).format("MMM DD, YYYY");
					results.acceptdate = moment(results.acceptdate).format("MMM DD, YYYY");
					results.paymentdate = moment(results.paymentdate).format("MMM DD, YYYY");
				})
				req.initial = results;
				return next()
			})
		} else {
			req.initial = results;
			return next()
		}
	})
}

router.post('/profile/edit', (req, res) => {
	const query = `UPDATE tbluser SET useraddress = ?, usermobile = ?, useremail = ?, userusername = ?, userpassword = ? where userid = ?`
	db.query(query, [
		req.body.address,
		req.body.contact,
		req.body.email,
		req.body.username,
		req.body.password,
		req.session.member.userid
	], (err, out) => {
		if (err) console.error(err)
	})
}) 

router.post('/pic/edit', (req, res) => {
  pic=`${req.session.member.userfname + req.session.member.userlname}.jpg`
  req.files.img.mv('public/assets/images/'+pic, function(err){
		db.query(`UPDATE tbluser SET pic = ? WHERE userid = ?`, [pic, req.session.member.userid], (err, results) => {
			if (err) console.log(err);
			res.redirect('/member')
		})
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

		results.forEach((results) => {
			results.starttime = moment(results.starttime, 'HH:mm:ss').format('hh:mm A')
			results.endtime = moment(results.endtime, 'HH:mm:ss').format('hh:mm A')
		})
		req.viewClass = results;
		return next();
	})
}

function joinedClasses(req, res, next) {
	const query = `SELECT * FROM tbleventclass 
    join tbluce on tbluce.intUCEClassID = tbleventclass.eventclassid
    join tbluser on tbluser.userid = tbluce.intUCEUserID
    where type = 1 AND userid = ?
    `
	db.query(query, [req.session.member.userid], function (err, results, fields) {
		if (err) return res.send(err);
		req.joinedClasses = results;
		req.classIds = []
		results.forEach((results) => {
			req.classIds.push(results.eventclassid)
		})

		return next();
	})

}

router.post('/class/join', (req, res) => {
	db.query("INSERT INTO tbluce (intUCEUserID, intUCEClassID) VALUES (?, ?)", [req.session.member.userid, req.body.id], (err, results, fields) => {
		db.query('UPDATE tbleventclass SET slot= slot - 1 where eventclassid=?', [req.body.id], (err, results, fields) => {
			if (err) return res.send(err);
		});
	});
})


router.post('/class/resign', (req, res) => {
	db.query("DELETE FROM tbluce WHERE intUCEID = ?", [req.body.uceid], (err, results, fields) => {
		db.query('UPDATE tbleventclass SET slot= slot + 1 where eventclassid=?', [req.body.classid], (err, results, fields) => {
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
			results.startdate = moment(results.startdate, 'MM/DD/YYYY').format('MMM DD, YYYY');
			results.enddate = moment(results.enddate, 'MM/DD/YYYY').format('MMM DD, YYYY');
			results.starttime = moment(results.starttime, 'HH:mm:ss').format('hh:mm A');
			results.endtime = moment(results.endtime, 'HH:mm:ss').format('hh:mm A');
		})
		req.viewEvent = results;
		return next();
	})
}

function joinedEvents(req, res, next) {
	const query = `SELECT * FROM tbleventclass 
    join tbluce on tbluce.intUCEClassID = tbleventclass.eventclassid
    join tbluser on tbluser.userid = tbluce.intUCEUserID
    where type = 2 AND userid = ?
    `
	db.query(query, [req.session.member.userid], function (err, results, fields) {
		if (err) return res.send(err);
		req.joinedEvents = results;
		req.eventIds = []
		results.forEach((results) => {
			req.eventIds.push(results.eventclassid)
		})

		return next();
	})

}

router.post('/event/join', (req, res) => {
	db.query("INSERT INTO tbluce (intUCEUserID, intUCEClassID) VALUES (?, ?)", [req.session.member.userid, req.body.id], (err, results, fields) => {
		db.query('UPDATE tbleventclass SET slot= slot - 1 where eventclassid=?', [req.body.id], (err, results, fields) => {
			if (err) return res.send(err);
		});
	});
})


router.post('/event/resign', (req, res) => {
	db.query("DELETE FROM tbluce WHERE intUCEID = ?", [req.body.uceid], (err, results, fields) => {
		db.query('UPDATE tbleventclass SET slot= slot + 1 where eventclassid=?', [req.body.eventid], (err, results, fields) => {
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
	db.query(query, [req.session.member.userid, req.body.trainerId], (err) => {
		if (err) return res.send(err)
	})
})


// VIEW
function viewTrainers(req, res, next) {
	const query = `
		SELECT * 
		FROM tbltrainer
		left JOIN tblbranch on tbltrainer.trainerbranch = tblbranch.branchID 
		JOIN tblspecial on tblspecial.specialID = tbltrainer.trainerspecialization
  `
	db.query(query, function (err, results, fields) {
		if (err) return res.send(err);
		req.viewTrainers = results;
		return next();
	})
}

router.post('/view/specialty', (req, res) => {
	const query = `
		SELECT id, 
			tbltrainer.trainerid, 
			tblspecial.specialID, 
			specialname 
		FROM tbltrainer_specialty 
		JOIN tbltrainer ON tbltrainer_specialty.trainerid = tbltrainer.trainerid
		JOIN tblspecial ON tbltrainer_specialty.specialid = tblspecial.specialID
		WHERE tbltrainer.trainerid = ?
		`
	db.query(query, [ req.body.id ], (err, out) => {
		if (err) console.error(err)
		res.send(out)
	})
})

// Checking if member is accepted or pending
function check(req, res, next) {
	const query = `
    SELECT * from tbppt join tbluser on tbppt.memid = tbluser.userid where tbluser.userid = ?
    `
	db.query(query, [req.session.member.userid], function (err, results, fields) {
		if (err) return res.send(err);
		if (results[0] == undefined) {
			return next()
		} else {
			req.status = results[0].status
			if (req.status == 1) {
				res.redirect('accepted')
			} else if (req.status == 2) {
				res.redirect('pending')
			} else {
				res.send('You are neither accepted, pending, or a member')
			}
		}
	})
}



//******************************************************* */
//                    Accepted.
//******************************************************* */

function checkForChange(req, res, next) {
	const query = `SELECT * from tblchange join tbluser on tbluser.userid = tblchange.memid where userid = ?`
	db.query(query, [req.session.member.userid], (err, results, fields) => {
		if (results.length != 0) {
			res.redirect('change')
		}
		return next();
	})
}

//Update Schedule if finished
function checkFinishedSession(req, res, next) {
	const today = moment().format('YYYY-MM-DD')
	const query = `SELECT * from tbppt`;
	const query2 = `UPDATE tblsession SET session_count = session_count - 1 where sessionID = ?`;
	const query3 = `UPDATE tbppt SET scheduleStatus = 0, description = 'client is absent' where PTid = ?  `;

	db.query(query, (err, results) => {
		if (err) console.error(err)
		results.forEach(result => {
			const date = result.sessionDate
			
			if (date < today && result.scheduleStatus != 0) {
				
				db.query(query2, [result.sessionID], (err) => {
					if (err) console.error(err)
					db.query(query3, [result.PTid], (err) => {
						if (err) console.error(err)
					})
				})
			}
		})
		return next()
	})
}

router.post('/buy', (req, res) => {
	db.query('UPDATE tblsession SET amount = ? where sessionID = ?', [req.body.amount, req.body.sessionID], (err) => {
		db.query('UPDATE tblsession SET sessionStatus = 2 where sessionID = ?', [req.body.sessionID], (err) => {
			if (err) res.redirect('accepted')
		})
	})
})


//View Schedule
router.post('/pt/schedule', (req, res) => {
	const query = `SELECT * FROM tbppt join tbluser on tbluser.userid = tbppt.memid join tbltrainer on tbltrainer.trainerid = tbppt.trainid where userid = ? AND scheduleStatus != 0`
	db.query(query, [req.session.member.userid], (err, out) => {
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
	db.query(query, [req.body.desc, req.body.rejId], (err) => {
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
	db.query(query, [req.body.rejId], (err) => {
		if (err) console.error(err);
	})
})


function personalTrainer(req, res, next) {
	const query = `
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
		if (err) return res.send(err)
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
			res.redirect('trainee')
		}
	})
})


// Change Trainer
router.post('/change', (req, res) => {
	const query = ` 
    INSERT INTO tblchange (status, memid, trainid, sender, description) VALUES (2, ?, ?, 'Member', ?)
    `
	db.query(query, [
		req.session.member.userid,
		req.body.trainerid,
		req.body.reason
	], (err, out) => {
		if (err) console.error(err)
	})
})

//- History
function viewHistory(req, res, next) {
	db.query('SELECT * from tbppt JOIN tbluser on tbluser.userid = tbppt.memid where userid = ? AND scheduleStatus = 0', [req.session.member.userid], (err, results) => {
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

router.post('/fee', (req, res) => {
	db.query('SELECT * from tblgenera where generalID = 5', (err, out) => {
		if (err) console.error(err)
		res.send(out[0])
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

function viewSusp(req, res, next) {
	const query = `
		UPDATE tblmembership m 
		JOIN tbluser u ON m.usersid=u.userid 
		SET m.status='Suspended', 
			u.userpassword=NULL 
		WHERE m.expirydate <= CURDATE()
	`
  db.query(query, (err, results, fields) => {
    if (err)
      console.log(err);
    else {
      return next()
    }
  })
}

// ---------- F U N C T I O N S ---------- //
function dashboard(req, res, next) {
	return res.render('member/views/dashboard', {
		utils: req.utils,
		notifs: req.notifs,
		profs: req.initial,
		total: req.total,
		fee: req.fee,
		expirydate: req.getExpiryDate,
		session: req.session
	})
}

function profile(req, res, next) {
	return res.render('member/views/profile', {
		utils: req.utils,
		notifs: req.notifs,
		profs: req.initial,
		session: req.session
	})
}

function events(req, res, next) {
	return res.render('member/views/events', {
		utils: req.utils,
		notifs: req.notifs,
		joinedEvents: req.joinedEvents,
		eventIds: req.eventIds,
		profs: req.initial,
		eves: req.viewEvent,
		session: req.session
	});
}

function classes(req, res, next) {
	return res.render('member/views/classes', {
		utils: req.utils,
		notifs: req.notifs,
		joinedClasses: req.joinedClasses,
		classIds: req.classIds,
		classes: req.viewClass,
		profs: req.initial,
		session: req.session
	});
}

function trainer(req, res, next) {
	return res.render('member/views/trainer', {
		utils: req.utils,
		notifs: req.notifs,
		profs: req.initial,
		trainers: req.viewTrainers,
		session: req.session
	})
}


function pending(req, res, next) {
	return res.render('member/views/pending', {
		utils: req.utils,
		notifs: req.notifs,
		profs: req.initial,
		session: req.session
	});
}

function accepted(req, res, next) {
	return res.render('member/views/accepted', {
		utils: req.utils,
		notifs: req.notifs,
		profs: req.initial,
		pt: req.pt,
		sessions: req.sessions,
		session: req.session
	});
}

function change(req, res, next) {
	return res.render('member/views/change', {
		utils: req.utils,
		notifs: req.notifs,
		profs: req.initial,
		session: req.session

	});
}

// ------------- GET ---------------//
router.get('/', initial, notification, viewUtils, totalPayment, getExpiryDate, fee, viewSusp, checkFinishedSession, dashboard);
router.get('/profile', notification, viewUtils, initial, profile);
router.get('/events', notification, viewUtils, joinedEvents, viewEvent, initial, events);
router.get('/trainers', notification, viewUtils, initial, check, viewTrainers, trainer);
router.get('/classes', notification, viewUtils, joinedClasses, viewClass, initial, classes);
router.get('/pending', notification, viewUtils, initial, pending);
router.get('/accepted', notification, viewUtils, viewHistory, checkForChange, personalTrainer, initial, accepted);
router.get('/change', notification, viewUtils, initial, change);
exports.member = router;