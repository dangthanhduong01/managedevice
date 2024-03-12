-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: managedevice
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(225) NOT NULL,
  `model` varchar(225) NOT NULL,
  `serial` varchar(225) NOT NULL,
  `cauhinh` varchar(225) NOT NULL,
  `ip` varchar(225) NOT NULL,
  `quanli` varchar(225) NOT NULL,
  `mucdich` varchar(225) NOT NULL,
  `hientrang` varchar(225) NOT NULL,
  `loaithietbi` int DEFAULT NULL,
  `lichsu` varchar(225) NOT NULL,
  `ghichu` varchar(225) NOT NULL,
  `isdel` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,'thiet bij','momemnt','asd','asd','1.1.1.1','ad','sad','chon cai khac',1,'da suw dunjg vafo ngay 20/12','g',0),(2,'tb2','wewe','asd','fdf','1.1.1.1','er','fdfd','khac',2,'ada','g',0),(3,'tb3','wewe','adac','acc','192.168.2.1','ew','adss','dsf',2,'fasd','ad',0),(4,'','','','','','','','',1,'cv','df',1),(5,'dwqee','wewe','eqwe','qeq','1.1.0.2','ad','asd','',1,'d','ewe',0);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsu`
--

DROP TABLE IF EXISTS `lichsu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichsu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chitiet` varchar(225) DEFAULT NULL,
  `id_thietbi` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsu`
--

LOCK TABLES `lichsu` WRITE;
/*!40000 ALTER TABLE `lichsu` DISABLE KEYS */;
INSERT INTO `lichsu` VALUES (1,'đã sử dụng ngày ',1),(2,'/đã test ngày ',1),(3,'test them',1),(4,'sua',1),(5,'llk',2),(6,'ád',2),(7,'sua2',1),(8,'them 1',1),(9,'add',1),(10,'new22',1),(11,'ádsd',1),(12,'asd',1),(13,'nnnn',1);
/*!40000 ALTER TABLE `lichsu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaithietbi`
--

DROP TABLE IF EXISTS `loaithietbi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaithietbi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenloai` varchar(225) NOT NULL,
  `loai` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaithietbi`
--

LOCK TABLES `loaithietbi` WRITE;
/*!40000 ALTER TABLE `loaithietbi` DISABLE KEYS */;
INSERT INTO `loaithietbi` VALUES (1,'thiet bi mang',1),(2,'Thiet bi ATTT',1),(3,'Thietbikhac',1),(4,'Phan mem attt',2),(5,'Phan mem thong thuong',2);
/*!40000 ALTER TABLE `loaithietbi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_device`
--

DROP TABLE IF EXISTS `pro_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pro_device` (
  `id_link` int NOT NULL AUTO_INCREMENT,
  `id_device` int DEFAULT NULL,
  `id_project` int DEFAULT NULL,
  PRIMARY KEY (`id_link`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_device`
--

LOCK TABLES `pro_device` WRITE;
/*!40000 ALTER TABLE `pro_device` DISABLE KEYS */;
INSERT INTO `pro_device` VALUES (21,1,4),(32,2,1),(43,1,5),(47,1,7),(49,2,7),(51,3,7),(53,5,1),(60,5,6),(61,1,6),(62,1,2),(63,2,2),(65,3,2),(66,5,5),(67,3,5),(69,5,4),(70,3,1),(71,1,1);
/*!40000 ALTER TABLE `pro_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_software`
--

DROP TABLE IF EXISTS `pro_software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pro_software` (
  `id_link` int NOT NULL AUTO_INCREMENT,
  `id_software` int DEFAULT NULL,
  `id_project` int DEFAULT NULL,
  PRIMARY KEY (`id_link`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_software`
--

LOCK TABLES `pro_software` WRITE;
/*!40000 ALTER TABLE `pro_software` DISABLE KEYS */;
INSERT INTO `pro_software` VALUES (1,1,1);
/*!40000 ALTER TABLE `pro_software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Adc'),(2,'ds'),(4,'as'),(5,'new1'),(6,'new'),(7,'new2');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'READ'),(2,'WRITE'),(3,'ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software`
--

DROP TABLE IF EXISTS `software`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `software` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(225) NOT NULL,
  `model` varchar(225) NOT NULL,
  `ip` varchar(225) NOT NULL,
  `mucdich` varchar(225) NOT NULL,
  `vitricaidat` varchar(225) NOT NULL,
  `hientrang` varchar(225) NOT NULL,
  `quanli` varchar(225) NOT NULL,
  `duan` varchar(225) NOT NULL,
  `isdel` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software`
--

LOCK TABLES `software` WRITE;
/*!40000 ALTER TABLE `software` DISABLE KEYS */;
INSERT INTO `software` VALUES (1,'sd','ad','1.1.1.1','ad','local','chon @@@','ad','adsa',1),(2,'2aewe','wqe','1.1.1.1','ewqe','qewe','khas2c','turyen thogn','abcxys',0);
/*!40000 ALTER TABLE `software` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'a','123',3),(2,'b','123',2),(3,'c','123',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-07 17:33:57
