-- MySQL dump for simpleform database
-- Host: localhost    Database: simpleform

-- ------------------------------------------------------
-- Table structure for table `users`
-- ------------------------------------------------------

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `description` text,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `users`
INSERT INTO `users` VALUES 
(50,'Ram','Adhikari','test@gmail.com','test123','Male','Active','Great Candidate with High Skills'),
(51,'Ram','Adikari','ram123@gmail.com','ram123','Male','Active','Great Candidate with High Skills'),
(54,'Ram','Adikari','ram1243@gmail.com','ram123','Male','Active','Great Candidate with High Skills'),
(55,'image','kafle','image@gmail.com','image123','Male','Active','Great Candidate with High Skills'),
(58,'image','kafle','image123@gmail.com','image123','Male','Active','Great Candidate with High Skills'),
(59,'Image','Kafle','admin123@gmail.com','admin123','Female','Active','xacas'),
(64,'Image','Kafle','admin1232@gmail.com','admin123','Male','Active','adsas'),
(66,'Image','Kafle','admin12334@gmail.com','admin123','Male','Inactive','adasd'),
(67,'Image','Kafle','admin1232323@gmail.com','admin123','Female','Active','aas'),
(73,'Image','Kafle','test123@gmail.com','test123','Female','Inactive','Hello Guyz\r\n'),
(75,'Image','Kafle','test12323@gmail.com','test123','Female','Inactive','dfadfdsaf'),
(76,'Image','Kafle','test12334@gmail.com','test123','Female','Inactive','adas'),
(79,'Image','Kafle','test1233434534@gmail.com','test123','Male','Active','adfas'),
(81,'Image','Kafle','test1@gmail.com','test123','Male','Inactive','l;l;l'),
(82,'Image','Kafle','admin345@gamil.com','Admin@admin123','Female','Inactive','adasdsa'),
(83,'Image','Kafle','admindasd@gamil.com','Admin@admin123','Male','Active','sacas'),
(85,'image','kafle','image12334@gmail.com','image123','Male','Active','Great Candidate with High Skills'),
(86,'Image','Kafle','admin23455@gmail.com','Admin@admin123','Other','Inactive','adas'),
(87,'Image','Kafle','admin1233443@gmail.com','admin123','Other','Inactive','rerw'),
(89,'Image','Kafle','admin@gmail.com','Admin@admin123','Female','Inactive','kmlksn'),
(90,'Image','Kafle','admin@gmaisl.cosdos','Admin@admin123','Male','Inactive','adfa'),
(91,'Image','Kafle','admin@gamidl.com','Admin@admin123','Other','Inactive','sfasdas'),
(93,'Image','Kafle','admin@gmam.com','Admin@admin123','Female','Inactive','sadsa'),
(94,'Image','Kafle','adminsd@gmail.com','Admin@admin123','Male','Active','adas'),
(95,'Image','Kafle','admin@hamd.coms','Admin@admin123','Female','Inactive','asd'),
(99,'Image','Kafle','test12312@gmail.com','test123','Female','Inactive','sadsa'),
(101,'Image','Kafle','test123566@gmail.com','test123','Female','Inactive','dfasda');

-- ------------------------------------------------------
-- Table structure for table `resumes`
-- ------------------------------------------------------

DROP TABLE IF EXISTS `resumes`;
CREATE TABLE `resumes` (
  `resume_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `resume_file` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`resume_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `resumes`
INSERT INTO `resumes` VALUES 
(5,50,'https://res.cloudinary.com/dj20jrfpz/image/upload/v1756965462/o1nrvi7keoonhyzg1yqg.jpg','2025-09-04 05:57:40'),
(6,51,'https://res.cloudinary.com/dj20jrfpz/image/upload/v1756971484/z1m7rvmlnaywthrqpt4a.jpg','2025-09-04 07:38:03'),
(7,54,'https://res.cloudinary.com/dj20jrfpz/image/upload/v1757062276/lbvco4dtzbxpdusngp64.jpg','2025-09-05 08:51:17'),
(8,95,'https://','2025-09-05 09:30:49'),
(9,55,'https://res.cloudinary.com/dj20jrfpz/image/upload/v1758606319/feutnspkgwypiukwfwfd.jpg','2025-09-23 05:45:17');

-- ------------------------------------------------------
-- Table structure for table `skills`
-- ------------------------------------------------------

DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
  `skill_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `skills`
INSERT INTO `skills` VALUES
(9,50,'NodejsReact'),
(10,51,'NodejsReact'),
(11,54,'NodejsReact'),
(12,23,'Mern'),
(13,55,'NodejsReact'),
(14,58,'NodejsReact'),
(15,59,'acas'),
(16,64,'assa'),
(17,66,'asda'),
(18,67,'dasda'),
(19,73,'This is a Skill'),
(20,75,'dfasfas'),
(21,76,'asdasda'),
(22,79,'adsadsa'),
(23,81,'lkk;kll'),
(24,82,'asdas'),
(25,83,'ascascas'),
(26,85,'NodejsReact'),
(27,86,'dsaas'),
(28,87,'ewrew'),
(29,89,'klfdfdskl'),
(30,90,'sadsa'),
(31,91,'asdsad'),
(32,93,'asdas'),
(33,94,'asd'),
(34,95,'asdsa'),
(35,99,'sdasd'),
(36,101,'sda');
