-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2018 at 03:17 PM
-- Server version: 5.7.14-log
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `setup`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblbranch`
--

CREATE TABLE `tblbranch` (
  `branchID` int(11) NOT NULL,
  `branchname` varchar(45) DEFAULT NULL,
  `branchstreetname` varchar(100) DEFAULT NULL,
  `branchcity` varchar(100) DEFAULT NULL,
  `user` varchar(70) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblbranch`
--

INSERT INTO `tblbranch` (`branchID`, `branchname`, `branchstreetname`, `branchcity`, `user`, `Dateadded`, `addedby`) VALUES
(5, ' A-team Marikina', '  Concepcion St', '         Marikina City', NULL, '2018-09-27', 'Carlo Ching'),
(6, 'A-Team Sta Mesa', 'Paco St.', '      Manila City', ' Vince Oreta', '2018-09-27', 'Carlo Ching'),
(9, 'A-Team Cebu', '38 Blk 42 Tanod St', 'Cebu City', NULL, '2018-09-27', 'Carlo Ching'),
(10, 'A-Team Eastwood', 'Eastwood St', 'Quezon City', NULL, '2018-09-27', 'Carlo Ching'),
(12, 'A-team Quezon City', '56 Macapagal St', 'Quezon City', NULL, '2018-09-29', 'Carlo Ching');

-- --------------------------------------------------------

--
-- Table structure for table `tblcat`
--

CREATE TABLE `tblcat` (
  `membershipID` int(11) NOT NULL,
  `membershipdesc` varchar(200) DEFAULT NULL,
  `membershipname` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblcat`
--

INSERT INTO `tblcat` (`membershipID`, `membershipdesc`, `membershipname`, `status`, `Dateadded`, `addedby`) VALUES
(4, '  The Client is allowed to visit and use the gym equipment in all of our branches nationwide', 'Interbranch', 1, '2018-09-27', 'Carlo Ching'),
(5, 'Exclusive on one of our branches', 'Exclusive', 1, '2018-09-27', 'Carlo Ching'),
(6, 'ansjkdnasd', 'Provincial', 2, '2018-09-29', 'Carlo Ching');

-- --------------------------------------------------------

--
-- Table structure for table `tblclass`
--

CREATE TABLE `tblclass` (
  `classID` int(11) NOT NULL,
  `classname` varchar(45) NOT NULL,
  `classdesc` varchar(200) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblclass`
--

INSERT INTO `tblclass` (`classID`, `classname`, `classdesc`, `status`, `Dateadded`, `addedby`) VALUES
(5, 'Yoga', 'Stretching and exercise', 1, '2018-09-27', 'Carlo Ching');

-- --------------------------------------------------------

--
-- Table structure for table `tbleventclass`
--

CREATE TABLE `tbleventclass` (
  `eventclassid` int(11) NOT NULL,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL,
  `slot` int(11) DEFAULT NULL,
  `eventclassname` varchar(60) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbleventclass`
--

INSERT INTO `tbleventclass` (`eventclassid`, `startdate`, `enddate`, `starttime`, `endtime`, `slot`, `eventclassname`, `type`, `desc`) VALUES
(1, '08/31/2018', '09/01/2018', '09:00:00', '18:00:00', 13, 'Body Building', 2, 'Compete with bodybuilders '),
(2, '09/07/2018', '09/28/2018', '04:00:00', '22:00:00', 15, 'MMA Meet UP', 2, 'Meeting with professional fighters'),
(3, '', NULL, '04:00:00', '05:00:00', 19, 'Zumba', 1, 'Zumba bida 2018');

-- --------------------------------------------------------

--
-- Table structure for table `tblfacilities`
--

CREATE TABLE `tblfacilities` (
  `facilitiesID` int(11) NOT NULL,
  `facilitiesname` varchar(45) NOT NULL,
  `fee` int(11) NOT NULL,
  `period` int(11) DEFAULT NULL,
  `UOM` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblfacilities`
--

INSERT INTO `tblfacilities` (`facilitiesID`, `facilitiesname`, `fee`, `period`, `UOM`) VALUES
(1, ' Washroom', 100, 12, 'hr'),
(2, 'Dance Room', 150, 1, 'hr'),
(3, 'Freezing Fee', 56, 1, 'secs');

-- --------------------------------------------------------

--
-- Table structure for table `tblfreeze`
--

CREATE TABLE `tblfreeze` (
  `freezeid` int(11) NOT NULL,
  `userfid` int(11) DEFAULT NULL,
  `genid` int(11) DEFAULT NULL,
  `datefrozen` date DEFAULT NULL,
  `freezedmonths` int(11) DEFAULT NULL,
  `unfreezedate` date DEFAULT NULL,
  `minus` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `freezeduntil` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblgenera`
--

CREATE TABLE `tblgenera` (
  `generalID` int(11) NOT NULL,
  `genname` varchar(70) DEFAULT NULL,
  `genperiod` int(11) DEFAULT NULL,
  `UOM` varchar(50) DEFAULT NULL,
  `fee` float DEFAULT NULL,
  `description` text,
  `type` varchar(45) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblgenera`
--

INSERT INTO `tblgenera` (`generalID`, `genname`, `genperiod`, `UOM`, `fee`, `description`, `type`, `Dateadded`, `addedby`) VALUES
(4, 'Freezing Fee', NULL, 'Month', 50, NULL, 'Member', '2018-09-27', 'Carlo Ching');

-- --------------------------------------------------------

--
-- Table structure for table `tblmembershippayment`
--

CREATE TABLE `tblmembershippayment` (
  `paymentid` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `membershipid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblmemclass`
--

CREATE TABLE `tblmemclass` (
  `memclassid` int(11) NOT NULL,
  `memclassname` varchar(45) DEFAULT NULL,
  `memclassdesc` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblmemclass`
--

INSERT INTO `tblmemclass` (`memclassid`, `memclassname`, `memclassdesc`, `status`, `Dateadded`, `addedby`) VALUES
(1, 'GOLD', ' The client pays annually', 1, '2018-09-27', 'Carlo Ching'),
(2, 'SILVER', ' Client Pays Semi-Annually', 1, '2018-09-27', 'Carlo Ching'),
(3, 'BRONZE', 'Client Pays Monthly', 1, '2018-09-27', 'Carlo Ching'),
(4, 'PLATINUM', ' The client cay pay every 3 years', 1, '2018-09-27', 'Carlo Ching'),
(5, 'DIAMOND', 'Every 5 years mode of payment', 1, '2018-09-27', 'Carlo Ching'),
(6, 'RUBY', 'lifetime', 2, '2018-09-28', 'Carlo Ching'),
(7, 'RUBY', 'LIFETIME', 2, '2018-09-29', 'Carlo Ching');

-- --------------------------------------------------------

--
-- Table structure for table `tblmemrates`
--

CREATE TABLE `tblmemrates` (
  `memrateid` int(11) NOT NULL,
  `memfee` int(11) DEFAULT NULL,
  `memperiod` int(11) DEFAULT NULL,
  `memcat` int(11) DEFAULT NULL,
  `memclass` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblmemrates`
--

INSERT INTO `tblmemrates` (`memrateid`, `memfee`, `memperiod`, `memcat`, `memclass`, `Dateadded`, `addedby`) VALUES
(3, 800, 1, 4, 3, '2018-09-27', 'Carlo Ching'),
(4, 699, 1, 5, 3, '2018-09-27', 'Carlo Ching'),
(5, 1300, 6, 4, 2, '2018-09-27', 'Carlo Ching'),
(6, 1699, 6, 5, 2, '2018-09-27', 'Carlo Ching'),
(7, 2499, 12, 4, 1, '2018-09-27', 'Carlo Ching'),
(8, 2199, 12, 5, 1, '2018-09-27', 'Carlo Ching');

-- --------------------------------------------------------

--
-- Table structure for table `tblnotifications`
--

CREATE TABLE `tblnotifications` (
  `intNotifID` int(11) NOT NULL,
  `strNotifType` varchar(45) NOT NULL,
  `txtNotifContent` longtext NOT NULL,
  `datNotifInstance` date NOT NULL,
  `intuserid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tblprogram`
--

CREATE TABLE `tblprogram` (
  `progid` int(11) NOT NULL,
  `progname` varchar(45) NOT NULL,
  `progdesc` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblprogram`
--

INSERT INTO `tblprogram` (`progid`, `progname`, `progdesc`) VALUES
(1, 'boxing', 'suntukan'),
(2, 'taekwando', 'sipaan'),
(3, 'MMA', 'mixed martial arts'),
(4, 'Brazillian Jujitsu', 'Grappling and Take Downs');

-- --------------------------------------------------------

--
-- Table structure for table `tblpromo`
--

CREATE TABLE `tblpromo` (
  `promoID` int(11) NOT NULL,
  `promoname` varchar(45) DEFAULT NULL,
  `startdate` varchar(45) DEFAULT NULL,
  `enddate` varchar(45) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `statusback` int(11) DEFAULT NULL,
  `promotype` varchar(45) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `Addedby` varchar(70) DEFAULT NULL,
  `description` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblpromo`
--

INSERT INTO `tblpromo` (`promoID`, `promoname`, `startdate`, `enddate`, `discount`, `status`, `statusback`, `promotype`, `Dateadded`, `Addedby`, `description`) VALUES
(4, '  Summer Promo', '  08/11/2018', '  08/18/2018', 5, 'Active', 2, NULL, NULL, NULL, NULL),
(5, 'Ramadan Promo', '04/11/2018', '04/28/2018', 10, 'Active', 2, NULL, NULL, NULL, NULL),
(6, 'Spooky Promo', '10/29/2018', '10/31/2018', 35, 'Inactive', 2, NULL, NULL, NULL, NULL),
(7, '   gay promo', '   06/09/2019', '   06/29/2019', 5, 'Inactive', 2, NULL, NULL, NULL, NULL),
(8, 'Christmas Promo', '12/01/2018', '12/27/2018', 5, 'Inactive', 1, 'Non-Member', '2018-09-26', 'Carlo Ching', 'Upon Registration this promo will apply');

-- --------------------------------------------------------

--
-- Table structure for table `tblsession`
--

CREATE TABLE `tblsession` (
  `sessionID` int(11) NOT NULL,
  `session_count` int(11) DEFAULT NULL,
  `sessionForSched` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblsession`
--

INSERT INTO `tblsession` (`sessionID`, `session_count`, `sessionForSched`) VALUES
(1, 10, 10),
(2, 20, 20),
(3, 30, 30);

-- --------------------------------------------------------

--
-- Table structure for table `tblspecial`
--

CREATE TABLE `tblspecial` (
  `specialID` int(11) NOT NULL,
  `specialname` varchar(45) DEFAULT NULL,
  `specialdesc` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblspecial`
--

INSERT INTO `tblspecial` (`specialID`, `specialname`, `specialdesc`, `status`) VALUES
(4, 'Strength Training', 'This training focuses on raw strength.', 1),
(5, 'Buff Up', 'Focusing Buffing Muscles for Competitions', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbltrainer`
--

CREATE TABLE `tbltrainer` (
  `trainerid` int(11) NOT NULL,
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
  `trainertimeend` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbltrainer`
--

INSERT INTO `tbltrainer` (`trainerid`, `trainerfname`, `trainerlname`, `trainerpassword`, `profile`, `trainermobile`, `trainergender`, `trainerschedule`, `trainerbday`, `trainerbranch`, `trainerspecialization`, `status`, `trainerusername`, `traineremail`, `traineraddress`, `type`, `trainertimestart`, `trainertimeend`) VALUES
(1, 'John', 'Vincent', '12345', NULL, '09183413801', 'Male', 'Monday,Tuesday,Wednesday,Thursday,Friday', '10/23/1996', 6, 5, NULL, 'vangough', 'john@gmail.com', 'Manila City', 'Regular', NULL, NULL),
(2, 'John', 'Harvey', '12345', NULL, '09123456789', 'Male', 'Tuesday,Thursday', '10/23/1996', 5, 5, NULL, 'harvs', 'harvs@gmail.com', 'Manila city', 'Freelance', '08:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbluce`
--

CREATE TABLE `tbluce` (
  `intUCEID` int(11) NOT NULL,
  `intUCEClassID` int(11) DEFAULT NULL,
  `intUCEUserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbluce`
--

INSERT INTO `tbluce` (`intUCEID`, `intUCEClassID`, `intUCEUserID`) VALUES
(4, 3, 84);

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
  `userid` int(11) NOT NULL,
  `userfname` varchar(45) DEFAULT NULL,
  `userlname` varchar(45) DEFAULT NULL,
  `useremail` varchar(100) DEFAULT NULL,
  `userpassword` varchar(20) DEFAULT NULL,
  `usertype` int(11) DEFAULT NULL,
  `profile` varchar(150) DEFAULT NULL,
  `branch` int(11) DEFAULT NULL,
  `usermobile` varchar(45) DEFAULT NULL,
  `useraddress` varchar(100) DEFAULT NULL,
  `usergender` varchar(45) DEFAULT NULL,
  `userschedule` varchar(100) DEFAULT NULL,
  `userbday` varchar(50) DEFAULT NULL,
  `specialization` int(11) DEFAULT NULL,
  `statusfront` varchar(45) DEFAULT NULL,
  `userusername` varchar(45) DEFAULT NULL,
  `memrateid` int(11) DEFAULT NULL,
  `paymentcode` varchar(45) DEFAULT NULL,
  `signdate` date DEFAULT NULL,
  `expiry` date DEFAULT NULL,
  `recentpay` date DEFAULT NULL,
  `tblusercol` varchar(45) DEFAULT NULL,
  `PTid` int(11) DEFAULT NULL,
  `Dateadded` date DEFAULT NULL,
  `addedby` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`userid`, `userfname`, `userlname`, `useremail`, `userpassword`, `usertype`, `profile`, `branch`, `usermobile`, `useraddress`, `usergender`, `userschedule`, `userbday`, `specialization`, `statusfront`, `userusername`, `memrateid`, `paymentcode`, `signdate`, `expiry`, `recentpay`, `tblusercol`, `PTid`, `Dateadded`, `addedby`) VALUES
(9, 'Carlo', 'Ching', 'admin', '12345', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(84, 'Will', 'Smith', 'joshuaburnay@gmail.com', '12345', 2, NULL, NULL, '+6399564987451', 'Bel-Air , Beverly Hills', 'male', NULL, '', 4, 'Active', 'FLY', 7, 'RZ8zWcF', '2018-08-30', '2020-09-03', '2018-08-30', NULL, NULL, NULL, NULL),
(85, 'Tom', ' Jones', 'tlovince14@gmail.com', '12345', 2, NULL, 6, '+639321457897', 'California, USA', 'male', NULL, '06/07/1940', 4, 'Active', 'Tom', 8, 'NWfq970', '2018-08-31', '2019-08-31', NULL, NULL, NULL, NULL, NULL),
(91, 'Hillary', 'Banks', 'daniellecasadores09@gmail.com', '12345', 2, NULL, NULL, '+639321456789', 'Bel-Air , Beverly Hills', 'female', NULL, '01/24/1979', 4, 'Active', 'Hillary', 3, 'Kh630Ep', '2018-08-31', '2018-09-30', NULL, NULL, NULL, NULL, NULL),
(93, 'Carlton', 'Banks', 'daniellecasadores09@gmail.com', NULL, 2, NULL, 5, '09321456789', 'Concepcion St   Marikina City', 'male', NULL, '01/24/1979', 4, NULL, 'Carlton', 4, 'OIMoQ06', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(96, 'Kelly', 'Gallardo', 'joshuaburnay@gmail.com', '12345', 2, NULL, NULL, '09564343231', 'Wawa Street Manila', 'female', NULL, '07/22/1982', 4, 'Active', 'Kelly', 5, '47N6DG1', '2018-09-22', '2019-03-22', NULL, NULL, NULL, NULL, NULL),
(97, 'Vince', 'Oreta', 'vince@gmail.com', '12345', 4, NULL, 6, '09176739472', NULL, NULL, NULL, NULL, NULL, 'Active', 'vincevince', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-26', 'Carlo Ching'),
(98, 'Spencer', 'Viden', 'viden@gmail.com', '12345', 2, NULL, 6, '09123456789', 'Manila City', 'Male', NULL, '08/19/1992', 5, 'Active', 'viden', 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(99, 'Karl', 'Marx', 'karl@gmail.com', '12345', 2, NULL, 6, '09123456789', 'Manila City', 'Male', NULL, '07/04/1990', 4, 'Active', 'karl', 4, NULL, '2018-09-29', '2018-10-29', NULL, NULL, NULL, NULL, NULL),
(100, 'Rafhael', 'Pabustan', 'rafhpabustan@gmail.com', '12345', 2, NULL, 5, '09999999999', 'Padilla Antipolo', 'male', NULL, '07/05/1999', 4, 'Active', 'rafh', 6, '7I7Td0d', '2018-09-29', '2019-03-29', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbppt`
--

CREATE TABLE `tbppt` (
  `PTid` int(11) NOT NULL,
  `memid` int(11) DEFAULT NULL,
  `trainid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `sessionDate` varchar(45) DEFAULT NULL,
  `sessionTime` varchar(45) DEFAULT NULL,
  `changeID` int(11) DEFAULT NULL,
  `sessionID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbppt`
--

INSERT INTO `tbppt` (`PTid`, `memid`, `trainid`, `status`, `sessionDate`, `sessionTime`, `changeID`, `sessionID`) VALUES
(1, 84, 2, NULL, '2018-09-03', '8:00 am', NULL, 1),
(2, 84, 2, NULL, '2018-09-05', '9:00 am', NULL, 1),
(3, 95, 2, NULL, '2018-09-06', '10:00 am', NULL, 2),
(4, 85, 2, NULL, '2018-09-07', '11:00 am', NULL, 3),
(5, NULL, NULL, NULL, '', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblbranch`
--
ALTER TABLE `tblbranch`
  ADD PRIMARY KEY (`branchID`),
  ADD KEY `user_idx` (`user`);

--
-- Indexes for table `tblcat`
--
ALTER TABLE `tblcat`
  ADD PRIMARY KEY (`membershipID`);

--
-- Indexes for table `tblclass`
--
ALTER TABLE `tblclass`
  ADD PRIMARY KEY (`classID`);

--
-- Indexes for table `tbleventclass`
--
ALTER TABLE `tbleventclass`
  ADD PRIMARY KEY (`eventclassid`);

--
-- Indexes for table `tblfacilities`
--
ALTER TABLE `tblfacilities`
  ADD PRIMARY KEY (`facilitiesID`);

--
-- Indexes for table `tblfreeze`
--
ALTER TABLE `tblfreeze`
  ADD PRIMARY KEY (`freezeid`),
  ADD KEY `userfid_idx` (`userfid`),
  ADD KEY `genid_idx` (`genid`);

--
-- Indexes for table `tblgenera`
--
ALTER TABLE `tblgenera`
  ADD PRIMARY KEY (`generalID`);

--
-- Indexes for table `tblmembershippayment`
--
ALTER TABLE `tblmembershippayment`
  ADD PRIMARY KEY (`paymentid`),
  ADD KEY `userid_idx` (`userid`),
  ADD KEY `membershipid_idx` (`membershipid`);

--
-- Indexes for table `tblmemclass`
--
ALTER TABLE `tblmemclass`
  ADD PRIMARY KEY (`memclassid`);

--
-- Indexes for table `tblmemrates`
--
ALTER TABLE `tblmemrates`
  ADD PRIMARY KEY (`memrateid`),
  ADD KEY `memcat_idx` (`memcat`),
  ADD KEY `memclass_idx` (`memclass`);

--
-- Indexes for table `tblnotifications`
--
ALTER TABLE `tblnotifications`
  ADD PRIMARY KEY (`intNotifID`),
  ADD KEY `userid_idx` (`intuserid`);

--
-- Indexes for table `tblprogram`
--
ALTER TABLE `tblprogram`
  ADD PRIMARY KEY (`progid`);

--
-- Indexes for table `tblpromo`
--
ALTER TABLE `tblpromo`
  ADD PRIMARY KEY (`promoID`);

--
-- Indexes for table `tblsession`
--
ALTER TABLE `tblsession`
  ADD PRIMARY KEY (`sessionID`);

--
-- Indexes for table `tblspecial`
--
ALTER TABLE `tblspecial`
  ADD PRIMARY KEY (`specialID`);

--
-- Indexes for table `tbltrainer`
--
ALTER TABLE `tbltrainer`
  ADD PRIMARY KEY (`trainerid`),
  ADD KEY `branch_idx` (`trainerbranch`),
  ADD KEY `specialization_idx` (`trainerspecialization`);

--
-- Indexes for table `tbluce`
--
ALTER TABLE `tbluce`
  ADD UNIQUE KEY `intUCEID_UNIQUE` (`intUCEID`),
  ADD KEY `intUCEUserID_idx` (`intUCEUserID`),
  ADD KEY `intUCEClassID_idx` (`intUCEClassID`);

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `branch_idx` (`branch`),
  ADD KEY `specialization_idx` (`specialization`),
  ADD KEY `memrateid_idx` (`memrateid`),
  ADD KEY `trainid_idx` (`PTid`);

--
-- Indexes for table `tbppt`
--
ALTER TABLE `tbppt`
  ADD PRIMARY KEY (`PTid`),
  ADD KEY `memid_idx` (`memid`),
  ADD KEY `trainid_idx` (`trainid`),
  ADD KEY `sessionID_idx` (`sessionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblbranch`
--
ALTER TABLE `tblbranch`
  MODIFY `branchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `tblcat`
--
ALTER TABLE `tblcat`
  MODIFY `membershipID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tblclass`
--
ALTER TABLE `tblclass`
  MODIFY `classID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbleventclass`
--
ALTER TABLE `tbleventclass`
  MODIFY `eventclassid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tblfacilities`
--
ALTER TABLE `tblfacilities`
  MODIFY `facilitiesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tblfreeze`
--
ALTER TABLE `tblfreeze`
  MODIFY `freezeid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tblgenera`
--
ALTER TABLE `tblgenera`
  MODIFY `generalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tblmembershippayment`
--
ALTER TABLE `tblmembershippayment`
  MODIFY `paymentid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tblmemclass`
--
ALTER TABLE `tblmemclass`
  MODIFY `memclassid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tblmemrates`
--
ALTER TABLE `tblmemrates`
  MODIFY `memrateid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tblnotifications`
--
ALTER TABLE `tblnotifications`
  MODIFY `intNotifID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tblprogram`
--
ALTER TABLE `tblprogram`
  MODIFY `progid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tblpromo`
--
ALTER TABLE `tblpromo`
  MODIFY `promoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tblspecial`
--
ALTER TABLE `tblspecial`
  MODIFY `specialID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbltrainer`
--
ALTER TABLE `tbltrainer`
  MODIFY `trainerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbluce`
--
ALTER TABLE `tbluce`
  MODIFY `intUCEID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `tbppt`
--
ALTER TABLE `tbppt`
  MODIFY `PTid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblfreeze`
--
ALTER TABLE `tblfreeze`
  ADD CONSTRAINT `genid` FOREIGN KEY (`genid`) REFERENCES `tblgenera` (`generalID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userfid` FOREIGN KEY (`userfid`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblmembershippayment`
--
ALTER TABLE `tblmembershippayment`
  ADD CONSTRAINT `membershipid` FOREIGN KEY (`membershipid`) REFERENCES `tblmemrates` (`memrateid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblmemrates`
--
ALTER TABLE `tblmemrates`
  ADD CONSTRAINT `memcat` FOREIGN KEY (`memcat`) REFERENCES `tblcat` (`membershipID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `memclass` FOREIGN KEY (`memclass`) REFERENCES `tblmemclass` (`memclassid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblnotifications`
--
ALTER TABLE `tblnotifications`
  ADD CONSTRAINT `intuserid` FOREIGN KEY (`intuserid`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbltrainer`
--
ALTER TABLE `tbltrainer`
  ADD CONSTRAINT `trainerbranch` FOREIGN KEY (`trainerbranch`) REFERENCES `tblbranch` (`branchID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `trainerspecialization` FOREIGN KEY (`trainerspecialization`) REFERENCES `tblspecial` (`specialID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbluce`
--
ALTER TABLE `tbluce`
  ADD CONSTRAINT `intUCEClassID` FOREIGN KEY (`intUCEClassID`) REFERENCES `tbleventclass` (`eventclassid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `intUCEUserID` FOREIGN KEY (`intUCEUserID`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD CONSTRAINT `PTid` FOREIGN KEY (`PTid`) REFERENCES `tbppt` (`PTid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `branch` FOREIGN KEY (`branch`) REFERENCES `tblbranch` (`branchID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `memrateid` FOREIGN KEY (`memrateid`) REFERENCES `tblmemrates` (`memrateid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `specialization` FOREIGN KEY (`specialization`) REFERENCES `tblspecial` (`specialID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbppt`
--
ALTER TABLE `tbppt`
  ADD CONSTRAINT `memid` FOREIGN KEY (`memid`) REFERENCES `tbluser` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sessionID` FOREIGN KEY (`sessionID`) REFERENCES `tblsession` (`sessionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `trainid` FOREIGN KEY (`trainid`) REFERENCES `tbltrainer` (`trainerid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
