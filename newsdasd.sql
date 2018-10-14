-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: schema
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblbranch`
--

DROP TABLE IF EXISTS tblbranch;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblbranch (
  branchID int(11) NOT NULL,
  branchname varchar(45) DEFAULT NULL,
  branchstreetname varchar(100) DEFAULT NULL,
  branchcity varchar(100) DEFAULT NULL,
  `user` varchar(70) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  addedby varchar(70) DEFAULT NULL,
  PRIMARY KEY (branchID),
  KEY user_idx (`user`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbranch`
--

INSERT INTO tblbranch VALUES (5,' A-team Marikina','  Concepcion St','         Marikina City',' Vince Oreta','2018-09-27','Carlo Ching'),(6,'A-Team Sta Mesa','Paco St.','      Manila City',NULL,'2018-09-27','Carlo Ching'),(9,'A-Team Cebu','38 Blk 42 Tanod St','Cebu City',NULL,'2018-09-27','Carlo Ching'),(10,'A-Team Eastwood','Eastwood St','Quezon City',NULL,'2018-09-27','Carlo Ching');

--
-- Table structure for table `tblcat`
--

DROP TABLE IF EXISTS tblcat;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblcat (
  membershipID int(11) NOT NULL,
  membershipdesc varchar(200) DEFAULT NULL,
  membershipname varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  addedby varchar(70) DEFAULT NULL,
  PRIMARY KEY (membershipID)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcat`
--

INSERT INTO tblcat VALUES (4,'  The Client is allowed to visit and use the gym equipment in all of our branches nationwide','Interbranch',1,'2018-09-27','Carlo Ching'),(5,'Exclusive on one of our branches','Exclusive',1,'2018-09-27','Carlo Ching'),(6,'ansjkdnasd','Provincial',2,'2018-09-29','Carlo Ching');

--
-- Table structure for table `tblclass`
--

DROP TABLE IF EXISTS tblclass;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblclass (
  classID int(11) NOT NULL,
  classname varchar(45) NOT NULL,
  classdesc varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  addedby varchar(70) DEFAULT NULL,
  PRIMARY KEY (classID)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblclass`
--

INSERT INTO tblclass VALUES (5,'Yoga','Stretching, breathing, meditation, and flexibility exercises',1,'2018-09-27','Carlo Ching'),(6,'Zumba','umba is a fitness program that combines Latin and international music with dance moves. Zumba routines incorporate interval training — alternating fast and slow rhythms — and resistance training.',1,'2018-10-10','Carlo Ching');

--
-- Table structure for table `tbleventclass`
--

DROP TABLE IF EXISTS tbleventclass;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tbleventclass (
  eventclassid int(11) NOT NULL,
  startdate varchar(45) DEFAULT NULL,
  enddate varchar(45) DEFAULT NULL,
  starttime time DEFAULT NULL,
  endtime time DEFAULT NULL,
  slot int(11) DEFAULT NULL,
  eventclassname varchar(60) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `desc` text,
  days varchar(45) DEFAULT NULL,
  PRIMARY KEY (eventclassid)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbleventclass`
--

INSERT INTO tbleventclass VALUES (1,'08/31/2018','09/01/2018','09:00:00','18:00:00',13,'Body Building',2,'Compete with bodybuilders ',''),(2,'09/07/2018','09/28/2018','04:00:00','22:00:00',15,'MMA Meet UP',2,'Meeting with professional fighters',NULL);

--
-- Table structure for table `tblfacilities`
--

DROP TABLE IF EXISTS tblfacilities;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblfacilities (
  facilitiesID int(11) NOT NULL,
  facilitiesname varchar(45) NOT NULL,
  fee int(11) NOT NULL,
  period int(11) DEFAULT NULL,
  UOM varchar(45) DEFAULT NULL,
  PRIMARY KEY (facilitiesID)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfacilities`
--

INSERT INTO tblfacilities VALUES (1,' Washroom',100,12,'hr'),(2,'Dance Room',150,1,'hr'),(3,'Freezing Fee',56,1,'secs');

--
-- Table structure for table `tblfreeze`
--

DROP TABLE IF EXISTS tblfreeze;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblfreeze (
  freezeid int(11) NOT NULL,
  userfid int(11) DEFAULT NULL,
  genid int(11) DEFAULT NULL,
  datefrozen date DEFAULT NULL,
  freezedmonths int(11) DEFAULT NULL,
  unfreezedate date DEFAULT NULL,
  minus int(11) DEFAULT NULL,
  total int(11) DEFAULT NULL,
  freezeduntil date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (freezeid),
  KEY userfid_idx (userfid),
  KEY genid_idx (genid),
  CONSTRAINT genid FOREIGN KEY (genid) REFERENCES tblgenera (generalID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT userfid FOREIGN KEY (userfid) REFERENCES tbluser (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfreeze`
--

INSERT INTO tblfreeze VALUES (2,113,4,'2018-10-07',2,NULL,NULL,100,'2018-12-07','Unpaid');

--
-- Table structure for table `tblgenera`
--

DROP TABLE IF EXISTS tblgenera;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblgenera (
  generalID int(11) NOT NULL,
  genname varchar(70) DEFAULT NULL,
  genperiod int(11) DEFAULT NULL,
  UOM varchar(50) DEFAULT NULL,
  fee float DEFAULT NULL,
  description text,
  `type` varchar(45) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  addedby varchar(70) DEFAULT NULL,
  PRIMARY KEY (generalID)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblgenera`
--

INSERT INTO tblgenera VALUES (4,'Freezing Fee',NULL,'Month',50,NULL,'Member','2018-09-27','Carlo Ching');

--
-- Table structure for table `tblmembership`
--

DROP TABLE IF EXISTS tblmembership;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblmembership (
  memberid int(11) NOT NULL,
  usersid int(11) DEFAULT NULL,
  membershiprateid int(11) DEFAULT NULL,
  specializationid int(11) DEFAULT NULL,
  acceptdate date DEFAULT NULL,
  expirydate date DEFAULT NULL,
  paymentcode varchar(45) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  promoid int(11) DEFAULT NULL,
  total float DEFAULT NULL,
  discamnt float DEFAULT NULL,
  PRIMARY KEY (memberid),
  KEY userid_idx (usersid),
  KEY membershiprateid_idx (membershiprateid),
  KEY specializationid_idx (specializationid),
  KEY promoid_idx (promoid),
  CONSTRAINT membershiprateid FOREIGN KEY (membershiprateid) REFERENCES tblmemrates (memrateid) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT promoid FOREIGN KEY (promoid) REFERENCES tblpromo (promoID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT specializationid FOREIGN KEY (specializationid) REFERENCES tblspecial (specialID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT usersid FOREIGN KEY (usersid) REFERENCES tbluser (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmembership`
--

INSERT INTO tblmembership VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,111,3,4,'2018-10-04','2018-12-04','4jdqCuq','Paid',NULL,NULL,NULL),(5,113,4,5,'2018-10-04','2018-11-04','s492xmo','Paid',NULL,NULL,NULL),(6,116,5,4,'2018-10-13','2019-04-13','KOH5eAm','Paid',NULL,NULL,NULL),(7,120,5,4,'2018-10-13','2019-04-13','LhIG2AX','Paid',9,NULL,NULL),(8,121,5,5,'2018-10-13','2019-04-13','7s167Rp','Paid',9,1235,NULL),(9,122,3,4,NULL,NULL,'bEL78TR','Pending',9,760,NULL),(10,123,5,4,NULL,NULL,'ypo8E8J','Pending',9,1235,NULL);

--
-- Table structure for table `tblmemclass`
--

DROP TABLE IF EXISTS tblmemclass;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblmemclass (
  memclassid int(11) NOT NULL,
  memclassname varchar(45) DEFAULT NULL,
  memclassdesc varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  addedby varchar(70) DEFAULT NULL,
  PRIMARY KEY (memclassid)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemclass`
--

INSERT INTO tblmemclass VALUES (1,'Gold','Member pays annually (12 months)',1,'2018-09-27','Carlo Ching'),(2,'Silver','Member pays semi-annually (6 months)',1,'2018-09-27','Carlo Ching'),(3,'Bronze','Member pays monthly',1,'2018-09-27','Carlo Ching'),(4,'Platinum','Member pays every three (3) years',1,'2018-09-27','Carlo Ching'),(5,'Diamond','Member pays every five (5) years',1,'2018-09-27','Carlo Ching'),(6,'RUBY','lifetime',2,'2018-09-28','Carlo Ching'),(7,'RUBY','LIFETIME',2,'2018-09-29','Carlo Ching');

--
-- Table structure for table `tblmemrates`
--

DROP TABLE IF EXISTS tblmemrates;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblmemrates (
  memrateid int(11) NOT NULL,
  memfee float DEFAULT NULL,
  memperiod int(11) DEFAULT NULL,
  memcat int(11) DEFAULT NULL,
  memclass int(11) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  addedby varchar(70) DEFAULT NULL,
  PRIMARY KEY (memrateid),
  KEY memcat_idx (memcat),
  KEY memclass_idx (memclass),
  CONSTRAINT memcat FOREIGN KEY (memcat) REFERENCES tblcat (membershipID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT memclass FOREIGN KEY (memclass) REFERENCES tblmemclass (memclassid) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemrates`
--

INSERT INTO tblmemrates VALUES (3,800,1,4,3,'2018-09-27','Carlo Ching'),(4,699,1,5,3,'2018-09-27','Carlo Ching'),(5,1300,6,4,2,'2018-09-27','Carlo Ching'),(6,1699,6,5,2,'2018-09-27','Carlo Ching'),(7,2499,12,4,1,'2018-09-27','Carlo Ching'),(8,2199,12,5,1,'2018-09-27','Carlo Ching');

--
-- Table structure for table `tblnotifications`
--

DROP TABLE IF EXISTS tblnotifications;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblnotifications (
  intNotifID int(11) NOT NULL,
  strNotifType varchar(45) NOT NULL,
  txtNotifContent longtext NOT NULL,
  datNotifInstance date NOT NULL,
  intuserid int(11) DEFAULT NULL,
  PRIMARY KEY (intNotifID),
  KEY userid_idx (intuserid),
  CONSTRAINT intuserid FOREIGN KEY (intuserid) REFERENCES tbluser (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotifications`
--


--
-- Table structure for table `tblpayment`
--

DROP TABLE IF EXISTS tblpayment;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblpayment (
  paymentid int(11) NOT NULL,
  userid int(11) DEFAULT NULL,
  paymentdate date DEFAULT NULL,
  amount float DEFAULT NULL,
  classification int(11) DEFAULT NULL,
  branchid int(11) DEFAULT NULL,
  PRIMARY KEY (paymentid),
  KEY userid_idx (userid),
  KEY branchid_idx (branchid),
  CONSTRAINT branchid FOREIGN KEY (branchid) REFERENCES tblbranch (branchID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT userid FOREIGN KEY (userid) REFERENCES tbluser (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayment`
--

INSERT INTO tblpayment VALUES (1,111,'2018-10-04',800,1,NULL),(2,113,'2018-10-04',699,1,NULL),(4,111,'2018-10-05',800,1,NULL),(6,113,NULL,100,2,NULL),(9,114,NULL,50,3,NULL),(10,116,'2018-10-13',1235,4,NULL),(11,120,'2018-10-13',1235,4,NULL),(12,121,'2018-10-13',1235,4,NULL),(13,122,NULL,NULL,NULL,NULL),(14,123,NULL,NULL,NULL,NULL),(15,124,'2018-10-13',NULL,4,NULL);

--
-- Table structure for table `tblprogram`
--

DROP TABLE IF EXISTS tblprogram;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblprogram (
  progid int(11) NOT NULL,
  progname varchar(45) NOT NULL,
  progdesc varchar(200) NOT NULL,
  PRIMARY KEY (progid)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblprogram`
--

INSERT INTO tblprogram VALUES (1,'boxing','suntukan'),(2,'taekwando','sipaan'),(3,'MMA','mixed martial arts'),(4,'Brazillian Jujitsu','Grappling and Take Downs');

--
-- Table structure for table `tblpromo`
--

DROP TABLE IF EXISTS tblpromo;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblpromo (
  promoID int(11) NOT NULL,
  promoname varchar(45) DEFAULT NULL,
  startdate varchar(45) DEFAULT NULL,
  enddate varchar(45) DEFAULT NULL,
  discount int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  statusback int(11) DEFAULT NULL,
  promotype varchar(45) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  Addedby varchar(70) DEFAULT NULL,
  description longtext,
  PRIMARY KEY (promoID)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpromo`
--

INSERT INTO tblpromo VALUES (9,'Christmas Promo','2018-08-01','2018-12-15',5,'Active',1,'Non-Member','2018-10-13','Carlo Ching','Promo During Christmas season , all mmebership fees are off by 5%');

--
-- Table structure for table `tblsession`
--

DROP TABLE IF EXISTS tblsession;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblsession (
  sessionID int(11) NOT NULL,
  session_count int(11) DEFAULT NULL,
  sessionForSched int(11) DEFAULT NULL,
  amount varchar(45) DEFAULT NULL,
  PRIMARY KEY (sessionID)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsession`
--

INSERT INTO tblsession VALUES (1,10,10,NULL),(2,20,20,NULL),(3,30,30,NULL);

--
-- Table structure for table `tblspecial`
--

DROP TABLE IF EXISTS tblspecial;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tblspecial (
  specialID int(11) NOT NULL,
  specialname varchar(45) DEFAULT NULL,
  specialdesc varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (specialID)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblspecial`
--

INSERT INTO tblspecial VALUES (4,'Strength Training','This training focuses on raw strength.',1),(5,'Buff Up','Focusing Buffing Muscles for Competitions',1);

--
-- Table structure for table `tbltrainer`
--

DROP TABLE IF EXISTS tbltrainer;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tbltrainer (
  trainerid int(11) NOT NULL,
  trainerfname varchar(45) DEFAULT NULL,
  trainerlname varchar(45) DEFAULT NULL,
  trainerpassword varchar(45) DEFAULT NULL,
  `profile` varchar(150) DEFAULT NULL,
  trainermobile varchar(15) DEFAULT NULL,
  trainergender varchar(45) DEFAULT NULL,
  trainerschedule varchar(100) DEFAULT NULL,
  trainerbday varchar(45) DEFAULT NULL,
  trainerbranch int(11) DEFAULT NULL,
  trainerspecialization int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  trainerusername varchar(45) DEFAULT NULL,
  traineremail varchar(45) DEFAULT NULL,
  traineraddress varchar(100) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  trainertimestart time DEFAULT NULL,
  trainertimeend time DEFAULT NULL,
  PRIMARY KEY (trainerid),
  KEY branch_idx (trainerbranch),
  KEY specialization_idx (trainerspecialization),
  CONSTRAINT trainerbranch FOREIGN KEY (trainerbranch) REFERENCES tblbranch (branchID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT trainerspecialization FOREIGN KEY (trainerspecialization) REFERENCES tblspecial (specialID) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltrainer`
--

INSERT INTO tbltrainer VALUES (1,'John','Vincents','12345',NULL,'09183413801','male','Monday,Tuesday,Wednesday,Thursday,Friday','10/23/1996',NULL,4,NULL,'vincent','john@gmail.com','Manila City','Regular',NULL,NULL),(2,'John','Harvey','12345',NULL,'09123456789','Male','Tuesday,Thursday','10/23/1996',5,5,NULL,'harvs','harvs@gmail.com','Manila city','Freelance','08:00:00','18:00:00');

--
-- Table structure for table `tbluce`
--

DROP TABLE IF EXISTS tbluce;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tbluce (
  intUCEID int(11) NOT NULL,
  intUCEClassID int(11) DEFAULT NULL,
  intUCEUserID int(11) DEFAULT NULL,
  UNIQUE KEY intUCEID_UNIQUE (intUCEID),
  KEY intUCEUserID_idx (intUCEUserID),
  KEY intUCEClassID_idx (intUCEClassID),
  CONSTRAINT intUCEClassID FOREIGN KEY (intUCEClassID) REFERENCES tbleventclass (eventclassid) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT intUCEUserID FOREIGN KEY (intUCEUserID) REFERENCES tbluser (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluce`
--


--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS tbluser;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tbluser (
  userid int(11) NOT NULL,
  branch int(11) DEFAULT NULL,
  userfname varchar(45) DEFAULT NULL,
  userlname varchar(45) DEFAULT NULL,
  useremail varchar(100) DEFAULT NULL,
  userpassword varchar(20) DEFAULT NULL,
  usertype int(11) DEFAULT NULL,
  `profile` varchar(150) DEFAULT NULL,
  usermobile varchar(45) DEFAULT NULL,
  useraddress varchar(100) DEFAULT NULL,
  usergender varchar(45) DEFAULT NULL,
  userschedule varchar(100) DEFAULT NULL,
  userbday varchar(50) DEFAULT NULL,
  userusername varchar(45) DEFAULT NULL,
  Dateadded date DEFAULT NULL,
  addedby varchar(70) DEFAULT NULL,
  statusfront varchar(45) DEFAULT NULL,
  PRIMARY KEY (userid),
  KEY branch_idx (branch),
  CONSTRAINT branch FOREIGN KEY (branch) REFERENCES tblbranch (branchID) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

INSERT INTO tbluser VALUES (9,NULL,'Carlo','Ching','admin','12345',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(97,5,'Vince','Oreta','vince@gmail.com','12345',4,NULL,'09176739472',NULL,NULL,NULL,NULL,'vincevince','2018-09-26','Carlo Ching','Active'),(111,NULL,'Conor ','Mcgregor','conor@gmail.com','12345',2,NULL,'09123456789','45 Goyo Street Sampaloc Manila','male',NULL,'09/21/1987','notorious',NULL,NULL,NULL),(113,5,'Jon','Jones','Jones@gmail.com','12345',2,NULL,'09123456789','189 Maria Street Sampaloc Manila','male',NULL,'11/16/1989','bones',NULL,NULL,NULL),(114,NULL,'Anderson','Silva',NULL,NULL,NULL,NULL,'09123456789',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(115,NULL,'Justine ','Espin','justine@gmail.com',NULL,4,NULL,'09123456789',NULL,NULL,NULL,NULL,'justine','2018-10-10','Carlo Ching','Inactive'),(116,NULL,'Tj','Dillashaw','tj@gmail.com','12345',2,NULL,'09123456789','57 Ibarra St Sampaloc Manila','male',NULL,'08/24/1990','dillashaw',NULL,NULL,NULL),(119,5,'Roy','Nelson','Roy@gmail.com',NULL,2,NULL,'09123456789','81 Macaraig Street  Sampaloc Manila','male',NULL,'06/23/1990','roynelson',NULL,NULL,NULL),(120,NULL,'Mark ','Hunt','mark@gmail.com','12345',2,NULL,'09123456789','52 Tiago Street Sampaloc Manila','male',NULL,'02/13/1990','mark',NULL,NULL,NULL),(121,NULL,'Max','Holloway','Max@gmail.com','12345',2,NULL,'09123456789','51 Macaraig Street Makati City','male',NULL,'07/27/1990','maxh',NULL,NULL,NULL),(122,NULL,'Chael ','Sonnen','chael@gmail.com',NULL,2,NULL,'09123456789','51 Macaraig Street Sampaloc Manila','male',NULL,'03/22/1990','Chael',NULL,NULL,NULL),(123,NULL,'Khabib','Nurmagomedov','Eagle@gmail.com',NULL,2,NULL,'09123456789','51 Sisa Street Sampaloc Manila','male',NULL,'07/19/1980','Eagle',NULL,NULL,NULL),(124,5,'John','Henson','hens@gmail.com','12345',2,NULL,'09123456789','87 Ginto Street Samplaoc Manila','Male',NULL,'03/11/89','heneson',NULL,NULL,NULL);

--
-- Table structure for table `tbppt`
--

DROP TABLE IF EXISTS tbppt;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE tbppt (
  PTid int(11) NOT NULL,
  memid int(11) DEFAULT NULL,
  trainid int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  sessionDate varchar(45) DEFAULT NULL,
  sessionTime varchar(45) DEFAULT NULL,
  changeID int(11) DEFAULT NULL,
  sessionID int(11) DEFAULT NULL,
  PRIMARY KEY (PTid),
  KEY memid_idx (memid),
  KEY trainid_idx (trainid),
  KEY sessionID_idx (sessionID),
  CONSTRAINT memid FOREIGN KEY (memid) REFERENCES tbluser (userid) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT trainid FOREIGN KEY (trainid) REFERENCES tbltrainer (trainerid) ON DELETE NO ACTION ON UPDATE NO ACTION
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbppt`
--


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
