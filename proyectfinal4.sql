-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 19:54:41
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
-- Base de datos: `proyectfinal4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `lugar` varchar(100) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `fecha_reporte` timestamp NOT NULL DEFAULT current_timestamp(),
  `imagen` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id`, `usuario_id`, `descripcion`, `lugar`, `estado`, `fecha_reporte`, `imagen`) VALUES
(4, 1, 'piso roto en el cuarto principal', 'depa 13 piso 3', 'no abierto', '2024-06-01 08:29:41', 'piso.jpg'),
(5, 2, 'el techo se cayo, digo gracias o que?', 'depa 22 piso 4', 'no abierto', '2024-06-13 05:00:00', NULL),
(9, 1, 'hola probando subidao', 'piso 3 depa 8', 'en proceso', '2024-06-13 05:00:00', '1718334536744-images.jpeg'),
(14, 1, 'ola probando fecha', 'piso 2 depa 2', 'solucionado', '2024-06-14 05:00:00', '1718349168524-momazo.jpg'),
(15, 1, 'descripcion modificada', 'piso 1 depa 3', 'no abierto', '2024-06-14 07:14:05', '1718349245740-images.jpeg'),
(16, 1, 'fecha copn hora', 'piso 1 depa 3', 'no abierto', '2024-06-14 07:14:06', '1718349246009-images.jpeg'),
(20, 2, 'baño roto me cayo mal la comida', 'piso 3 depa 5', 'en proceso', '2024-06-14 14:56:55', '1718377015453-images.jpeg'),
(21, 2, 'se malogro el foco', 'piso 6 dep 6', 'solucionado', '2024-06-14 15:41:17', '1718379677904-images.jpeg'),
(23, 2, 'hubo un corto circuito', 'depa 5 piso 6', 'en proceso', '2024-06-14 15:42:16', '1718379736269-images.jpeg'),
(24, 2, 'ultima prueba, se atoro el baño', 'piso 9 depa 121', 'no abierto', '2024-06-14 17:33:32', '1718386412439-images.jpeg'),
(25, 4, 'el caño esta goteando', 'piso 4 depa 21', 'no abierto', '2024-06-14 17:37:07', '1718386627940-002_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg'),
(26, 5, 'tengo un prblema con la ducha y no puedo bañarme', 'piso 10 depa 31', 'no abierto', '2024-06-14 17:39:55', '1718386795189-images.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `rol_id` int(11) NOT NULL DEFAULT 2,
  `imagen` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol_id`, `imagen`) VALUES
(1, 'juan pantoja', 'juan@gmail.com', 'juancito1234', 2, 'photo.jpg'),
(2, 'yon', 'yon@gmail.com', '$2b$10$XSsg0pgTXNCFjme7XRIWpOo', 2, '1718226058380-images.jpeg'),
(3, 'axel', 'axel@gmail.com', '$2b$10$ycM9ZbcDhJQX0k3LJCikX.6', 1, '1718247587229-pinguino-rey-con-plumaje-amarillo-y-beige-fruto-de-la-carencia-de-pigmentacion_2726d9ec_800x800.jpg'),
(4, 'Fabri Vergara', 'fabrizio@gmail.com', '$2b$10$MsytJgBPps0i2aCUgUlv7ug', 2, '1718386470496-Mono-araÃ±a-Ramona-1400x933.jpg'),
(5, 'Caden', 'caden@gmail.com', '$2b$10$twtyM2C/zWI.RORzrIFV4OT', 2, '1718386736422-Mono-araÃ±a-Ramona-1400x933.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
