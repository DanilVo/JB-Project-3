-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2023 at 01:33 PM
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
-- Database: `vacation`
--
CREATE DATABASE IF NOT EXISTS `vacation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vocationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleId`, `roleName`) VALUES
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
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `uuid`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(35, 'ab612bb65d149809fa4894e8228a21ec016a9de9cf64c51274435755b1f80be66c6a0028b676d782b5023964c9b80ca82393c75371fa7a135116b4733ac83d4f', 'test', 'test', 'test1@test.com', '680347ca52f343380c436ea005cce4485f03695af1264cb2431245c7055fe554beb8a5ffe6b85696ed9ad8480afd685d1ae3ef8d601a7465b76d4638c038b5b2', 2),
(36, '1811acd5b3ad46ae409bf4f71cd16da62a90db33c9697f3ca814d14811ee5f6d44f17aa08b8414b5cacd7bc6aa4251dc5e6258c932a5276c454c1d451ad516e8', 'Admin1', 'Admin', 'admin@admin.com', 'e87ad415c4edc05838576d1c1839d03423ca3d6d10feeb60fe007fab76a5248c3f721c85166050d3185df9b5a04007c4439416976a08f51925f49a5458cce347', 1),
(37, '88a4c1c51519d3cc17dee9dd2cb3a2c12a42aaa88e7bdc43209a4bbb8d5ec9e2848c3fbe571ec01db4a91caeb3711caab410c0a7bcdb54a4cbf355c521fbd414', 'test', 'test', 'test@gmail.com', '680347ca52f343380c436ea005cce4485f03695af1264cb2431245c7055fe554beb8a5ffe6b85696ed9ad8480afd685d1ae3ef8d601a7465b76d4638c038b5b2', 2);

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
(1, '5acf0240f8f0d9ecdb0b3b2937b7e7e2136c403f3790c3032b1296f69e5e1d78229498d3bf272b9722fac3bdfb74531a6e240d12d0e7ce53be824a870cee419b', 'Paris', 'Explore the romantic city of Paris', '2023-01-15', '2023-01-20', 1000, '4d25adea-daf4-4528-90bc-8f511fed40cb.jpg'),
(2, 'ca071c85a06a292c1cc4b1507602ae98a973d4b8234b496dd4192ff58046e4425eea5e2977a554aaf43dd2bcbe76b93b9e0a3671213aabb0da3a66ccba10ab04', 'New York', 'Experience the vibrant culture of New York City', '2023-02-10', '2023-02-18', 1300, 'new_york.jpg'),
(3, '2dc599af25de0d325c44a1da5badf47e33d13a8ca7fbea3e2e9ea69a3b7a4ae860cc6423958e759d6f364fc931d2d28f2bee8349351f17cc5153a31be03b354a', 'Tokyo', 'Discover the unique blend of tradition and modernity in Tokyo', '2023-03-05', '2023-03-15', 1500, 'tokyo.jpg'),
(4, '6431a5ac581e6bdd565b59b3f8f0ed0d408ff30f5aa040566bcbea58dafbda4139dfc98a7b69c324a0807a619073cd7ad3c2d33e99d466c21052cb58a871e8f4', 'Rome', 'Immerse yourself in the history and architecture of Rome', '2023-04-02', '2023-04-10', 1100, 'rome.jpg'),
(6, 'fba2766d1e1922014c528a3f24d1e7de8e65840704ed661e232b58b3d466bd7ad771fa2497773c0739842b838c9f0a9d858ce175f3b8533ed8cf650dc349fee2', 'Cairo', 'Explore the ancient wonders of Cairo', '2023-06-08', '2023-06-15', 900, 'cairo.jpg'),
(7, '0e9dd16256563682c71ae74eb6d324be390517aa98f5468889ee97ee3034a08f11bcf7b10716f7c82d28730e0f1adb90fd13c5def998cd4c0d914bce1ce649bd', 'Rio de Janeiro', 'Experience the energy of Rio de Janeiro', '2023-07-04', '2023-07-12', 1400, 'rio.jpg'),
(8, 'a6fc6ce5cf48d0ba90559f8467a821d77d9782246cb13d762ea43a06f6ac6db1d0534e87152523a962397e8173f73c12b7016145a5f1c995006f6bb8bb92cb2e', 'Barcelona', 'Discover the art and architecture of Barcelona', '2023-08-20', '2023-08-28', 1100, 'barcelona.jpg'),
(9, '491a30ab3fd8e3c7fd835f18ebbfbee9b4bdd4cad7b90db98243d0bb73f35df368f8cf9653e2021b3f2db45720f2c55cebfec2312d264bb516bd9a00acd938cc', 'Auckland', 'Enjoy the scenic beauty of Auckland', '2023-09-15', '2023-09-22', 1200, 'auckland.jpg'),
(10, 'e4241e9c03df42a3a604b9470d81b641d3eafadff1c7336fbefd4427a766f216e65c556d905d6fb4cbd35d793e0be5b9c16514b63f91246d4e26359a9ff5cd9e', 'Bangkok', 'Immerse yourself in the vibrant street life of Bangkok', '2023-10-10', '2023-10-18', 1000, 'bangkok.jpg'),
(11, '29dec10271af7511fda969fb6a3a123816f74c618081210f7c0a81d6162ece493f23939d24ee1eb772cd723defdf57419b6272f479fa1e432655cc3822c7ddce', 'Marrakech', 'Experience the rich culture of Marrakech', '2023-11-05', '2023-11-12', 1300, 'marrakech.jpg'),
(12, 'f39b7ba31596643d1338c882af21a9840ad2918d7845fa395add5658afb282948429e95638f2bffc1b6ab63f98b9c1e532157f3c8647cedc12174411381d9946', 'Dubai', 'Explore the futuristic city of Dubai', '2023-12-01', '2023-12-10', 1600, 'dubai.jpg'),
(13, 'c36b853cd84e1af9149bd9d7ea6bf7dd17f2d64b4c660caf35985a344f23016bf49f0cd80d23f39b56a8c5c127deea1931b53b57225e3ac0e9212e3dc471d60f', 'Venice', 'Enjoy the romantic canals of Venice', '2024-01-08', '2024-01-15', 1100, 'venice.jpg'),
(14, 'e3e6c5894324611f37dd86c98be1e43436b8949db4bf6c77b3376f334d659f59db5d8d99d54c2f7b2c3fafd2ec52b7ef1549a734567c9eeea76aef5dc518fe0b', 'Cape Town', 'Discover the beauty of Cape Town', '2024-02-14', '2024-02-22', 1400, 'cape_town.jpg'),
(15, '4e4eea62af0efcdf1ddf0953144a6bde60efdba0aec829508f1af3a99ba3985f836458b9e63568fed2f7823e1ccc5cf0bb9089a4187de7368ec0798151fece0a', 'Seoul', 'Experience the dynamic culture of Seoul', '2024-03-10', '2024-03-18', 1200, 'seoul.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vocationId`),
  ADD KEY `vocationId` (`vocationId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
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
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vocationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
