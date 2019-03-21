-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: almost
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

DROP TABLE IF EXISTS `tblbranch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tblcat`
--

DROP TABLE IF EXISTS `tblcat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcat` (
  `membershipID` int(11) NOT NULL AUTO_INCREMENT,
  `membershipdesc` varchar(200) DEFAULT NULL,
  `membershipname` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`membershipID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblchange`
--

DROP TABLE IF EXISTS `tblchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tblclass`
--

DROP TABLE IF EXISTS `tblclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblclass` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `classname` varchar(45) NOT NULL,
  `classdesc` varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbleventclass`
--

DROP TABLE IF EXISTS `tbleventclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblfacilities`
--

DROP TABLE IF EXISTS `tblfacilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tblfreeze`
--

DROP TABLE IF EXISTS `tblfreeze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  CONSTRAINT `genid` FOREIGN KEY (`genid`) REFERENCES `tblgenera` (`generalID`),
  CONSTRAINT `userfid` FOREIGN KEY (`userfid`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblgenera`
--

DROP TABLE IF EXISTS `tblgenera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tblmembership`
--

DROP TABLE IF EXISTS `tblmembership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  CONSTRAINT `promoid` FOREIGN KEY (`promoid`) REFERENCES `tblpromo` (`promoID`),
  CONSTRAINT `specializationid` FOREIGN KEY (`specializationid`) REFERENCES `tblspecial` (`specialID`),
  CONSTRAINT `usersid` FOREIGN KEY (`usersid`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblmemclass`
--

DROP TABLE IF EXISTS `tblmemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tblmemrates`
--

DROP TABLE IF EXISTS `tblmemrates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  CONSTRAINT `memcat` FOREIGN KEY (`memcat`) REFERENCES `tblcat` (`membershipID`),
  CONSTRAINT `memclass` FOREIGN KEY (`memclass`) REFERENCES `tblmemclass` (`memclassid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblnotification`
--

DROP TABLE IF EXISTS `tblnotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblnotificationdesc`
--

DROP TABLE IF EXISTS `tblnotificationdesc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblnotificationdesc` (
  `notifdescid` int(11) NOT NULL AUTO_INCREMENT,
  `notifdesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notifdescid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblnotifications`
--

DROP TABLE IF EXISTS `tblnotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tblor`
--

DROP TABLE IF EXISTS `tblor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblor` (
  `orid` int(11) NOT NULL AUTO_INCREMENT,
  `ornum` varchar(50) DEFAULT NULL,
  `dateadded` date DEFAULT NULL,
  `addedby` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orid`),
  UNIQUE KEY `ornum_UNIQUE` (`ornum`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblpayment`
--

DROP TABLE IF EXISTS `tblpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  CONSTRAINT `branchid` FOREIGN KEY (`branchid`) REFERENCES `tblbranch` (`branchID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblprogram`
--

DROP TABLE IF EXISTS `tblprogram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblprogram` (
  `progid` int(11) NOT NULL AUTO_INCREMENT,
  `progname` varchar(45) NOT NULL,
  `progdesc` varchar(200) NOT NULL,
  PRIMARY KEY (`progid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblpromo`
--

DROP TABLE IF EXISTS `tblpromo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblsession`
--

DROP TABLE IF EXISTS `tblsession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tblspecial`
--

DROP TABLE IF EXISTS `tblspecial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblspecial` (
  `specialID` int(11) NOT NULL AUTO_INCREMENT,
  `specialname` varchar(45) DEFAULT NULL,
  `specialdesc` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`specialID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbltrainer`
--

DROP TABLE IF EXISTS `tbltrainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  CONSTRAINT `trainerbranch` FOREIGN KEY (`trainerbranch`) REFERENCES `tblbranch` (`branchID`),
  CONSTRAINT `trainerspecialization` FOREIGN KEY (`trainerspecialization`) REFERENCES `tblspecial` (`specialID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbluce`
--

DROP TABLE IF EXISTS `tbluce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluce` (
  `intUCEID` int(11) NOT NULL AUTO_INCREMENT,
  `intUCEClassID` int(11) DEFAULT NULL,
  `intUCEUserID` int(11) DEFAULT NULL,
  UNIQUE KEY `intUCEID_UNIQUE` (`intUCEID`),
  KEY `intUCEUserID_idx` (`intUCEUserID`),
  KEY `intUCEClassID_idx` (`intUCEClassID`),
  CONSTRAINT `intUCEClassID` FOREIGN KEY (`intUCEClassID`) REFERENCES `tbleventclass` (`eventclassid`),
  CONSTRAINT `intUCEUserID` FOREIGN KEY (`intUCEUserID`) REFERENCES `tbluser` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  CONSTRAINT `branch` FOREIGN KEY (`branch`) REFERENCES `tblbranch` (`branchID`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tblutilities`
--

DROP TABLE IF EXISTS `tblutilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
-- Table structure for table `tbppt`
--

DROP TABLE IF EXISTS `tbppt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'almost'
--

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
