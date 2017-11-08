-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: pain
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `pain`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `pain` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `pain`;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'pain'),(3,'pâtisserie'),(2,'viennoiserie');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ingredient` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ingredient_UNIQUE` (`ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (2,'cacao'),(1,'farine de blé');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `is_a`
--

DROP TABLE IF EXISTS `is_a`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `is_a` (
  `id_prod` int(11) NOT NULL,
  `id_cat` int(11) NOT NULL,
  PRIMARY KEY (`id_prod`,`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `is_a`
--

LOCK TABLES `is_a` WRITE;
/*!40000 ALTER TABLE `is_a` DISABLE KEYS */;
INSERT INTO `is_a` VALUES (5,1);
/*!40000 ALTER TABLE `is_a` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ismadeof`
--

DROP TABLE IF EXISTS `ismadeof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ismadeof` (
  `idproduct` int(11) NOT NULL,
  `idingredient` int(11) NOT NULL,
  PRIMARY KEY (`idproduct`,`idingredient`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ismadeof`
--

LOCK TABLES `ismadeof` WRITE;
/*!40000 ALTER TABLE `ismadeof` DISABLE KEYS */;
/*!40000 ALTER TABLE `ismadeof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ingredients` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (25,'3r4324brfdbr','<p>vdsvd<strong>svd</strong>s</p>','3423sssscvdvdfbvdsbds','arcmini1.png','1'),(26,'sca','<p>sccs</p>','scs','catmini1.png','1'),(27,'33','<p>33</p>','33','invmini1c.png','1'),(28,'444','<p>&nbsp;<strong>44</strong></p>','44','pontmini1b.png','2'),(29,'55','<p>55</p>','55','peremini1b.png','2'),(30,'66','<p>66</p>','66','pompimini1c.png','3'),(31,'77','<p>77</p>','77','invmini1.png','3'),(32,'88','<p>88</p>','88','peremini1c.png','1'),(33,'99','<p>99</p>','99','pontmini1.png','3'),(34,'10','<p>10</p>','10','montmini1b.png','2'),(35,'11','<p>11</p>','11','peremini1b.png','3'),(38,'12','<p>12</p>','12','invmini1c.png','2'),(39,'13','<p>13</p>','13','louvremini1.png','1'),(40,'14','<p>14</p>','14','damemini1b.png','2'),(43,'3r4324brfdbr','<p>vdsvd<strong>svd</strong>s</p>','3423s','tourmini1.png','2'),(44,'bdfrbdf','','','damemini1.png','2'),(45,'77','<p>77</p>','77','pontmini1.png','2'),(46,'vdvds','<p>vdsvdvd</p>','vdvd','pompimini1c.png','3'),(47,'bvrb','<p>vbfdbvfd</p>','bfdbfd','damemini1.png','1'),(51,'fbfbdbf','<p>bdfbffd</p>','bfdbfd','pompimini1.png','1'),(53,'bgfbgf','<p>4444444444</p>','222222','damemini1c.png','1'),(54,'11','<p>444444</p>','22','louvremini1c.png','2'),(55,'666','<p>666</p>','666','invmini1.png','3'),(56,'00','<p>00</p>','00','peremini1.png','2'),(57,'f','<p>ffffff</p>','f','catmini1c.png','2'),(58,'xxxx','<p>xxxx</p>','xxxx','invmini1.png','2'),(60,',kjlkl.,m.','<p>mnmbnb,.jkl</p>',';l;k.kj','invmini1b.png','1');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-07 19:13:57
