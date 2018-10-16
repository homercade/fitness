-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: puta
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblbranch`
--

LOCK TABLES `tblbranch` WRITE;
/*!40000 ALTER TABLE `tblbranch` DISABLE KEYS */;
INSERT INTO `tblbranch` VALUES (5,' A-team Marikina','  Concepcion St','         Marikina City',' Vince Oreta','2018-09-27','Carlo Ching'),(6,'A-Team Sta Mesa','Paco St.','      Manila City',NULL,'2018-09-27','Carlo Ching'),(9,'A-Team Cebu','38 Blk 42 Tanod St','Cebu City',NULL,'2018-09-27','Carlo Ching'),(10,'A-Team Eastwood','Eastwood St','Quezon City',NULL,'2018-09-27','Carlo Ching');
/*!40000 ALTER TABLE `tblbranch` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `tblcat` WRITE;
/*!40000 ALTER TABLE `tblcat` DISABLE KEYS */;
INSERT INTO `tblcat` VALUES (4,'  The Client is allowed to visit and use the gym equipment in all of our branches nationwide','Interbranch',1,'2018-09-27','Carlo Ching'),(5,'Exclusive on one of our branches','Exclusive',1,'2018-09-27','Carlo Ching'),(6,'ansjkdnasd','Provincial',2,'2018-09-29','Carlo Ching');
/*!40000 ALTER TABLE `tblcat` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblchange`
--

LOCK TABLES `tblchange` WRITE;
/*!40000 ALTER TABLE `tblchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblchange` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblclass`
--

LOCK TABLES `tblclass` WRITE;
/*!40000 ALTER TABLE `tblclass` DISABLE KEYS */;
INSERT INTO `tblclass` VALUES (5,'Yoga','Stretching, breathing, meditation, and flexibility exercises',1,'2018-09-27','Carlo Ching'),(6,'Zumba','Zumba is a fitness program that combines Latin and international music with dance moves. Zumba routines incorporate interval training — alternating fast and slow rhythms — and resistance training.',1,'2018-10-10','Carlo Ching');
/*!40000 ALTER TABLE `tblclass` ENABLE KEYS */;
UNLOCK TABLES;

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
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL,
  `slot` int(11) DEFAULT NULL,
  `eventclassname` varchar(60) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `desc` text,
  `days` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`eventclassid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbleventclass`
--

LOCK TABLES `tbleventclass` WRITE;
/*!40000 ALTER TABLE `tbleventclass` DISABLE KEYS */;
INSERT INTO `tbleventclass` VALUES (1,'10/16/2018','10/17/2018','09:00:00','18:00:00',13,'Body Building',2,'Compete with bodybuilders ','',0),(2,'10/18/2018','10/18/2018','09:00:00','12:00:00',13,'MMA Meet UP',2,'Meeting with professional fighters',NULL,NULL),(5,NULL,NULL,'09:00:00','12:00:00',20,'Yoga',1,'Yoga','1,3,5',NULL),(6,NULL,NULL,'07:00:00','08:00:00',15,'Zumba',1,'Zumba','6,0',NULL);
/*!40000 ALTER TABLE `tbleventclass` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `tblfacilities` WRITE;
/*!40000 ALTER TABLE `tblfacilities` DISABLE KEYS */;
INSERT INTO `tblfacilities` VALUES (1,' Washroom',100,12,'hr'),(2,'Dance Room',150,1,'hr'),(3,'Freezing Fee',56,1,'secs');
/*!40000 ALTER TABLE `tblfacilities` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfreeze`
--

LOCK TABLES `tblfreeze` WRITE;
/*!40000 ALTER TABLE `tblfreeze` DISABLE KEYS */;
INSERT INTO `tblfreeze` VALUES (2,113,4,'2018-10-07',2,NULL,NULL,100,'2018-12-07','Unpaid');
/*!40000 ALTER TABLE `tblfreeze` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `tblgenera` WRITE;
/*!40000 ALTER TABLE `tblgenera` DISABLE KEYS */;
INSERT INTO `tblgenera` VALUES (4,'Freezing Fee',NULL,NULL,50,NULL,'Member','2018-09-27','Carlo Ching'),(5,'Session Fee',NULL,NULL,50,NULL,NULL,'2018-10-16','Carlo Ching'),(6,'Changing Membership Fee',NULL,NULL,150,NULL,NULL,NULL,NULL),(7,'Account Reactivation Fee',NULL,NULL,200,NULL,NULL,NULL,NULL),(8,'Events Fee',NULL,NULL,250,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tblgenera` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`memberid`),
  KEY `userid_idx` (`usersid`),
  KEY `membershiprateid_idx` (`membershiprateid`),
  KEY `specializationid_idx` (`specializationid`),
  KEY `promoid_idx` (`promoid`),
  CONSTRAINT `membershiprateid` FOREIGN KEY (`membershiprateid`) REFERENCES `tblmemrates` (`memrateid`),
  CONSTRAINT `promoid` FOREIGN KEY (`promoid`) REFERENCES `tblpromo` (`promoid`),
  CONSTRAINT `specializationid` FOREIGN KEY (`specializationid`) REFERENCES `tblspecial` (`specialid`),
  CONSTRAINT `usersid` FOREIGN KEY (`usersid`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmembership`
--

LOCK TABLES `tblmembership` WRITE;
/*!40000 ALTER TABLE `tblmembership` DISABLE KEYS */;
INSERT INTO `tblmembership` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,111,3,4,'2018-10-04','2018-12-04','4jdqCuq','Paid',NULL,NULL,NULL,NULL),(5,113,4,5,'2018-10-04','2018-11-04','s492xmo','Paid',NULL,NULL,NULL,NULL),(6,116,5,4,'2018-10-13','2019-04-13','KOH5eAm','Paid',NULL,NULL,NULL,NULL),(7,120,5,4,'2018-10-13','2019-04-13','LhIG2AX','Paid',9,NULL,NULL,NULL),(8,121,5,5,'2018-10-13','2019-04-13','7s167Rp','Paid',9,1235,NULL,NULL),(9,122,3,4,NULL,NULL,'bEL78TR','Pending',9,760,NULL,NULL),(10,123,5,4,NULL,NULL,'ypo8E8J','Pending',9,1235,NULL,NULL),(11,126,3,4,NULL,NULL,'Lcf2pIc','Pending',9,760,NULL,NULL),(12,127,7,4,'2017-10-16','2018-10-17','jdFTVo2','Paid',9,760,NULL,'2019-10-17'),(13,128,3,4,'2018-10-16','2018-11-16','Zt1ybDL','Paid',9,760,NULL,NULL),(14,129,3,4,'2018-10-16','2018-11-16','P5OruoE','Paid',9,760,NULL,NULL);
/*!40000 ALTER TABLE `tblmembership` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemclass`
--

LOCK TABLES `tblmemclass` WRITE;
/*!40000 ALTER TABLE `tblmemclass` DISABLE KEYS */;
INSERT INTO `tblmemclass` VALUES (1,'Gold','Member pays annually (12 months)',1,'2018-09-27','Carlo Ching'),(2,'Silver','Member pays semi-annually (6 months)',1,'2018-09-27','Carlo Ching'),(3,'Bronze','Member pays monthly',1,'2018-09-27','Carlo Ching'),(4,'Platinum','Member pays every three (3) years',1,'2018-09-27','Carlo Ching'),(5,'Diamond','Member pays every five (5) years',1,'2018-09-27','Carlo Ching'),(6,'RUBY','lifetime',2,'2018-09-28','Carlo Ching'),(7,'RUBY','LIFETIME',2,'2018-09-29','Carlo Ching');
/*!40000 ALTER TABLE `tblmemclass` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmemrates`
--

LOCK TABLES `tblmemrates` WRITE;
/*!40000 ALTER TABLE `tblmemrates` DISABLE KEYS */;
INSERT INTO `tblmemrates` VALUES (3,800,1,4,3,'2018-09-27','Carlo Ching'),(4,699,1,5,3,'2018-09-27','Carlo Ching'),(5,1300,6,4,2,'2018-09-27','Carlo Ching'),(6,1699,6,5,2,'2018-09-27','Carlo Ching'),(7,2499,12,4,1,'2018-09-27','Carlo Ching'),(8,2199,12,5,1,'2018-09-27','Carlo Ching');
/*!40000 ALTER TABLE `tblmemrates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblnotification`
--

DROP TABLE IF EXISTS `tblnotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblnotification` (
  `notifid` int(11) NOT NULL AUTO_INCREMENT,
  `notifdescid` int(11) DEFAULT NULL,
  `memid` int(11) DEFAULT NULL,
  `notifstatus` varchar(45) DEFAULT NULL,
  `notifdate` varchar(45) DEFAULT NULL,
  `sessiondate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notifid`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotification`
--

LOCK TABLES `tblnotification` WRITE;
/*!40000 ALTER TABLE `tblnotification` DISABLE KEYS */;
INSERT INTO `tblnotification` VALUES (30,3,127,'unread','2018-10-16T19:28:19+08:00',NULL),(46,9,127,'unread','2018-10-16T20:40:20+08:00',NULL);
/*!40000 ALTER TABLE `tblnotification` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblnotificationdesc`
--

LOCK TABLES `tblnotificationdesc` WRITE;
/*!40000 ALTER TABLE `tblnotificationdesc` DISABLE KEYS */;
INSERT INTO `tblnotificationdesc` VALUES (1,'a week before due date.'),(2,'four days before due date.'),(3,'Your due date is tomorrow'),(4,'Pending membership application.'),(5,'Requested to purchase sessions.'),(6,'Event you applied on is tomorrow'),(7,'Four days before event.'),(8,'Event today.'),(9,'- session\'s tomorow');
/*!40000 ALTER TABLE `tblnotificationdesc` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpayment`
--

LOCK TABLES `tblpayment` WRITE;
/*!40000 ALTER TABLE `tblpayment` DISABLE KEYS */;
INSERT INTO `tblpayment` VALUES (1,111,'2018-10-04',800,1,NULL),(2,113,'2018-10-04',699,1,NULL),(4,111,'2018-10-05',800,1,NULL),(6,113,NULL,100,2,NULL),(9,114,NULL,50,3,NULL),(10,116,'2018-10-13',1235,4,NULL),(11,120,'2018-10-13',1235,4,NULL),(12,121,'2018-10-13',1235,4,NULL),(13,122,NULL,NULL,NULL,NULL),(14,123,NULL,NULL,NULL,NULL),(15,124,'2018-10-13',NULL,4,NULL),(16,126,NULL,NULL,NULL,NULL),(17,127,'2018-10-14',760,4,NULL),(20,127,'2018-10-14',5000,5,NULL),(21,127,'2018-10-14',5000,5,NULL),(22,128,'2018-10-16',760,4,NULL),(23,127,'2018-10-17',50,5,NULL),(24,127,'2018-10-17',50,5,NULL),(25,127,'2018-10-17',150,6,NULL),(26,127,'2018-10-17',50,2,NULL),(27,127,'2018-10-17',50,2,NULL),(28,127,'2018-10-17',150,6,NULL),(29,127,'2018-10-17',150,6,NULL),(30,129,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tblpayment` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `tblprogram` WRITE;
/*!40000 ALTER TABLE `tblprogram` DISABLE KEYS */;
INSERT INTO `tblprogram` VALUES (1,'boxing','suntukan'),(2,'taekwando','sipaan'),(3,'MMA','mixed martial arts'),(4,'Brazillian Jujitsu','Grappling and Take Downs');
/*!40000 ALTER TABLE `tblprogram` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpromo`
--

LOCK TABLES `tblpromo` WRITE;
/*!40000 ALTER TABLE `tblpromo` DISABLE KEYS */;
INSERT INTO `tblpromo` VALUES (9,'Christmas Promo','2018-08-01','2018-12-15',5,'Active',1,'Non-Member','2018-10-13','Carlo Ching','Promo During Christmas season , all mmebership fees are off by 5%');
/*!40000 ALTER TABLE `tblpromo` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsession`
--

LOCK TABLES `tblsession` WRITE;
/*!40000 ALTER TABLE `tblsession` DISABLE KEYS */;
INSERT INTO `tblsession` VALUES (1,10,10,NULL,NULL),(2,20,20,NULL,NULL),(3,30,30,NULL,NULL),(4,101,93,NULL,NULL),(5,1,1,NULL,NULL),(6,1,1,NULL,NULL);
/*!40000 ALTER TABLE `tblsession` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `tblspecial` WRITE;
/*!40000 ALTER TABLE `tblspecial` DISABLE KEYS */;
INSERT INTO `tblspecial` VALUES (4,'Strength Training','This training focuses on raw strength.',1),(5,'Buff Up','Focusing Buffing Muscles for Competitions',1);
/*!40000 ALTER TABLE `tblspecial` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltrainer`
--

LOCK TABLES `tbltrainer` WRITE;
/*!40000 ALTER TABLE `tbltrainer` DISABLE KEYS */;
INSERT INTO `tbltrainer` VALUES (1,'John','Vincents','12345',NULL,'09183413801','male','Monday, Tuesday, Wednesday, Thursday, Friday','10/23/1996',5,4,NULL,'vincent','john@gmail.com','Manila City','Regular',NULL,NULL),(2,'John','Harvey','12345',NULL,'09123456789','Male','Tuesday, Thursday','10/23/1996',5,5,NULL,'harvs','harvs@gmail.com','Manila city','Freelance','08:00:00','18:00:00');
/*!40000 ALTER TABLE `tbltrainer` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluce`
--

LOCK TABLES `tbluce` WRITE;
/*!40000 ALTER TABLE `tbluce` DISABLE KEYS */;
INSERT INTO `tbluce` VALUES (3,2,128),(5,2,127);
/*!40000 ALTER TABLE `tbluce` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

LOCK TABLES `tbluser` WRITE;
/*!40000 ALTER TABLE `tbluser` DISABLE KEYS */;
INSERT INTO `tbluser` VALUES (9,NULL,'Carlo','Ching','admin','12345',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(97,5,'Vince','Oreta','vince@gmail.com','12345',4,NULL,'09176739472',NULL,NULL,NULL,NULL,'vincevince','2018-09-26','Carlo Ching','Active'),(111,NULL,'Conor ','Mcgregor','conor@gmail.com','12345',2,NULL,'09123456789','45 Goyo Street Sampaloc Manila','male',NULL,'09/21/1987','notorious',NULL,NULL,NULL),(113,5,'Jon','Jones','Jones@gmail.com','12345',2,NULL,'09123456789','189 Maria Street Sampaloc Manila','male',NULL,'11/16/1989','bones',NULL,NULL,NULL),(114,NULL,'Anderson','Silva',NULL,NULL,NULL,NULL,'09123456789',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(115,NULL,'Justine ','Espin','justine@gmail.com',NULL,4,NULL,'09123456789',NULL,NULL,NULL,NULL,'justine','2018-10-10','Carlo Ching','Inactive'),(116,NULL,'Tj','Dillashaw','tj@gmail.com','12345',2,NULL,'09123456789','57 Ibarra St Sampaloc Manila','Male',NULL,'08/24/1990','dillashaw',NULL,NULL,NULL),(119,5,'Roy','Nelson','Roy@gmail.com',NULL,2,NULL,'09123456789','81 Macaraig Street  Sampaloc Manila','Male',NULL,'06/23/1990','roynelson',NULL,NULL,NULL),(120,NULL,'Mark ','Hunt','mark@gmail.com','12345',2,NULL,'09123456789','52 Tiago Street Sampaloc Manila','Male',NULL,'02/13/1990','mark',NULL,NULL,NULL),(121,NULL,'Max','Holloway','Max@gmail.com','12345',2,NULL,'09123456789','51 Macaraig Street Makati City','Male',NULL,'07/27/1990','maxh',NULL,NULL,NULL),(122,NULL,'Chael ','Sonnen','chael@gmail.com',NULL,2,NULL,'09123456789','51 Macaraig Street Sampaloc Manila','Male',NULL,'03/22/1990','Chael',NULL,NULL,NULL),(123,NULL,'Khabib','Nurmagomedov','Eagle@gmail.com',NULL,2,NULL,'09123456789','51 Sisa Street Sampaloc Manila','Male',NULL,'07/19/1980','Eagle',NULL,NULL,NULL),(124,5,'John','Henson','hens@gmail.com','12345',2,NULL,'09123456789','87 Ginto Street Samplaoc Manila','Male',NULL,'03/11/89','heneson',NULL,NULL,NULL),(125,5,'Nate','Diaz','nate@gmail.com','12345',2,NULL,'09123456789','25 Golden Street Sampaloc Manila','Male',NULL,'03/11/87','natediaz',NULL,NULL,NULL),(126,NULL,'Skip','Bayless','skip@gmail.com',NULL,2,NULL,'09123456789','57 Silver Street Makati City','Male',NULL,'02/20/1980','skipp',NULL,NULL,NULL),(127,NULL,'Angelica','Dollesin','angelica@gmail','12345',2,NULL,'09999999999','Padilla Antipolo','Female',NULL,'06/06/1997','angel',NULL,NULL,NULL),(128,NULL,'Crisaldo','Santos','crisaldo@santos','crisaldo',2,NULL,'09999999999','Paco Manila','Male',NULL,'01/22/1999','crisaldo',NULL,NULL,NULL),(129,NULL,'Jonalyn','Ebrada','jona@gmail.com','12345',2,NULL,'09999999999','Paco Manila','Male',NULL,'12/09/1999','jona',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbluser` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbppt`
--

LOCK TABLES `tbppt` WRITE;
/*!40000 ALTER TABLE `tbppt` DISABLE KEYS */;
INSERT INTO `tbppt` VALUES (1,127,2,1,NULL,NULL,NULL,4,NULL,NULL),(2,120,2,1,NULL,NULL,NULL,5,NULL,NULL),(3,127,2,1,'2018-10-17','08:00 am',NULL,4,1,NULL),(4,127,2,1,'2018-10-14','08:00 am',NULL,4,0,NULL),(5,127,2,1,'2018-10-15','08:00 am',NULL,4,0,'Shedule Rejected. Prefers Oct 17.'),(6,127,2,1,'2018-10-22','08:00 am',NULL,4,1,NULL),(7,127,2,1,'2018-10-23','08:00 am',NULL,4,1,NULL),(8,127,2,1,'2018-10-24','08:00 am',NULL,4,1,NULL),(9,127,2,1,'2018-10-21','09:00 am',NULL,4,1,NULL),(10,127,2,1,'2018-10-21','10:00 am',NULL,4,1,NULL),(11,127,2,1,'2018-10-15','09:00 am',NULL,4,0,NULL),(12,128,2,1,NULL,NULL,NULL,6,NULL,NULL),(13,127,2,1,'2018-10-22','09:00 am',NULL,4,1,NULL);
/*!40000 ALTER TABLE `tbppt` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-17  3:40:58
