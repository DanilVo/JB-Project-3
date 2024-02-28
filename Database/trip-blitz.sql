-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2024 at 09:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trip-blitz`
--
CREATE DATABASE IF NOT EXISTS `trip-blitz` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `trip-blitz`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(39, 2),
(39, 3),
(39, 6),
(39, 7),
(39, 9),
(39, 10),
(39, 11),
(39, 12),
(39, 13),
(39, 14),
(39, 15),
(40, 9),
(40, 15),
(42, 2),
(42, 13),
(43, 1),
(43, 3),
(43, 4),
(43, 10),
(43, 11),
(44, 1),
(44, 7),
(44, 10),
(44, 11),
(44, 14),
(44, 15),
(57, 10),
(57, 12);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `uuid` varchar(200) NOT NULL,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `userImageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `uuid`, `firstName`, `lastName`, `email`, `password`, `roleId`, `userImageUrl`) VALUES
(36, '1811acd5b3ad46ae409bf4f71cd16da62a90db33c9697f3ca814d14811ee5f6d44f17aa08b8414b5cacd7bc6aa4251dc5e6258c932a5276c454c1d451ad516e8', 'Admin', 'Admin', 'admin@admin.com', 'e87ad415c4edc05838576d1c1839d03423ca3d6d10feeb60fe007fab76a5248c3f721c85166050d3185df9b5a04007c4439416976a08f51925f49a5458cce347', 1, 'f68c7e2d-0c58-4906-bf23-ba1fe73c7b42.jpg'),
(39, '7db42457963872636a4e176d70831e0facd6c25287542ae91a8f8f19f76f9d6089c4a7b6bf28a783272d7402b8998dfd3b6c734502704e2f8caef31a197e406c', 'Danil', 'Volobuyev', 'dani736@gmail.com', '46aa4141f8d963f17a26bc1010a2eabbf61759106ad45cddbbe61ea7630abdd0bfe20e7eba2b26ada200518665c2152935a4d761c13c48c31171851659784298', 2, 'cb5d1b4d-be46-43c9-9973-068475373b92.jpg'),
(40, '23f80e35806f915441a5eb0278749e52147a8385edd748476c4fd7860191a09f1285bcff5e896693db6fbbde0794e1ecbbcae121fb3a1e2c3040bbb13bd7d729', 'test123', 'test123', 'test123@gmail.com', 'd4614a224f066bbc20afb4160b5c2ee4d6522c241fdb9d15faf085f228a488376b527f20ff7cd765e8053f370c40a132b1227bf02ebb8425ccc70615bb678484', 2, '82eeee0e-9f8d-4a59-b3fd-09cde9c38c99.png'),
(42, 'f188957d2c5f7548486fa83b20b19cd130136779199a4293d88f5e58c2170b44ed5ecd5f2b93c41275a3ebd77daa1a8ca0e75da446b85dde7854bc3a1b1ccdf4', 'Veronica', 'Soloduha', 'soloduha10@gmail.com', 'cb78f44331cd5909fec4bc48f9c70411f8ad5ef8c75b1eb4accd2182414d4f89fc5b5e27757e8e5f4855fceda652f644c65f696e2743da67a9f82ab3a21526d4', 2, '6f0295de-b560-4909-b63d-08e1b2e58a11.jpeg'),
(43, '3b4f1411b79e6398166cf0d6867e49608e793f504bc31405b9324df0e8c97421806f568171f66439b43d65fbb15567e3bb12be70b8e41f1d5528f027d6de3f30', 'Ben', 'Dover', 'bendover20@gmail.com', '51ecc9416481aa7cb9e2cd92a1d9ea135ede3e6bf7259a3cb22888e1059d95b108350e8879dace87080a9d74363b0d4ed1ada9ea10f68ee1186df4960dc4d552', 2, 'default-user-img.png'),
(44, '3530fd53590c25722e7b0557d5602ce26f05f3c14b2389d920a763b80624505c3ff71d3d3135442fc17eda93b5307d3360573d81906beab7344c52e9c3bc1bff', 'Anid', 'Adick', 'anidadick@hotmail.com', '1fc20c7629f3803870861154465d84603b9b2ab000581959bf7d6afe698d9901f335744d41c9a393e2e539c7df1615079e2770577f7327b60be3b3aaaad9b053', 2, 'default-user-img.png'),
(57, '1080213330357e8b945c6882f6121fcfa2ecbc9c3d30cf9831289f7465841717e8a884dcd4207c7aa682d4074c6159eb94da247f86381c2b89399935b5d7f720', 'Assaf', 'Fink', 'assaf@gmai.com', '89115f9b25fb6cca80c5fc54f43ed6ed7b1e061d767252e17f48dc3cacf70a7a03c412acdf7bc4778fe5a0dc18384c65151c6141e2973f317bbaacb824bdd45f', 2, 'default-user-img.png');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationUuid` varchar(200) NOT NULL,
  `destination` varchar(20) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `vacationStartDate` date DEFAULT NULL,
  `vacationEndDate` date DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `vacationImageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationUuid`, `destination`, `description`, `vacationStartDate`, `vacationEndDate`, `price`, `vacationImageUrl`) VALUES
(1, '5acf0240f8f0d9ecdb0b3b2937b7e7e2136c403f3790c3032b1296f69e5e1d78229498d3bf272b9722fac3bdfb74531a6e240d12d0e7ce53be824a870cee419b', 'Paris', 'Explore the romantic city of Paris', '2024-01-16', '2024-01-21', 1000, '5d96245e-7d02-4461-8503-4f9370bfbc00.jpg'),
(2, 'ca071c85a06a292c1cc4b1507602ae98a973d4b8234b496dd4192ff58046e4425eea5e2977a554aaf43dd2bcbe76b93b9e0a3671213aabb0da3a66ccba10ab04', 'New York', 'Experience the vibrant culture of New York City', '2024-02-10', '2024-02-18', 1200, 'new_york.jpg'),
(3, '2dc599af25de0d325c44a1da5badf47e33d13a8ca7fbea3e2e9ea69a3b7a4ae860cc6423958e759d6f364fc931d2d28f2bee8349351f17cc5153a31be03b354a', 'Tokyo', 'Discover the unique blend of tradition and modernity in Tokyo', '2024-03-05', '2024-03-15', 1400, 'tokyo.jpg'),
(4, '6431a5ac581e6bdd565b59b3f8f0ed0d408ff30f5aa040566bcbea58dafbda4139dfc98a7b69c324a0807a619073cd7ad3c2d33e99d466c21052cb58a871e8f4', 'Rome', 'Immerse yourself in the history and architecture of Rome', '2024-04-02', '2024-04-10', 1100, 'rome.jpg'),
(6, 'fba2766d1e1922014c528a3f24d1e7de8e65840704ed661e232b58b3d466bd7ad771fa2497773c0739842b838c9f0a9d858ce175f3b8533ed8cf650dc349fee2', 'Cairo', 'Explore the ancient wonders of Cairo', '2024-06-08', '2024-06-15', 900, 'cairo.jpg'),
(7, '0e9dd16256563682c71ae74eb6d324be390517aa98f5468889ee97ee3034a08f11bcf7b10716f7c82d28730e0f1adb90fd13c5def998cd4c0d914bce1ce649bd', 'Rio de Janeiro', 'Experience the energy of Rio de Janeiro', '2024-07-04', '2024-07-12', 1400, 'rio.jpg'),
(8, 'a6fc6ce5cf48d0ba90559f8467a821d77d9782246cb13d762ea43a06f6ac6db1d0534e87152523a962397e8173f73c12b7016145a5f1c995006f6bb8bb92cb2e', 'Barcelona', 'Discover the art and architecture of Barcelona', '2024-08-20', '2024-08-28', 1100, 'barcelona.jpg'),
(9, '491a30ab3fd8e3c7fd835f18ebbfbee9b4bdd4cad7b90db98243d0bb73f35df368f8cf9653e2021b3f2db45720f2c55cebfec2312d264bb516bd9a00acd938cc', 'Auckland', 'Enjoy the scenic beauty of Auckland', '2024-09-15', '2024-09-22', 1200, 'auckland.jpg'),
(10, 'e4241e9c03df42a3a604b9470d81b641d3eafadff1c7336fbefd4427a766f216e65c556d905d6fb4cbd35d793e0be5b9c16514b63f91246d4e26359a9ff5cd9e', 'Bangkok2', 'Immerse yourself in the vibrant street life of Bangkok', '2023-10-10', '2023-10-18', 1000, 'bangkok.jpg'),
(11, '29dec10271af7511fda969fb6a3a123816f74c618081210f7c0a81d6162ece493f23939d24ee1eb772cd723defdf57419b6272f479fa1e432655cc3822c7ddce', 'Marrakech', 'Experience the rich culture of Marrakech', '2024-11-05', '2024-11-12', 1300, 'marrakech.jpg'),
(12, 'f39b7ba31596643d1338c882af21a9840ad2918d7845fa395add5658afb282948429e95638f2bffc1b6ab63f98b9c1e532157f3c8647cedc12174411381d9946', 'Dubai', 'Explore the futuristic city of Dubai', '2023-12-01', '2023-12-10', 1600, 'dubai.jpg'),
(13, 'c36b853cd84e1af9149bd9d7ea6bf7dd17f2d64b4c660caf35985a344f23016bf49f0cd80d23f39b56a8c5c127deea1931b53b57225e3ac0e9212e3dc471d60f', 'Venice', 'Enjoy the romantic canals of Venice', '2024-01-08', '2024-01-15', 1100, 'venice.jpg'),
(14, 'e3e6c5894324611f37dd86c98be1e43436b8949db4bf6c77b3376f334d659f59db5d8d99d54c2f7b2c3fafd2ec52b7ef1549a734567c9eeea76aef5dc518fe0b', 'Cape Town', 'Discover the beauty of Cape Town', '2024-02-14', '2024-02-24', 1400, 'cape_town.jpg'),
(15, '4e4eea62af0efcdf1ddf0953144a6bde60efdba0aec829508f1af3a99ba3985f836458b9e63568fed2f7823e1ccc5cf0bb9089a4187de7368ec0798151fece0a', 'Seoul', 'Experience the dynamic culture of Seoul', '2024-03-10', '2024-03-18', 1200, 'seoul.jpg'),
(309, '5c07600ce5d04eba270277d0007403e96bd4021d1420e3eea3e13a1f292ea87cee4986297ffc0bb6a70a52307b8019c2125524da43f456c22c2131779800ae77', 'Vienna', 'Immerse yourself in the classical elegance of Vienna,', '2024-03-15', '2024-03-19', 4000, '3f49c39f-9723-448c-a731-6214ade0a03f.jpg'),
(310, 'afdfddbb881bed863ff4db9b91ed503b580eb073aff4fcc008e8a2f3b2b429377aa9b11939e5d9160809a732f72faa46daa3a9dd30d51e3c70760a828e4513f8', 'Bansko', 'Embark on an adventure in the snowy slopes of Bansko.', '2024-04-03', '2024-04-17', 2300, '838e6f4d-6226-4cab-81ad-652b6f64e159.jpg'),
(311, '96b3b78c8bf966abccbeeb3bcda09a6976e1db046d545a9ffaa795f638decb6cc48f79b88fa9c981ba3612274714412e04549ad084ca9cd31a757ecbe8b10eb9', 'Las-Vegas', 'Discover the vibrant pulse of Las Vegas,', '2024-03-01', '2024-03-11', 3300, 'e786cf22-7f9e-46fa-919f-3120b74164c8.jpg'),
(312, '3d297210b2d1f27a247a1bac4176856a7485ecd4b57b2d5bfd68aa3f881a35d997e2029eb897032cb7615cebd2b14b257de4476864a408a7efaa4d101d376cc9', 'Jerusalem', 'Uncover the spiritual depth of Jerusalem,', '2024-03-10', '2024-03-21', 5100, 'a06754c0-e7b5-4549-99bf-f50813dfe614.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vocationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `role` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=313;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
