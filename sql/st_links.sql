/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Version : 50520
 Source Host           : localhost
 Source Database       : shorten

 Target Server Version : 50520
 File Encoding         : utf-8

 Date: 11/25/2012 13:09:46 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `st_links`
-- ----------------------------
DROP TABLE IF EXISTS `st_links`;
CREATE TABLE `st_links` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `link_id` varchar(64) NOT NULL,
  `url` text NOT NULL,
  `save_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LINK_ID_IDX` (`link_id`) USING BTREE,
  KEY `URL_SAVE_DATE_IDX` (`url`(255),`save_date`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

