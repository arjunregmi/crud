-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2020 at 04:21 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login`
--

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `name`, `email`, `password`) VALUES
(4, 'Arjun Regmi', 'admin@gmail.com', '$2a$10$tN1ynwPyacKy4KsM8QKJ3.VZsbb68I6gCJjvtTQ6KLYONTJLMYhJq'),
(9, 'Arjun Regmi', 'arjun@gmail.com', '$2a$10$Xg8NxayfhFnMkCiPAex4mOKe78rDkIMkLPIsd.KWhxZrhd1vX2ZNO');

-- --------------------------------------------------------

--
-- Table structure for table `studentinfo`
--

CREATE TABLE `studentinfo` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middlename` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `college` varchar(255) NOT NULL,
  `faculty` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studentinfo`
--

INSERT INTO `studentinfo` (`id`, `firstname`, `middlename`, `lastname`, `email`, `address`, `college`, `faculty`, `image`) VALUES
(2, 'Sagar ', 'Kumar', 'Poudel', 'sagar@123gmail.com', 'Butwal', 'Siddhartha College', 'BCA', 'IMG20191203111845.jpg'),
(5, 'Prasanna ', 'Kumar', 'Baniya', 'admin@gmail.com', 'Bardaghat', 'Nepathya College', 'BSC-CSIT', 'IMG20191203120841 (1).jpg'),
(7, 'Biswash', 'prasad', 'Acharya', 'biswash@gmail.com', 'Butwal,Shankarnagar', 'Nepathya College', 'BCA', 'DSC_1073 (1).JPG'),
(8, 'Prasanna ', 'prasad', 'Baniya', 'prem@gmail.com', 'Butwal,Shankarnagar', 'Nepathya College', 'BSC-CSIT', 'IMG20191206112844 (1).jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentinfo`
--
ALTER TABLE `studentinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `studentinfo`
--
ALTER TABLE `studentinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
