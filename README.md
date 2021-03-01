## UTN-BA - Trabajo práctico del Módulo 3 y 4 INTEGRADOR (Backend) y Trabajo práctico del Módulo 5 y 6 INTEGRADOR (Frontend)  🚀

_Proyecto: Where are my books? 🔍 📕📗📘 ._

## ¿Que es? 📋

_Proyecto de desarrollo en backend con NodeJS y de Frontend con ReactJS,  utilizando API Rest y base de datos MySQL para conocer si los libros del usuario se encuentran en su biblioteca o prestados. En caso de estar prestado, a quien se los presto._

#### Nota:

- La base de datos puede ser ejecutada a través de Docker:

```ssh
$ docker-compose up
```

- Crear archivo .env en base al archivo .env.sample

- Crear base de datos de "mybooks"

```sql
CREATE DATABASE IF NOT EXISTS `mybooks` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mybooks`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE IF NOT EXISTS `libro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `persona_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  KEY `persona_id` (`persona_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE IF NOT EXISTS `persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alias` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `libro_ibfk_2` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`);
COMMIT;
```
- Para hacer correr el proyecto en React:

```ssh
$ yarn start 
```

### Integrantes (Grupo C) ✒️

- [**Joaquin Zuazo**](https://github.com/joaquinzuazo)
- [**Santiago Delmonte**](https://github.com/santiagoDelmonte02)
- [**Juan Almada**](https://github.com/juanalmada8)
- [**Rocío Esteban**](https://github.com/hrchioest)
