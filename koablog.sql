/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : koablog

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2021-02-21 23:31:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `articleId` int NOT NULL AUTO_INCREMENT,
  `articleContent` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `createdDate` datetime(6) NOT NULL,
  `categoryId` int DEFAULT NULL,
  `tagId` int DEFAULT NULL,
  `articleLenght` int NOT NULL,
  PRIMARY KEY (`articleId`),
  KEY `categoryId` (`categoryId`),
  KEY `tagId` (`tagId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`tagId`) REFERENCES `tags` (`tagId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of articles
-- ----------------------------

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdTime` datetime NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tagId` int NOT NULL AUTO_INCREMENT,
  `tagName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdTime` datetime(6) NOT NULL,
  PRIMARY KEY (`tagId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tags
-- ----------------------------
