-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: dbgym
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblbranch`
--

DROP TABLE IF EXISTS `tblbranch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblbranch` (
  `branchID` int(11) NOT NULL AUTO_INCREMENT,
  `branchname` varchar(45) DEFAULT NULL,
  `branchstreetname` varchar(100) DEFAULT NULL,
  `branchcity` varchar(100) DEFAULT NULL,
  `user` varchar(70) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`branchID`),
  KEY `user_idx` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbranch`
--

INSERT INTO `tblbranch` VALUES (5,' A-team Marikina','  Concepcion St','         Marikina City',NULL,'2018-09-27','Carlo Ching'),(6,'A-Team Sta Mesa','Paco St.','      Manila City',' Vince Oreta','2018-09-27','Carlo Ching'),(9,'A-Team Cebu','38 Blk 42 Tanod St','Cebu City',NULL,'2018-09-27','Carlo Ching'),(10,'A-Team Eastwood','Eastwood St','Quezon City',NULL,'2018-09-27','Carlo Ching'),(11,'123','Love street','Makati CIty',NULL,'2019-02-16','Carlo Ching');

--
-- Table structure for table `tblcat`
--

DROP TABLE IF EXISTS `tblcat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblcat` (
  `membershipID` int(11) NOT NULL AUTO_INCREMENT,
  `membershipdesc` varchar(200) DEFAULT NULL,
  `membershipname` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`membershipID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcat`
--

INSERT INTO `tblcat` VALUES (4,'  The Client is allowed to visit and use the gym equipment in all of our branches nationwide','Interbranch',1,'2018-09-27','Carlo Ching'),(5,'Exclusive on one of our branches','Exclusive',1,'2018-09-27','Carlo Ching'),(6,'ansjkdnasd','Provincial',2,'2018-09-29','Carlo Ching');

--
-- Table structure for table `tblchange`
--

DROP TABLE IF EXISTS `tblchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblchange` (
  `changeID` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `memid` int(11) DEFAULT NULL,
  `trainid` int(11) DEFAULT NULL,
  `description` text,
  `sender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`changeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblchange`
--


--
-- Table structure for table `tblclass`
--

DROP TABLE IF EXISTS `tblclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblclass` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `classname` varchar(45) NOT NULL,
  `classdesc` varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblclass`
--

INSERT INTO `tblclass` VALUES (5,'Yoga','Stretching, breathing, meditation, and flexibility exercises',1,'2018-09-27','Carlo Ching'),(6,'Zumba','Zumba is a fitness program that combines Latin and international music with dance moves. Zumba routines incorporate interval training — alternating fast and slow rhythms — and resistance training.',1,'2018-10-10','Carlo Ching'),(7,'Pole Dancing','Sumasayaw sa tubo',1,'2018-10-17','Carlo Ching'),(8,'MMA','Suntukan na matindi',1,'2019-02-16','Carlo Ching');

--
-- Table structure for table `tbleventclass`
--

DROP TABLE IF EXISTS `tbleventclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbleventclass` (
  `eventclassid` int(11) NOT NULL AUTO_INCREMENT,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `starttime` varchar(45) DEFAULT NULL,
  `endtime` varchar(45) DEFAULT NULL,
  `slot` int(11) DEFAULT NULL,
  `eventclassname` varchar(60) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `desc` text,
  `days` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`eventclassid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbleventclass`
--

INSERT INTO `tbleventclass` VALUES (1,'08/31/2018','09/01/2018','09:00:00','18:00:00',13,'Body Building',2,'Compete with bodybuilders ','',0),(2,'09/07/2018','09/28/2018','04:00:00','22:00:00',15,'MMA Meet UP',2,'Meeting with professional fighters','',0),(3,NULL,NULL,'11:00','12:00',8,'Yoga',1,'yoga this','0,1,2',NULL),(4,NULL,NULL,'07:35:00','10:00:00',15,'Zumba',1,'Zumba Class','1,3',NULL);

--
-- Table structure for table `tblfacilities`
--

DROP TABLE IF EXISTS `tblfacilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblfacilities` (
  `facilitiesID` int(11) NOT NULL AUTO_INCREMENT,
  `facilitiesname` varchar(45) NOT NULL,
  `fee` int(11) NOT NULL,
  `period` int(11) DEFAULT NULL,
  `UOM` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`facilitiesID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfacilities`
--

INSERT INTO `tblfacilities` VALUES (1,' Washroom',100,12,'hr'),(2,'Dance Room',150,1,'hr'),(3,'Freezing Fee',56,1,'secs');

--
-- Table structure for table `tblfreeze`
--

DROP TABLE IF EXISTS `tblfreeze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblfreeze` (
  `freezeid` int(11) NOT NULL AUTO_INCREMENT,
  `userfid` int(11) DEFAULT NULL,
  `genid` int(11) DEFAULT NULL,
  `datefrozen` date DEFAULT NULL,
  `freezedmonths` int(11) DEFAULT NULL,
  `unfreezedate` date DEFAULT NULL,
  `minus` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `freezeduntil` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`freezeid`),
  KEY `userfid_idx` (`userfid`),
  KEY `genid_idx` (`genid`),
  CONSTRAINT `genid` FOREIGN KEY (`genid`) REFERENCES `tblgenera` (`generalid`),
  CONSTRAINT `userfid` FOREIGN KEY (`userfid`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfreeze`
--

INSERT INTO `tblfreeze` VALUES (9,113,4,'2018-10-18',2,'2018-10-16',-2,100,'2018-12-18','Paid'),(10,120,4,'2018-10-18',3,NULL,NULL,150,'2019-01-18','Unpaid'),(11,122,4,'2018-11-29',5,NULL,NULL,250,'2019-04-29','Unpaid');

--
-- Table structure for table `tblgenera`
--

DROP TABLE IF EXISTS `tblgenera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblgenera` (
  `generalID` int(11) NOT NULL AUTO_INCREMENT,
  `genname` varchar(70) DEFAULT NULL,
  `genperiod` int(11) DEFAULT NULL,
  `UOM` varchar(50) DEFAULT NULL,
  `fee` float DEFAULT NULL,
  `description` text,
  `type` varchar(45) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`generalID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblgenera`
--

INSERT INTO `tblgenera` VALUES (4,'Freezing Fee',NULL,'',50,NULL,'Member','2018-09-27','Carlo Ching'),(5,'Session Fee',NULL,NULL,50,NULL,'Member',NULL,NULL),(6,'Changing Membership Fee',NULL,NULL,150,NULL,'Member',NULL,NULL),(7,'Account Reactivation Fee',NULL,NULL,200,NULL,'Member',NULL,NULL),(8,'Events Fee',NULL,NULL,250,NULL,'Non-Member',NULL,NULL);

--
-- Table structure for table `tblmembership`
--

DROP TABLE IF EXISTS `tblmembership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblmembership` (
  `memberid` int(11) NOT NULL AUTO_INCREMENT,
  `usersid` int(11) DEFAULT NULL,
  `membershiprateid` int(11) DEFAULT NULL,
  `specializationid` int(11) DEFAULT NULL,
  `acceptdate` date DEFAULT NULL,
  `expirydate` date DEFAULT NULL,
  `paymentcode` varchar(45) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `promoid` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `discamnt` float DEFAULT NULL,
  `upgradedate` date DEFAULT NULL,
  `accessID` int(11) DEFAULT NULL,
  PRIMARY KEY (`memberid`),
  UNIQUE KEY `accessID_UNIQUE` (`accessID`),
  KEY `userid_idx` (`usersid`),
  KEY `membershiprateid_idx` (`membershiprateid`),
  KEY `specializationid_idx` (`specializationid`),
  KEY `promoid_idx` (`promoid`),
  CONSTRAINT `membershiprateid` FOREIGN KEY (`membershiprateid`) REFERENCES `tblmemrates` (`memrateid`),
  CONSTRAINT `promoid` FOREIGN KEY (`promoid`) REFERENCES `tblpromo` (`promoid`),
  CONSTRAINT `specializationid` FOREIGN KEY (`specializationid`) REFERENCES `tblspecial` (`specialid`),
  CONSTRAINT `usersid` FOREIGN KEY (`usersid`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmembership`
--

INSERT INTO `tblmembership` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,111,3,4,'2018-10-04','2018-12-04','4jdqCuq','Suspended',NULL,NULL,NULL,NULL,NULL),(5,113,6,5,'2018-10-04','2019-04-14','s492xmo','Paid',NULL,NULL,NULL,'2019-04-16',NULL),(7,120,5,4,'2018-10-13','2019-04-13','LhIG2AX','Paid',9,NULL,NULL,NULL,NULL),(8,121,5,5,'2018-10-13','2019-04-13','7s167Rp','Paid',9,1235,NULL,NULL,NULL),(9,122,3,4,'2018-10-17','2018-11-17','bEL78TR','Suspended',9,760,NULL,NULL,NULL),(10,123,5,4,NULL,NULL,'ypo8E8J','Pending',9,1235,NULL,NULL,NULL),(11,126,3,4,NULL,NULL,'Lcf2pIc','Pending',9,760,NULL,NULL,NULL),(12,128,3,4,'2018-11-27','2018-12-27','m3KhjlR','Suspended',9,760,NULL,NULL,NULL),(13,132,3,4,'2018-10-17','2018-11-17','oiWIhTD','Suspended',9,760,NULL,NULL,NULL),(14,133,8,5,'2018-10-17','2020-10-17','CiF6xJL','Paid',9,2089.05,NULL,NULL,NULL),(15,135,3,NULL,'2019-01-19','2019-04-19','UO9uQHf','Paid',NULL,800,NULL,NULL,NULL),(16,137,7,NULL,'2019-02-16','2020-02-16','bpeFcbX','Paid',NULL,2499,NULL,NULL,NULL);

--
-- Table structure for table `tblmemclass`
--

DROP TABLE IF EXISTS `tblmemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblmemclass` (
  `memclassid` int(11) NOT NULL AUTO_INCREMENT,
  `memclassname` varchar(45) DEFAULT NULL,
  `memclassdesc` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`memclassid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemclass`
--

INSERT INTO `tblmemclass` VALUES (1,'Gold','Member pays annually (12 months)',1,'2018-09-27','Carlo Ching'),(2,'Silver','Member pays semi-annually (6 months)',1,'2018-09-27','Carlo Ching'),(3,'Bronze','Member pays monthly',1,'2018-09-27','Carlo Ching'),(4,'Platinum','Member pays every three (3) years',1,'2018-09-27','Carlo Ching'),(5,'Diamond','Member pays every five (5) years',1,'2018-09-27','Carlo Ching'),(6,'RUBY','lifetime',2,'2018-09-28','Carlo Ching'),(7,'RUBY','LIFETIME',2,'2018-09-29','Carlo Ching'),(8,'Challenger','Cancer Gaming\r\n',1,'2019-02-16','Carlo Ching'),(9,'Wood','Mahinang nilalang',1,'2019-02-16','Carlo Ching');

--
-- Table structure for table `tblmemrates`
--

DROP TABLE IF EXISTS `tblmemrates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblmemrates` (
  `memrateid` int(11) NOT NULL AUTO_INCREMENT,
  `memfee` float DEFAULT NULL,
  `memperiod` int(11) DEFAULT NULL,
  `memcat` int(11) DEFAULT NULL,
  `memclass` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`memrateid`),
  KEY `memcat_idx` (`memcat`),
  KEY `memclass_idx` (`memclass`),
  CONSTRAINT `memcat` FOREIGN KEY (`memcat`) REFERENCES `tblcat` (`membershipid`),
  CONSTRAINT `memclass` FOREIGN KEY (`memclass`) REFERENCES `tblmemclass` (`memclassid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemrates`
--

INSERT INTO `tblmemrates` VALUES (3,800,1,4,3,'2018-09-27','Carlo Ching'),(5,1300,6,4,2,'2018-09-27','Carlo Ching'),(6,1699,6,5,2,'2018-09-27','Carlo Ching'),(7,2499,12,4,1,'2018-09-27','Carlo Ching'),(8,2199,12,5,1,'2018-09-27','Carlo Ching'),(9,699,1,5,3,NULL,NULL),(10,-1,-1,5,8,NULL,NULL);

--
-- Table structure for table `tblnotification`
--

DROP TABLE IF EXISTS `tblnotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblnotification` (
  `notifid` int(11) NOT NULL AUTO_INCREMENT,
  `notifdescid` int(11) DEFAULT NULL,
  `ptid` int(11) DEFAULT NULL,
  `memid` int(11) DEFAULT NULL,
  `notifstatus` varchar(45) DEFAULT NULL,
  `notifdate` varchar(45) DEFAULT NULL,
  `notiftime` varchar(45) DEFAULT NULL,
  `forwhom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notifid`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotification`
--

INSERT INTO `tblnotification` VALUES (30,3,NULL,127,'unread','2018-10-16T19:28:19+08:00',NULL,NULL),(46,9,NULL,127,'unread','2018-10-16T20:40:20+08:00',NULL,NULL),(47,1,NULL,133,'unread','2019-10-10T10:07:46+08:00',NULL,NULL);

--
-- Table structure for table `tblnotificationdesc`
--

DROP TABLE IF EXISTS `tblnotificationdesc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblnotificationdesc` (
  `notifdescid` int(11) NOT NULL AUTO_INCREMENT,
  `notifdesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notifdescid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotificationdesc`
--

INSERT INTO `tblnotificationdesc` VALUES (1,'a week before due date.'),(2,'four days before due date.'),(3,'Your due date is tomorrow'),(4,'Pending membership application.'),(5,'Requested to purchase sessions.'),(6,'Event you applied on is tomorrow'),(7,'Four days before event.'),(8,'Event today.'),(9,'- session\'s tomorow');

--
-- Table structure for table `tblnotifications`
--

DROP TABLE IF EXISTS `tblnotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblnotifications` (
  `intNotifID` int(11) NOT NULL AUTO_INCREMENT,
  `strNotifType` varchar(45) NOT NULL,
  `txtNotifContent` longtext NOT NULL,
  `datNotifInstance` date NOT NULL,
  `intuserid` int(11) DEFAULT NULL,
  PRIMARY KEY (`intNotifID`),
  KEY `userid_idx` (`intuserid`),
  CONSTRAINT `intuserid` FOREIGN KEY (`intuserid`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotifications`
--


--
-- Table structure for table `tblpayment`
--

DROP TABLE IF EXISTS `tblpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblpayment` (
  `paymentid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `paymentdate` date DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `classification` int(11) DEFAULT NULL,
  `branchid` int(11) DEFAULT NULL,
  PRIMARY KEY (`paymentid`),
  KEY `userid_idx` (`userid`),
  KEY `branchid_idx` (`branchid`),
  CONSTRAINT `branchid` FOREIGN KEY (`branchid`) REFERENCES `tblbranch` (`branchid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayment`
--

INSERT INTO `tblpayment` VALUES (1,111,'2018-10-04',800,1,6),(2,113,'2018-10-04',699,1,6),(4,111,'2018-10-05',800,1,6),(9,114,'2019-01-19',50,3,6),(10,116,'2018-10-13',1235,4,6),(11,120,'2018-10-13',1235,4,6),(12,121,'2018-10-13',1235,4,6),(13,122,'2018-10-17',760,4,6),(14,123,NULL,NULL,NULL,6),(15,124,'2018-10-13',NULL,4,6),(16,126,NULL,NULL,NULL,6),(17,128,'2018-11-27',760,4,6),(19,113,'2018-10-16',150,6,6),(28,113,'2018-10-16',100,2,6),(29,120,NULL,150,2,NULL),(30,114,'2018-10-17',50,3,6),(31,113,NULL,100,2,NULL),(32,132,'2018-10-17',760,4,6),(33,133,'2018-10-17',2089.05,4,6),(34,133,'2018-10-17',350,5,6),(35,122,NULL,250,2,NULL),(39,134,'2019-01-19',50,3,6),(40,135,'2019-01-19',800,1,6),(41,133,'2019-01-19',500,5,6),(42,136,'2019-01-19',50,3,6),(43,137,'2019-02-16',2499,1,6),(44,135,'2019-02-16',800,1,NULL),(45,133,'2019-02-16',2199,1,NULL),(46,135,'2019-02-16',800,1,NULL);

--
-- Table structure for table `tblprogram`
--

DROP TABLE IF EXISTS `tblprogram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblprogram` (
  `progid` int(11) NOT NULL AUTO_INCREMENT,
  `progname` varchar(45) NOT NULL,
  `progdesc` varchar(200) NOT NULL,
  PRIMARY KEY (`progid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblprogram`
--

INSERT INTO `tblprogram` VALUES (1,'boxing','suntukan'),(2,'taekwando','sipaan'),(3,'MMA','mixed martial arts'),(4,'Brazillian Jujitsu','Grappling and Take Downs');

--
-- Table structure for table `tblpromo`
--

DROP TABLE IF EXISTS `tblpromo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblpromo` (
  `promoID` int(11) NOT NULL AUTO_INCREMENT,
  `promoname` varchar(45) DEFAULT NULL,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `statusback` int(11) DEFAULT NULL,
  `promotype` varchar(45) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `Addedby` varchar(70) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`promoID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpromo`
--

INSERT INTO `tblpromo` VALUES (9,'Christmas Promo','2018-08-01','2018-12-15',5,'Active',1,'Non-Member','2018-10-13','Carlo Ching','Promo During Christmas season , all mmebership fees are off by 5%'),(10,'Halloween Promo','2018-10-17','2018-11-03',10,'Active',1,'Non-Member','2018-10-17','Carlo Ching','Promo for Halloween');

--
-- Table structure for table `tblsession`
--

DROP TABLE IF EXISTS `tblsession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblsession` (
  `sessionID` int(11) NOT NULL AUTO_INCREMENT,
  `session_count` int(11) DEFAULT NULL,
  `sessionForSched` int(11) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `sessionStatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`sessionID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsession`
--

INSERT INTO `tblsession` VALUES (1,10,10,NULL,NULL),(2,20,20,NULL,NULL),(3,30,30,NULL,NULL),(5,9,9,NULL,NULL);

--
-- Table structure for table `tblspecial`
--

DROP TABLE IF EXISTS `tblspecial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblspecial` (
  `specialID` int(11) NOT NULL AUTO_INCREMENT,
  `specialname` varchar(45) DEFAULT NULL,
  `specialdesc` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`specialID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblspecial`
--

INSERT INTO `tblspecial` VALUES (4,'Strength Training','This training focuses on raw strength.',1),(5,'Buff Up','Focusing Buffing Muscles for Competitions',1);

--
-- Table structure for table `tbltrainer`
--

DROP TABLE IF EXISTS `tbltrainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbltrainer` (
  `trainerid` int(11) NOT NULL AUTO_INCREMENT,
  `trainerfname` varchar(45) DEFAULT NULL,
  `trainerlname` varchar(45) DEFAULT NULL,
  `trainerpassword` varchar(45) DEFAULT NULL,
  `profile` varchar(150) DEFAULT NULL,
  `trainermobile` varchar(15) DEFAULT NULL,
  `trainergender` varchar(45) DEFAULT NULL,
  `trainerschedule` varchar(100) DEFAULT NULL,
  `trainerbday` varchar(45) DEFAULT NULL,
  `trainerbranch` int(11) DEFAULT NULL,
  `trainerspecialization` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `trainerusername` varchar(45) DEFAULT NULL,
  `traineremail` varchar(45) DEFAULT NULL,
  `traineraddress` varchar(100) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `trainertimestart` time DEFAULT NULL,
  `trainertimeend` time DEFAULT NULL,
  PRIMARY KEY (`trainerid`),
  KEY `branch_idx` (`trainerbranch`),
  KEY `specialization_idx` (`trainerspecialization`),
  CONSTRAINT `trainerbranch` FOREIGN KEY (`trainerbranch`) REFERENCES `tblbranch` (`branchid`),
  CONSTRAINT `trainerspecialization` FOREIGN KEY (`trainerspecialization`) REFERENCES `tblspecial` (`specialid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltrainer`
--

INSERT INTO `tbltrainer` VALUES (1,'John','Vincents','12345',NULL,'09183413801','male','1,2,3,4,5','10/23/1996',NULL,4,NULL,'vincent','john@gmail.com','Manila City','Regular',NULL,NULL),(2,'John','Harvey','12345',NULL,'09123456789','Male','1,2,3,4,5','10/23/1996',5,5,NULL,'harvs','harvs@gmail.com','Manila city','Freelance','08:00:00','18:00:00'),(3,'Kuya','Wil','123456',NULL,'09874564321','Male','Monday,Tuesday,Wednesday,Thursday,Friday','November 7, 1990',5,5,NULL,'WIlL','vincemiguel15@yahoo.com','#68E F.C. Cruz St.',NULL,NULL,NULL);

--
-- Table structure for table `tbluce`
--

DROP TABLE IF EXISTS `tbluce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbluce` (
  `intUCEID` int(11) NOT NULL AUTO_INCREMENT,
  `intUCEClassID` int(11) DEFAULT NULL,
  `intUCEUserID` int(11) DEFAULT NULL,
  UNIQUE KEY `intUCEID_UNIQUE` (`intUCEID`),
  KEY `intUCEUserID_idx` (`intUCEUserID`),
  KEY `intUCEClassID_idx` (`intUCEClassID`),
  CONSTRAINT `intUCEClassID` FOREIGN KEY (`intUCEClassID`) REFERENCES `tbleventclass` (`eventclassid`),
  CONSTRAINT `intUCEUserID` FOREIGN KEY (`intUCEUserID`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluce`
--

INSERT INTO `tbluce` VALUES (1,3,122),(5,3,133);

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbluser` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `branch` int(11) DEFAULT NULL,
  `userfname` varchar(45) DEFAULT NULL,
  `userlname` varchar(45) DEFAULT NULL,
  `useremail` varchar(100) DEFAULT NULL,
  `userpassword` varchar(20) DEFAULT NULL,
  `usertype` int(11) DEFAULT NULL,
  `profile` varchar(150) DEFAULT NULL,
  `usermobile` varchar(45) DEFAULT NULL,
  `useraddress` varchar(100) DEFAULT NULL,
  `usergender` varchar(45) DEFAULT NULL,
  `userschedule` varchar(100) DEFAULT NULL,
  `userbday` varchar(50) DEFAULT NULL,
  `userusername` varchar(45) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  `statusfront` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `branch_idx` (`branch`),
  CONSTRAINT `branch` FOREIGN KEY (`branch`) REFERENCES `tblbranch` (`branchid`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` VALUES (9,6,'Carlo','Ching','admin','12345',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(97,6,'Vince','Oreta','vince@gmail.com','12345',4,NULL,'09176739472',NULL,NULL,NULL,NULL,'vincevince','2018-09-26','Carlo Ching','Active'),(111,NULL,'Conor ','Mcgregor','conor@gmail.com',NULL,2,NULL,'09123456789','45 Goyo Street Sampaloc Manila','male',NULL,'09/21/1987','notorious',NULL,NULL,NULL),(113,5,'Jon','Jones','Jones@gmail.com','12345',2,NULL,'09123456789','189 Maria Street Sampaloc Manila','male',NULL,'11/16/1989','bones',NULL,NULL,NULL),(114,NULL,'Anderson','Silva',NULL,NULL,NULL,NULL,'09123456789',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(115,NULL,'Justine ','Espin','justine@gmail.com',NULL,4,NULL,'09123456789',NULL,NULL,NULL,NULL,'justine','2018-10-10','Carlo Ching','Inactive'),(116,NULL,'Tj','Dillashaw','tj@gmail.com','12345',2,NULL,'09123456789','57 Ibarra St Sampaloc Manila','male',NULL,'08/24/1990','dillashaw',NULL,NULL,NULL),(119,5,'Roy','Nelson','Roy@gmail.com',NULL,2,NULL,'09123456789','81 Macaraig Street  Sampaloc Manila','male',NULL,'06/23/1990','roynelson',NULL,NULL,NULL),(120,NULL,'Mark ','Hunt','mark@gmail.com','12345',2,NULL,'09123456789','52 Tiago Street Sampaloc Manila','male',NULL,'02/13/1990','mark',NULL,NULL,NULL),(121,NULL,'Max','Holloway','Max@gmail.com','12345',2,NULL,'09123456789','51 Macaraig Street Makati City','male',NULL,'07/27/1990','maxh',NULL,NULL,NULL),(122,NULL,'Chael ','Sonnen','chael@gmail.com',NULL,2,NULL,'09123456789','51 Macaraig Street Sampaloc Manila','male',NULL,'03/22/1990','Chael',NULL,NULL,NULL),(123,NULL,'Khabib','Nurmagomedov','Eagle@gmail.com',NULL,2,NULL,'09123456789','51 Sisa Street Sampaloc Manila','male',NULL,'07/19/1980','Eagle',NULL,NULL,NULL),(124,5,'John','Henson','hens@gmail.com','12345',2,NULL,'09123456789','87 Ginto Street Samplaoc Manila','Male',NULL,'03/11/89','heneson',NULL,NULL,NULL),(125,5,'Nate','Diaz','nate@gmail.com','12345',2,NULL,'09123456789','25 Golden Street Sampaloc Manila','Male',NULL,'03/11/87','natediaz',NULL,NULL,NULL),(126,NULL,'Skip','Bayless','skip@gmail.com',NULL,2,NULL,'09123456789','57 Silver Street Makati City','Male',NULL,'02/20/1980','skipp',NULL,NULL,NULL),(127,5,'Spike','Johnson','Spike@gmail.com','12345',2,NULL,'09123456789','57 Silver Street Sampaloc Manila','Male',NULL,'07/24/1980','spike',NULL,NULL,NULL),(128,NULL,'Hendrick ','Chambers','hen@gmail.com',NULL,2,NULL,'09123456789','25 Birch Street Laguna City','Male',NULL,'02/05/1980','hendrick',NULL,NULL,NULL),(131,NULL,'Jacky','Love','jacky@gmail.com','12345',4,'JackyLove.jpg','09123456789',NULL,NULL,NULL,NULL,'jack','2018-10-17','Carlo Ching','Inactive'),(132,NULL,'Serena ','Reyes','',NULL,2,NULL,'09087684567','43 Golden Street  Makati City','Female',NULL,'06/15/1989','Serena',NULL,NULL,NULL),(133,6,'Rachel ','Nayre','rachelnayre@gmail.com','12345',2,NULL,'09213423234','54 Ibarra Street Santa Mesa','Female',NULL,'09/21/1978','ganda',NULL,NULL,NULL),(134,NULL,'Jerome','Pumaren',NULL,NULL,NULL,NULL,'09345678902',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(135,NULL,'Roger','Federrer','vincemiguel14@yahoo.com','123456',2,NULL,'09457867557','California Makati','Male',NULL,'06/24/1982','roger',NULL,NULL,NULL),(136,NULL,'Manny ','Pacquiao',NULL,NULL,NULL,NULL,'+639083586708',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(137,NULL,'Jolly','Dela Cruz','jdc@gmail.com','12345',2,NULL,'09280183183','Skreet Manila','Male',NULL,'07/17/1985','GS3ph',NULL,NULL,NULL);

--
-- Table structure for table `tbppt`
--

DROP TABLE IF EXISTS `tbppt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbppt` (
  `PTid` int(11) NOT NULL AUTO_INCREMENT,
  `memid` int(11) DEFAULT NULL,
  `trainid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `sessionDate` varchar(45) DEFAULT NULL,
  `sessionTime` varchar(45) DEFAULT NULL,
  `changeID` int(11) DEFAULT NULL,
  `sessionID` int(11) DEFAULT NULL,
  `scheduleStatus` int(11) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`PTid`),
  KEY `memid_idx` (`memid`),
  KEY `trainid_idx` (`trainid`),
  KEY `sessionID_idx` (`sessionID`),
  CONSTRAINT `memid` FOREIGN KEY (`memid`) REFERENCES `tbluser` (`userid`),
  CONSTRAINT `trainid` FOREIGN KEY (`trainid`) REFERENCES `tbltrainer` (`trainerid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbppt`
--

INSERT INTO `tbppt` VALUES (11,133,2,1,NULL,NULL,NULL,5,NULL,NULL),(12,135,2,2,NULL,NULL,NULL,NULL,NULL,NULL),(13,133,2,1,'2019-01-22','11:00 am',NULL,5,0,NULL),(14,133,2,1,'2019-02-07','08:30 am',NULL,5,0,NULL),(15,137,1,2,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
