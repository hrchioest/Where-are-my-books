const express = require("express");
const mysql = require("mysql");
const util = require("util");

const app = express();
const port = 3000;
app.use(express.json());

// Conexion con mysql
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mybooks"
});

conexion.connect((error) => {
  if (error) {
    throw error;
  }

  console.log("Conexion con la base de datos mysql establecida");
});

const qy = util.promisify(conexion.query).bind(conexion); // permite el uso de asyn-await en la conexion mysql

// Desarrollo de la lógica:

/**
 * libros
 *
 *
 *  Ruta -> /libro
 */

/**
 * categoria de los libros
 *
 *
 *  Ruta -> /categoria
 */

/**
 * Usuarios de los libros
 *
 * Ruta -> /usuario
 */

// Servidor
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
