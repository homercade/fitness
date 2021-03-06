-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: here
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbranch`
--

INSERT INTO `tblbranch` VALUES (5,' A-team Marikina','  Concepcion St','Marikina City',NULL,'2018-09-27','Carlo Ching'),(6,'A-Team Sta Mesa','Paco St.','Manila City','Vince Oreta','2018-09-27','Carlo Ching'),(9,'A-Team Cebu','38 Blk 42 Tanod St','Cebu City',NULL,'2018-09-27','Carlo Ching'),(10,'A-Team Eastwood','Eastwood St','Quezon City',NULL,'2018-09-27','Carlo Ching'),(11,'A-Team Batangas','Rizal Street','Batangas City',NULL,'2019-03-16','Carlo Ching');

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

INSERT INTO `tblcat` VALUES (4,'The Client is allowed to visit and use the gym equipment in all of our branches nationwide','Interbranch',1,'2018-09-27','Carlo Ching'),(5,'Exclusive on one of the many A-Team Fitness branches','Exclusive',1,'2018-09-27','Carlo Ching'),(6,'Provincial','Provincial',2,'2019-03-16','Carlo Ching');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblclass`
--

INSERT INTO `tblclass` VALUES (5,'Yoga','Stretching, breathing, meditation, and flexibility exercises',1,'2018-09-27','Carlo Ching'),(6,'Zumba','Zumba is a fitness program that combines Latin and international music with dance moves. Zumba routines incorporate interval training — alternating fast and slow rhythms — and resistance training.',1,'2018-10-10','Carlo Ching'),(7,'Pole Dancing','Sumasayaw sa tubo',2,'2018-10-17','Carlo Ching'),(8,'MMA','Inside an octagon, fighters utilize different kinds of martial arts in order to gain victory.',1,'2019-02-16','Carlo Ching'),(9,'TaeKwonDo','A kind of martial arts originating from Korea where the user\'s main weapon are their feet.',1,'2019-03-02','Carlo Ching'),(10,'Judo','A martial art where the main goal is to send your opponent to the ground.',1,'2019-03-16','Carlo Ching');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbleventclass`
--

INSERT INTO `tbleventclass` VALUES (1,'08/31/2018','09/01/2018','09:00:00','18:00:00',12,'Body Building',2,'Compete with bodybuilders ','',0),(2,'02/08/2019','02/10/2019','04:00:00','22:00:00',13,'MMA Meet UP',2,'Meeting with professional fighters','',0),(3,NULL,NULL,'11:00','12:00',8,'Yoga',1,'yoga this','0,1,2',NULL),(4,NULL,NULL,'07:35:00','10:00:00',14,'Zumba',1,'Zumba Class','1,3',NULL),(5,NULL,NULL,'05:00:00','07:00:00',19,'MMA',1,'Hve Fun','4,5 ,6',NULL),(6,'03/17/2019','03/17/2019','5:25 AM','6:25 AM',20,'Cardio Exercise',2,'Cardio Exercise',NULL,NULL),(7,'03/21/2019','03/16/2019','1:35 PM','1:35 PM',24,'Sample Event',2,'Cursed event',NULL,0),(8,'03/21/2019','03/29/2019','1:55 PM','2:55 PM',10,'Try event',2,'Sample',NULL,NULL);

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
  `fee` double DEFAULT NULL,
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
  `cardnum` varchar(50) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmembership`
--

INSERT INTO `tblmembership` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,111,3,4,'2018-10-04','2018-12-04','4jdqCuq','Suspended',NULL,NULL,NULL,NULL,NULL,NULL),(5,113,6,5,'2018-10-04','2019-04-14','s492xmo','Paid',NULL,NULL,NULL,'2019-04-16',NULL,'0002950227'),(7,120,5,4,'2018-10-13','2019-04-13','LhIG2AX','Paid',9,NULL,NULL,NULL,NULL,NULL),(8,121,5,5,'2018-10-13','2020-04-13','7s167Rp','Paid',9,1235,NULL,NULL,NULL,NULL),(9,122,3,4,'2018-10-17','2018-11-17','bEL78TR','Suspended',9,760,NULL,NULL,NULL,NULL),(10,123,5,4,NULL,NULL,'ypo8E8J','Pending',9,1235,NULL,NULL,NULL,NULL),(11,126,3,4,NULL,NULL,'Lcf2pIc','Pending',9,760,NULL,NULL,NULL,NULL),(12,128,3,4,'2018-11-27','2018-12-27','m3KhjlR','Suspended',9,760,NULL,NULL,NULL,NULL),(13,132,3,4,'2018-10-17','2018-11-17','oiWIhTD','Suspended',9,760,NULL,NULL,NULL,NULL),(14,133,8,5,'2018-10-17','2020-10-17','CiF6xJL','Paid',9,2089.05,NULL,NULL,NULL,NULL),(15,135,3,NULL,'2019-01-19','2019-09-19','UO9uQHf','Paid',NULL,800,NULL,NULL,NULL,NULL),(16,137,7,NULL,'2019-02-16','2020-02-16','bpeFcbX','Paid',NULL,2499,NULL,NULL,NULL,NULL),(17,138,9,4,NULL,'2019-05-13',NULL,'Paid',NULL,NULL,NULL,NULL,NULL,NULL),(18,143,3,NULL,NULL,NULL,'30CYrB9','Pending',NULL,800,NULL,NULL,NULL,NULL),(19,144,3,NULL,NULL,NULL,'9yXNs1W','Pending',NULL,800,NULL,NULL,NULL,NULL),(20,145,3,NULL,NULL,NULL,'3qYa4ST','Pending',NULL,800,NULL,NULL,NULL,NULL),(21,146,3,NULL,NULL,NULL,'1IjjPR5','Pending',NULL,800,NULL,NULL,NULL,NULL),(22,147,3,NULL,NULL,NULL,'GcxxtcV','Pending',NULL,800,NULL,NULL,NULL,NULL),(23,148,3,NULL,NULL,NULL,'VYtbEW8','Pending',NULL,800,NULL,NULL,NULL,NULL),(24,149,6,NULL,'2019-03-16','2019-09-16','ank9tH3','Paid',NULL,1699,NULL,NULL,NULL,NULL),(25,150,7,NULL,NULL,NULL,'2y7eJpc','Pending',NULL,2499,NULL,NULL,NULL,NULL),(26,151,5,NULL,NULL,NULL,'R89LxM8','Pending',NULL,1300,NULL,NULL,NULL,NULL),(27,153,3,NULL,NULL,NULL,'3Kk0CUZ','Pending',NULL,800,NULL,NULL,NULL,NULL),(28,154,7,NULL,'2019-03-16','2020-03-16','oNca4D6','Paid',NULL,2499,NULL,NULL,NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemclass`
--

INSERT INTO `tblmemclass` VALUES (1,'Gold','Member pays annually (12 months)',1,'2018-09-27','Carlo Ching'),(2,'Silver','Member pays semi-annually (6 months)',1,'2018-09-27','Carlo Ching'),(3,'Bronze','Member pays monthly',1,'2018-09-27','Carlo Ching'),(4,'Platinum','Member pays every three (3) years',1,'2018-09-27','Carlo Ching'),(5,'Diamond','Member pays every five (5) years',1,'2018-09-27','Carlo Ching'),(6,'RUBY','lifetime',2,'2018-09-28','Carlo Ching'),(7,'RUBY','LIFETIME',2,'2018-09-29','Carlo Ching'),(8,'Challenger','Cancer Gaming\r\n',2,'2019-02-16','Carlo Ching'),(9,'Wood','Mahinang nilalang',2,'2019-02-16','Carlo Ching'),(10,'Pearl','Member pays ',2,'2019-03-16','Carlo Ching');

--
-- Table structure for table `tblmemrates`
--

DROP TABLE IF EXISTS `tblmemrates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblmemrates` (
  `memrateid` int(11) NOT NULL AUTO_INCREMENT,
  `memfee` double DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemrates`
--

INSERT INTO `tblmemrates` VALUES (3,800,1,4,3,'2018-09-27','Carlo Ching'),(5,1300,6,4,2,'2018-09-27','Carlo Ching'),(6,1699,6,5,2,'2018-09-27','Carlo Ching'),(7,2499,12,4,1,'2018-09-27','Carlo Ching'),(8,2199,12,5,1,'2018-09-27','Carlo Ching'),(9,699,1,5,3,NULL,NULL),(11,5000,35,6,10,NULL,NULL);

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
  `eventid` int(11) DEFAULT NULL,
  `notifstatus` varchar(45) DEFAULT NULL,
  `notifdate` varchar(45) DEFAULT NULL,
  `notiftime` varchar(45) DEFAULT NULL,
  `forwhom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notifid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotification`
--

INSERT INTO `tblnotification` VALUES (3,9,4,154,NULL,'unread','2019-03-17','08:00 am','trainer'),(4,10,4,154,NULL,'unread','2019-03-17','08:00 am','member');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotificationdesc`
--

INSERT INTO `tblnotificationdesc` VALUES (1,'a week before due date.'),(2,'four days before due date.'),(3,'Your due date is tomorrow'),(4,'Pending membership application.'),(5,'Requested to purchase sessions.'),(6,'Event you applied on is tomorrow'),(7,'Four days before event.'),(8,'Event today.'),(9,'- session\'s tomorow'),(10,'You have a session tomorrow');

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
-- Table structure for table `tblor`
--

DROP TABLE IF EXISTS `tblor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblor` (
  `orid` int(11) NOT NULL AUTO_INCREMENT,
  `ornum` varchar(50) DEFAULT NULL,
  `dateadded` date DEFAULT NULL,
  `addedby` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orid`),
  UNIQUE KEY `ornum_UNIQUE` (`ornum`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblor`
--

INSERT INTO `tblor` VALUES (9,'2015-05757-MN-0','2019-03-02','Carlo Ching'),(10,'2015-02839-MN-0','2019-03-02','Carlo Ching'),(11,'2015-02619-MN-0','2019-03-02','Carlo Ching'),(12,'2015-02948-MN-0','2019-03-02','Carlo Ching'),(13,'2015-01646-MN-0','2019-03-02','Carlo Ching'),(14,'2016-08492-MN-0','2019-03-02','Carlo Ching'),(15,'2016-09382-MN-0','2019-03-02','Carlo Ching'),(16,'2015-00293-MN-0','2019-03-02','Carlo Ching'),(17,'2018-00003-MN-0','2019-03-02','Carlo Ching'),(18,'2015-03029-MN-0','2019-03-02','Carlo Ching'),(19,'2015-01112-MN-0','2019-03-02','Carlo Ching'),(20,'2015-00940-MN-1','2019-03-02','Carlo Ching'),(21,'2015-02272-MN-0','2019-03-02','Carlo Ching'),(22,'2015-01998-MN-0','2019-03-02','Carlo Ching'),(23,'2016-00593-MN-0','2019-03-02','Carlo Ching'),(24,'2016-02931-MN-0','2019-03-02','Carlo Ching'),(25,'2039-05898-OP-0','2019-03-16','Carlo Ching'),(26,'000000001','2019-03-16','Carlo Ching'),(27,'000000000000000000000000000002','2019-03-16','Carlo Ching'),(28,'00000000000003','2019-03-16','Carlo Ching'),(29,'0000004','2019-03-16','Carlo Ching'),(30,'0000000005','2019-03-16','Carlo Ching'),(31,'0000006','2019-03-16','Carlo Ching'),(32,'00007','2019-03-16','Carlo Ching'),(33,'00008','2019-03-16','Carlo Ching'),(34,'0000009','2019-03-16','Carlo Ching'),(35,'00010','2019-03-16','Carlo Ching'),(36,'2015-00398-MN-0','2019-03-16','Carlo Ching'),(37,'2015-00987-MN-0','2019-03-16','Carlo Ching'),(38,'201901','2019-03-16','Carlo Ching'),(39,'201902','2019-03-16','Carlo Ching'),(40,'201903','2019-03-16','Carlo Ching'),(41,'201904','2019-03-16','Carlo Ching'),(42,'201905','2019-03-16','Carlo Ching'),(43,'201906','2019-03-16','Carlo Ching'),(44,'201907','2019-03-16','Carlo Ching'),(45,'201908','2019-03-16','Carlo Ching'),(46,'201909','2019-03-16','Carlo Ching'),(47,'201910','2019-03-16','Carlo Ching'),(48,'2019772997192','2019-03-16','Carlo Ching'),(49,'2019782773611','2019-03-16','Carlo Ching'),(50,'20197871293','2019-03-16','Carlo Ching'),(51,'201927846871','2019-03-16','Carlo Ching'),(52,'201992837498','2019-03-16','Carlo Ching'),(53,'201928348761','2019-03-16','Carlo Ching'),(54,'201920192019','2019-03-16','Carlo Ching'),(56,'201978342479','2019-03-16','Carlo Ching'),(57,'20190103801','2019-03-16','Carlo Ching'),(58,'201991872973','2019-03-16','Carlo Ching'),(59,'201912932198','2019-03-16','Carlo Ching'),(60,'20190238712','2019-03-16','Carlo Ching');

--
-- Table structure for table `tblpayment`
--

DROP TABLE IF EXISTS `tblpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblpayment` (
  `paymentid` int(11) NOT NULL AUTO_INCREMENT,
  `ornum` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `paymentdate` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `classification` int(11) DEFAULT NULL,
  `branchid` int(11) DEFAULT NULL,
  PRIMARY KEY (`paymentid`),
  KEY `branchid_idx` (`branchid`),
  KEY `or_idx` (`ornum`),
  CONSTRAINT `branchid` FOREIGN KEY (`branchid`) REFERENCES `tblbranch` (`branchid`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayment`
--

INSERT INTO `tblpayment` VALUES (1,1,111,'2018-10-04',800,1,6),(2,2,113,'2018-10-04',699,1,6),(4,3,111,'2018-10-05',800,1,6),(9,4,114,'2019-01-19',50,3,6),(10,5,116,'2018-10-13',1235,4,6),(11,6,120,'2018-10-13',1235,4,6),(12,7,121,'2018-10-13',1235,4,6),(13,8,122,'2018-10-17',760,4,6),(14,9,123,NULL,NULL,NULL,6),(15,10,124,'2018-10-13',NULL,4,6),(16,11,126,NULL,NULL,NULL,6),(17,12,128,'2018-11-27',760,4,6),(19,13,113,'2018-10-16',150,6,6),(28,14,113,'2018-10-16',100,2,6),(29,15,120,NULL,150,2,NULL),(30,16,114,'2018-10-17',50,3,6),(31,17,113,NULL,100,2,NULL),(32,18,132,'2018-10-17',760,4,6),(33,19,133,'2018-10-17',2089.050048828125,4,6),(34,20,133,'2018-10-17',350,5,6),(35,21,122,NULL,250,2,NULL),(39,22,134,'2019-01-19',50,3,6),(40,23,135,'2019-01-19',800,1,6),(41,24,133,'2019-01-19',500,5,6),(42,25,136,'2019-01-19',50,3,6),(43,26,137,'2019-02-16',2499,1,6),(44,27,135,'2019-02-16',800,1,NULL),(45,28,133,'2019-02-16',2199,1,NULL),(46,29,135,'2019-02-16',800,1,NULL),(47,30,140,NULL,50,3,6),(51,NULL,185,NULL,NULL,NULL,NULL),(52,33,148,NULL,NULL,NULL,NULL),(53,35,138,'2019-03-16',699,1,NULL),(54,37,149,'2019-03-16',1699,1,6),(55,48,149,'2019-03-16',500,5,6),(56,48,150,NULL,NULL,NULL,NULL),(57,49,151,NULL,NULL,NULL,NULL),(58,50,152,NULL,50,3,6),(59,51,153,NULL,NULL,NULL,NULL),(60,52,154,'2019-03-16',2499,1,6);

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
  `promopic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`promoID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpromo`
--

INSERT INTO `tblpromo` VALUES (9,'Christmas Promo','2018-08-01','2018-12-15',5,'Inactive',2,'Non-Member','2018-10-13','Carlo Ching','Promo During Christmas season , all mmebership fees are off by 5%',NULL),(10,'Halloween Promo','2018-10-17','2018-11-03',10,'Inactive',2,'Non-Member','2018-10-17','Carlo Ching','Promo for Halloween',NULL),(11,'test promo','2019-03-14','2019-03-15',5,'Inactive',2,'Member','2019-03-14','Carlo Ching','sadad',NULL),(12,'asdasdas','2019-03-17','2019-03-18',5,'Active',2,'Member','2019-03-14','Carlo Ching','asdasd',NULL),(13,'Graduation Promo','2019-05-30','2019-05-31',-10,'Active',2,NULL,'2019-03-16','Carlo Ching','Graduation Promo','Graduation Promo.jpg'),(14,'Summer Promo','2019-04-10','2019-04-12',-10,'Active',2,NULL,'2019-03-16','Carlo Ching','summer promo','Summer Promo.jpg'),(15,'Summer Promo','2019-06-01','2019-07-01',10,'Active',1,NULL,'2019-03-16','Carlo Ching','Test Discount','Test Promo.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsession`
--

INSERT INTO `tblsession` VALUES (1,10,10,NULL,NULL),(2,20,20,NULL,NULL),(3,30,30,NULL,NULL),(5,91,93,NULL,NULL),(6,11,11,NULL,NULL),(7,1,0,NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblspecial`
--

INSERT INTO `tblspecial` VALUES (4,'Strength Training','This training focuses on raw strength.',1),(5,'Buff Up','Focusing Buffing Muscles for Competitions',1),(6,' Endurance',' Endurance training',1),(7,'Crossfit','Crossfit exercise',1),(8,'Circuit','Circuit exercise',1);

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
  `trainerpic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`trainerid`),
  KEY `branch_idx` (`trainerbranch`),
  KEY `specialization_idx` (`trainerspecialization`),
  CONSTRAINT `trainerbranch` FOREIGN KEY (`trainerbranch`) REFERENCES `tblbranch` (`branchid`),
  CONSTRAINT `trainerspecialization` FOREIGN KEY (`trainerspecialization`) REFERENCES `tblspecial` (`specialid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltrainer`
--

INSERT INTO `tbltrainer` VALUES (1,'John','Vincents','undefined',NULL,'09183413801','male','1,2,3,4,5','10/23/1996',NULL,7,NULL,'vincent','john@gmail.com','Manila City','Regular',NULL,NULL,'RafhaelPabustan.jpg'),(2,'John','Harvey','12345',NULL,'09123456789','Male','1,2,3,4,5','10/23/1996',5,5,NULL,'harvs','harvs@gmail.com','Manila city','Freelance','08:00:00','18:00:00','RafhaelPabustan.jpg'),(5,'Brook ','Lopez','12345',NULL,'09845897855','Male','1,2,3,4,5','07/28/1989',6,5,NULL,'brook','brook@gmail.com','Manila City',NULL,'14:01:00','17:59:00','Brook Lopez.jpg'),(7,'Jonel','De Lima','1234',NULL,'09092897387','Male','1,2,3,4,5,6,0','02/02/2010',5,7,NULL,'jonelll','jonel@gmal.com','Manila',NULL,'08:00:00','09:00:00','JonelDe Lima.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluce`
--

INSERT INTO `tbluce` VALUES (1,3,122),(5,3,133),(8,1,133),(9,2,133),(10,4,149),(11,2,149),(12,7,137),(13,5,154);

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
  `pic` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `branch_idx` (`branch`),
  CONSTRAINT `branch` FOREIGN KEY (`branch`) REFERENCES `tblbranch` (`branchid`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` VALUES (9,6,'Carlo','Ching','admin','12345',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CarloChing.jpg'),(97,6,'Vince','Oreta','vince@gmail.com','12345',4,NULL,'09176739472',NULL,NULL,NULL,NULL,'vincevince','2018-09-26','Carlo Ching','Active',NULL),(111,NULL,'Conor ','Mcgregor','conor@gmail.com',NULL,2,NULL,'09123456789','45 Goyo Street Sampaloc Manila','male',NULL,'09/21/1987','notorious',NULL,NULL,NULL,NULL),(113,5,'Jon','Jones','Jones@gmail.com','12345',2,NULL,'09123456789','189 Maria Street Sampaloc Manila','male',NULL,'11/16/1989','bones',NULL,NULL,NULL,NULL),(114,NULL,'Anderson','Silva',NULL,NULL,NULL,NULL,'09123456789',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(115,NULL,'Justine ','Espin','justine@gmail.com',NULL,4,NULL,'09123456789',NULL,NULL,NULL,NULL,'justine','2018-10-10','Carlo Ching','Inactive',NULL),(116,NULL,'Tj','Dillashaw','tj@gmail.com','12345',2,NULL,'09123456789','57 Ibarra St Sampaloc Manila','male',NULL,'08/24/1990','dillashaw',NULL,NULL,NULL,NULL),(119,5,'Roy','Nelson','Roy@gmail.com',NULL,2,NULL,'09123456789','81 Macaraig Street  Sampaloc Manila','male',NULL,'06/23/1990','roynelson',NULL,NULL,NULL,NULL),(120,NULL,'Mark ','Hunt','mark@gmail.com','12345',2,NULL,'09123456789','52 Tiago Street Sampaloc Manila','male',NULL,'02/13/1990','mark',NULL,NULL,NULL,NULL),(121,NULL,'Max','Holloway','Max@gmail.com','12345',2,NULL,'09123456789','51 Macaraig Street Makati City','male',NULL,'07/27/1990','maxh',NULL,NULL,NULL,NULL),(122,NULL,'Chael ','Sonnen','chael@gmail.com',NULL,2,NULL,'09123456789','51 Macaraig Street Sampaloc Manila','male',NULL,'03/22/1990','Chael',NULL,NULL,NULL,NULL),(123,NULL,'Khabib','Nurmagomedov','Eagle@gmail.com',NULL,2,NULL,'09123456789','51 Sisa Street Sampaloc Manila','male',NULL,'07/19/1980','Eagle',NULL,NULL,NULL,NULL),(124,5,'John','Henson','hens@gmail.com','12345',2,NULL,'09123456789','87 Ginto Street Samplaoc Manila','Male',NULL,'03/11/89','heneson',NULL,NULL,NULL,NULL),(125,5,'Nate','Diaz','nate@gmail.com','12345',2,NULL,'09123456789','25 Golden Street Sampaloc Manila','Male',NULL,'03/11/87','natediaz',NULL,NULL,NULL,NULL),(126,NULL,'Skip','Bayless','skip@gmail.com',NULL,2,NULL,'09123456789','57 Silver Street Makati City','Male',NULL,'02/20/1980','skipp',NULL,NULL,NULL,NULL),(127,5,'Spike','Johnson','Spike@gmail.com','12345',2,NULL,'09123456789','57 Silver Street Sampaloc Manila','Male',NULL,'07/24/1980','spike',NULL,NULL,NULL,NULL),(128,NULL,'Hendrick ','Chambers','hen@gmail.com',NULL,2,NULL,'09123456789','25 Birch Street Laguna City','Male',NULL,'02/05/1980','hendrick',NULL,NULL,NULL,NULL),(131,NULL,'Jacky','Love','jacky@gmail.com','12345',4,'JackyLove.jpg','09123456789',NULL,NULL,NULL,NULL,'jack','2018-10-17','Carlo Ching','Inactive',NULL),(132,NULL,'Serena ','Reyes','',NULL,2,NULL,'09087684567','43 Golden Street  Makati City','Female',NULL,'06/15/1989','Serena',NULL,NULL,NULL,NULL),(133,6,'Rachel ','Nayre','rachelnayre@gmail.com','12345',2,NULL,'09213423234','54 Ibarra Street Santa Mesa','Female',NULL,'09/21/1978','ganda',NULL,NULL,NULL,'Rachel Nayre.jpg'),(134,NULL,'Jerome','Pumaren',NULL,NULL,NULL,NULL,'09345678902',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(135,NULL,'Roger','Federrer','vincemiguel14@yahoo.com','123456',2,NULL,'09457867557','California Makati','Male',NULL,'06/24/1982','roger',NULL,NULL,NULL,NULL),(136,NULL,'Manny ','Pacquiao',NULL,NULL,NULL,NULL,'+639083586708',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(137,NULL,'Jolly','Dela Cruz','jdc@gmail.com','12345',2,NULL,'09280183183','Skreet Manila','Male',NULL,'07/17/1985','GS3ph',NULL,NULL,NULL,'CarloChing.jpg'),(138,6,'Ash','Gravy','ash@gmail.com','12345',2,NULL,'09457864557','ash street','Male',NULL,'07/23/1980','ash',NULL,NULL,NULL,NULL),(139,NULL,'John','Vangough',NULL,NULL,NULL,NULL,'09457895668',NULL,NULL,NULL,NULL,'smile',NULL,NULL,NULL,NULL),(140,NULL,'Flow','God',NULL,NULL,NULL,NULL,'09457867557',NULL,NULL,NULL,NULL,'Flow G',NULL,NULL,NULL,NULL),(141,NULL,'Shimawaru','Denzo','shiwa@gmail.com','12345',4,'ShimawaruDenzo.jpg','09456987445',NULL,NULL,NULL,NULL,'shiwa','2019-03-14','Carlo Ching','Inactive',NULL),(142,NULL,'Chinchin','Taberu','chin@gmail.com','12345',4,'ChinchinTaberu.jpg','09457896154',NULL,NULL,NULL,NULL,'chin','2019-03-14','Carlo Ching','Inactive',NULL),(143,NULL,'Dexter','Ibabao','dex@gmail.com',NULL,2,NULL,'09456789647','54 samama street Makati City','Male',NULL,'08/29/1986','Dexter',NULL,NULL,NULL,NULL),(144,NULL,'Julius','Ilalim','jul@gmail.com',NULL,2,NULL,'09789654778','Sapapa Street Mandaluyong City','Male',NULL,'07/25/1995','ilalim',NULL,NULL,NULL,NULL),(145,NULL,'Bebe ','Kalembang','bebe@gmail.com',NULL,2,NULL,'09587946887','Sakuya Street Pasig City','Male',NULL,'08/31/2000','bebeq',NULL,NULL,NULL,NULL),(146,NULL,'Karen','Tampok','karenn@gmail.com',NULL,2,NULL,'09354690875','Saate street Quezon City','Male',NULL,'11/28/1990','karena',NULL,NULL,NULL,NULL),(147,NULL,'David','Sanmaupo','dae@gmail.com',NULL,2,NULL,'09456987123','Sabunso street Tondo Manila','Male',NULL,'11/03/2005','sanmaupo',NULL,NULL,NULL,NULL),(148,NULL,'Kennard','Sabago','kenn@gmail.com',NULL,2,NULL,'09253146987','Satito Street Las Pinas City','Male',NULL,'07/27/2004','kennard',NULL,NULL,NULL,NULL),(149,11,'Riona','Niimi','niimi@yahoo.com','12345',2,NULL,'09675817548','561 Rizal Street Pateros','Female',NULL,'12/21/1998','Riona',NULL,NULL,NULL,'RionaNiimi.jpg'),(150,NULL,'Jomer','Kadena','jomerkadena@gmail.com',NULL,2,NULL,'09279164123','Guadeloupe St Kadena, Kadena','Male',NULL,'05/12/2013','jomer',NULL,NULL,NULL,NULL),(151,NULL,'Carol','Denvers','carol@g.com',NULL,2,NULL,'09381732831','Test Street Test City','Female',NULL,'05/12/2013','caroll',NULL,NULL,NULL,NULL),(152,NULL,'Vince','Miguel',NULL,NULL,NULL,NULL,'09083586708',NULL,NULL,NULL,NULL,'vince',NULL,NULL,NULL,NULL),(153,NULL,'test','test','',NULL,2,NULL,'09182938291','test test','Male',NULL,'07/15/2015','gs3ph',NULL,NULL,NULL,NULL),(154,NULL,'Leila','De Lima','delima@gmail.com','12345',2,NULL,'09290183878','De Lima Street Manila','Female',NULL,'01/13/1969','delima',NULL,NULL,NULL,NULL);

--
-- Table structure for table `tblutilities`
--

DROP TABLE IF EXISTS `tblutilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblutilities` (
  `utilid` int(11) NOT NULL AUTO_INCREMENT,
  `gymname` varchar(45) DEFAULT NULL,
  `companyname` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `logo` varchar(45) DEFAULT NULL,
  `workdays` varchar(45) DEFAULT NULL,
  `currsymbol` varchar(45) DEFAULT NULL,
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL,
  `pic` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`utilid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblutilities`
--

INSERT INTO `tblutilities` VALUES (1,'A-Team Fitness','A-Team Fitness Inc.','4408 Old. Sta Mesa St, Newton Plaza','Sta. Mesa Manila','09457867557','ateamfitness@gmail.com','NaNlogo.jpg','1,2,3,4,5',NULL,NULL,NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbppt`
--

INSERT INTO `tbppt` VALUES (3,154,7,0,NULL,NULL,NULL,7,NULL,NULL),(4,154,7,0,'2019-03-18','08:00 am',NULL,7,2,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
