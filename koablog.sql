/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80023
Source Host           : localhost:3306
Source Database       : koablog

Target Server Type    : MYSQL
Target Server Version : 80023
File Encoding         : 65001

Date: 2021-02-22 19:44:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `articleId` int NOT NULL AUTO_INCREMENT,
  `articleContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `categoryId` int DEFAULT NULL,
  `tagId` bigint DEFAULT NULL,
  `articleLenght` int NOT NULL,
  `state` int NOT NULL DEFAULT '0' COMMENT '0代表正常 1代表删除',
  PRIMARY KEY (`articleId`),
  KEY `categoryId` (`categoryId`),
  KEY `tagId` (`tagId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('3', '<p>了解哪一种 <code>for</code> 循环或迭代器适合我们的需求，防止我们犯下一些影响应用性能的低级错误。<br/> </p><div class=\"media-wrap image-wrap\"><img alt=\"由 Artem Sapegin 上传至 Unsplash\" data-src=\"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a7b45b00bdd48c6b23d8f06c63645c6~tplv-k3u1fbpfcp-watermark.image\" data-width=\"800\" data-height=\"600\" src=\"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a7b45b00bdd48c6b23d8f06c63645c6~tplv-k3u1fbpfcp-watermark.image\" class=\"lazyload inited loaded\"/></div><p><br/> JavaScript 是 Web 开发领域的“常青树”。无论是 JavaScript 框架（如 Node.js、React、Angular、Vue 等），还是原生 JavaScript，都拥有非常庞大的粉丝基础。我们来谈谈现代 JavaScript 吧。循环一直是大多数编程语言的重要组成部分，而现代 JavaScript 为我们提供了许多迭代或循环值的方法。<br/> 但问题在于，我们是否真的知道哪种循环或迭代最适合我们的需求。<code>for</code> 循环有很多变形，例如 <code>for</code>、<code>for</code>（倒序）、<code>for…of</code>、<code>forEach</code>、<code>for…in</code>、<code>for…await</code>。本文将围绕这些展开讨论。</p><p><strong><span style=\"font-size:48px\">究竟哪一种循环更快？</span></strong></p><p><strong>答案其实是：</strong> <code>for</code>（倒序）<br/> 最让我感到惊讶的事情是，当我在本地计算机上进行测试之后，我不得不接受 <code>for</code>（倒序）是所有 <code>for</code> 循环中最快的这一事实。下面我会举个对一个包含超过一百万项元素的数组执行一次循环遍历的例子。<br/> <strong>声明</strong>：<code>console.time()</code> 结果的准确度在很大程度上取决于我们运行测试的系统配置。你可以在此处对准确度作进一步了解。</p><p></p><pre><code><br/>const million = 1000000;  <br/>const arr = Array(million); console.time(&#x27;⏳&#x27;); <br/>for (let i = arr.length; i &gt; 0; i--) {} // for(倒序) 	:- 1.5ms <br/>for (let i = 0; i &lt; arr.length; i++) {} // for          :- 1.6ms <br/>arr.forEach(v =&gt; v)                     // foreach      :- 2.1ms <br/>for (const v of arr) {}                 // for...of     :- 11.7ms console.timeEnd(&#x27;⏳&#x27;);</code></pre><p>造成这样结果的原因很简单，在代码中，正序和倒序的 <code>for</code> 循环几乎花费一样的时间，仅仅相差了 0.1 毫秒。原因是，<code>for</code>（倒序）只需要计算一次起始变量 <code>let i = arr.length</code>，而在正序的 <code>for</code> 循环中，它在每次变量增加后都会检查条件 <code>i&lt;arr.length</code>。这个细微的差别不是很重要，你可以忽略它。（译者注：在数据量小或对时间不敏感的代码上，我们大可忽略它，但是根据译者的测试，当数据量扩大，例如十亿，千亿等的数量级，差距就显著提升，我们就需要考虑时间对应用程序性能的影响了。）<br/> 而 <code>forEach</code> 是 <code>Array</code> 原型的一个方法，与普通的 <code>for</code> 循环相比，<code>forEach</code> 和 <code>for…of</code> 需要花费更多的时间进行数组迭代。（译者注：但值得注意的是，<code>for…of</code> 和 <code>forEach</code> 都从对象中获取了数据，而原型并没有，因此没有可比性。）<br/><br/>作者：PassionPenguin<br/>链接：https://juejin.cn/post/6930973929452339213<br/>来源：掘金<br/>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br/>作者：PassionPenguin<br/>链接：https://juejin.cn/post/6930973929452339213<br/>来源：掘金<br/>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br/><br/>作者：PassionPenguin<br/>链接：https://juejin.cn/post/6930973929452339213<br/>来源：掘金<br/>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>', '2021-02-22 09:10:08', '1', '1', '1579', '0');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int NOT NULL DEFAULT '0' COMMENT '0代表正常 1代表删除',
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', '前端', '2021-02-22 08:41:54', '0');
INSERT INTO `categories` VALUES ('3', '后端', '2021-02-22 19:39:55', '0');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tagId` int NOT NULL AUTO_INCREMENT,
  `tagName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int NOT NULL DEFAULT '0' COMMENT '0代表正常 1代表删除',
  PRIMARY KEY (`tagId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', 'js', '2021-02-22 08:42:24', '0');
