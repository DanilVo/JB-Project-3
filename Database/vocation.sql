-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 12:49 PM
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
-- Database: `vocation`
--
CREATE DATABASE IF NOT EXISTS `vocation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vocation`;

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
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) DEFAULT NULL
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
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vocations`
--

CREATE TABLE `vocations` (
  `vocationId` int(11) NOT NULL,
  `destination` varchar(20) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `vocationStartDate` date DEFAULT NULL,
  `vocationEndDate` date DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `vocationImageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vocations`
--

INSERT INTO `vocations` (`vocationId`, `destination`, `description`, `vocationStartDate`, `vocationEndDate`, `price`, `vocationImageUrl`) VALUES
(1, 'Paris', 'Explore the romantic city of Paris', '2023-01-15', '2023-01-20', 1000, 'paris.jpg'),
(2, 'New York', 'Experience the vibrant culture of New York City', '2023-02-10', '2023-02-18', 1200, 'new_york.jpg'),
(3, 'Tokyo', 'Discover the unique blend of tradition and modernity in Tokyo', '2023-03-05', '2023-03-15', 1500, 'tokyo.jpg'),
(4, 'Rome', 'Immerse yourself in the history and architecture of Rome', '2023-04-02', '2023-04-10', 1100, 'rome.jpg'),
(5, 'Sydney', 'Enjoy the beautiful beaches and landmarks of Sydney', '2023-05-12', '2023-05-20', 1300, 'sydney.jpg'),
(6, 'Cairo', 'Explore the ancient wonders of Cairo', '2023-06-08', '2023-06-15', 900, 'cairo.jpg'),
(7, 'Rio de Janeiro', 'Experience the energy of Rio de Janeiro', '2023-07-04', '2023-07-12', 1400, 'rio.jpg'),
(8, 'Barcelona', 'Discover the art and architecture of Barcelona', '2023-08-20', '2023-08-28', 1100, 'barcelona.jpg'),
(9, 'Auckland', 'Enjoy the scenic beauty of Auckland', '2023-09-15', '2023-09-22', 1200, 'auckland.jpg'),
(10, 'Bangkok', 'Immerse yourself in the vibrant street life of Bangkok', '2023-10-10', '2023-10-18', 1000, 'bangkok.jpg'),
(11, 'Marrakech', 'Experience the rich culture of Marrakech', '2023-11-05', '2023-11-12', 1300, 'marrakech.jpg'),
(12, 'Dubai', 'Explore the futuristic city of Dubai', '2023-12-01', '2023-12-10', 1600, 'dubai.jpg'),
(13, 'Venice', 'Enjoy the romantic canals of Venice', '2024-01-08', '2024-01-15', 1100, 'venice.jpg'),
(14, 'Cape Town', 'Discover the beauty of Cape Town', '2024-02-14', '2024-02-22', 1400, 'cape_town.jpg'),
(15, 'Seoul', 'Experience the dynamic culture of Seoul', '2024-03-10', '2024-03-18', 1200, 'seoul.jpg'),
(18, 'test,test,', 'test,test,', '2023-07-23', '2023-07-24', 10000, '468c22e5-5ad9-457f-871d-4f668637c026.jpeg'),
(19, 'test,test,', 'test,test,', '2023-07-23', '2023-07-24', 10000, '8e11ec8b-0511-4d29-8fdd-cef42b7fadb6.jpeg'),
(20, 'test,test,111', 'test,test,111', '2023-07-23', '2023-07-24', 10, 'f51804cf-ebe4-4e29-a2e8-f2fa9f491927.jpeg'),
(21, 'test,test,', 'test,test,', '2023-07-23', '2023-07-24', 10000, '4caf835b-1ad8-42b6-85b4-295220d46e3e.jpeg'),
(22, 'test,test,', 'test,test,', '2023-07-23', '2023-07-24', 10000, '73a171d4-4e0c-4e68-8a74-975ee6fa4fbe.jpeg'),
(23, 'test,test,', 'test,test,', '2023-07-23', '2023-07-24', 10000, 'a06e559d-0e7e-4a69-8e68-d55de05ec8c9.jpeg');

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
-- Indexes for table `vocations`
--
ALTER TABLE `vocations`
  ADD PRIMARY KEY (`vocationId`);

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vocations`
--
ALTER TABLE `vocations`
  MODIFY `vocationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vocationId`) REFERENCES `vocations` (`vocationId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
