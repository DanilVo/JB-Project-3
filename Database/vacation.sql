-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 01:01 PM
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
  `password` varchar(200) DEFAULT NULL,
  `role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
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

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `vacationStartDate`, `vacationEndDate`, `price`, `vacationImageUrl`) VALUES
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
(15, 'Seoul', 'Experience the dynamic culture of Seoul', '2024-03-10', '2024-03-18', 1200, 'seoul.jpg');

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
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
