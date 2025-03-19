-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 19-03-2025 a las 19:39:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `diabetesdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comida`
--

CREATE TABLE `comida` (
  `tipo_comida` varchar(30) NOT NULL,
  `gl_1h` int(11) NOT NULL,
  `gl_2h` int(11) NOT NULL,
  `raciones` int(11) NOT NULL,
  `insulina` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_glucosa`
--

CREATE TABLE `control_glucosa` (
  `fecha` date NOT NULL,
  `deporte` int(11) NOT NULL,
  `lenta` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `control_glucosa`
--

INSERT INTO `control_glucosa` (`fecha`, `deporte`, `lenta`, `id_usu`) VALUES
('2025-03-01', 1, 15, 4),
('2025-03-03', 2, 20, 4),
('2025-03-05', 3, 10, 4),
('2025-03-10', 4, 18, 4),
('2025-03-15', 5, 12, 4),
('2025-03-20', 1, 22, 4),
('2025-03-25', 2, 14, 4),
('2025-03-28', 3, 16, 4),
('2025-03-30', 4, 19, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hiperglucemia`
--

CREATE TABLE `hiperglucemia` (
  `glucosa` int(11) NOT NULL,
  `hora` time NOT NULL,
  `correccion` int(11) NOT NULL,
  `tipo_comida` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hipoglucemia`
--

CREATE TABLE `hipoglucemia` (
  `glucosa` int(11) NOT NULL,
  `hora` time NOT NULL,
  `tipo_comida` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usu` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellidos` varchar(25) NOT NULL,
  `usuario` varchar(25) NOT NULL,
  `contra` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usu`, `fecha_nacimiento`, `nombre`, `apellidos`, `usuario`, `contra`) VALUES
(4, '2000-02-13', 'paco3', 'paco3', 'paco', '$2y$10$KoWMPhil6WKsXS89k1vrPuor7vkMlOiEYo9oUQ53jiZ4X8ssUBcT.'),
(12, '1999-05-28', 'A8888888', 'A8888888', 'a8888888', '$2y$10$tNEJfQqau9vNRxwypLNoMu.Z7ijRGmO7XEIjITN0LzS.Hb0vgvOO6'),
(56, '2003-03-11', 'Yorch', 'Yorch', 'yorch123', '$2y$10$.PesaSUyihfsbXqR3I3sBuJOqaE9vjr6D5hqZBUM/dG45MxonmR7K'),
(57, '2003-03-06', 'dani33', 'dani33', 'dani33', '$2y$10$sVop36rwZyu31RvWepcDruh90frS/0SBdh9WKY014BjUZNVyOJEeC');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comida`
--
ALTER TABLE `comida`
  ADD PRIMARY KEY (`tipo_comida`,`fecha`,`id_usu`),
  ADD KEY `fecha` (`fecha`,`id_usu`);

--
-- Indices de la tabla `control_glucosa`
--
ALTER TABLE `control_glucosa`
  ADD PRIMARY KEY (`fecha`,`id_usu`),
  ADD KEY `id_usu` (`id_usu`);

--
-- Indices de la tabla `hiperglucemia`
--
ALTER TABLE `hiperglucemia`
  ADD PRIMARY KEY (`tipo_comida`,`fecha`,`id_usu`);

--
-- Indices de la tabla `hipoglucemia`
--
ALTER TABLE `hipoglucemia`
  ADD PRIMARY KEY (`tipo_comida`,`fecha`,`id_usu`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comida`
--
ALTER TABLE `comida`
  ADD CONSTRAINT `comida_ibfk_1` FOREIGN KEY (`fecha`,`id_usu`) REFERENCES `control_glucosa` (`fecha`, `id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `control_glucosa`
--
ALTER TABLE `control_glucosa`
  ADD CONSTRAINT `control_glucosa_ibfk_1` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hiperglucemia`
--
ALTER TABLE `hiperglucemia`
  ADD CONSTRAINT `hiperglucemia_ibfk_1` FOREIGN KEY (`tipo_comida`,`fecha`,`id_usu`) REFERENCES `comida` (`tipo_comida`, `fecha`, `id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hipoglucemia`
--
ALTER TABLE `hipoglucemia`
  ADD CONSTRAINT `hipoglucemia_ibfk_1` FOREIGN KEY (`tipo_comida`,`fecha`,`id_usu`) REFERENCES `comida` (`tipo_comida`, `fecha`, `id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
