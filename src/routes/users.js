const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");

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

  console.log("Conexión con la base de datos mysql establecida");
});
const qy = util.promisify(conexion.query).bind(conexion);

/**
*POST '/users' recibe: {nombre: string, apellido: string, alias: string, email: string} 
retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string}
 - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se
  encuentra registrado", "error inesperado"
 */

router.post("/", async (req, res) => {
  try {
    // Valido que me manden correctamente la info
    if (
      !req.body.nombre ||
      !req.body.apellido ||
      !req.body.alias ||
      !req.body.email
    ) {
      throw new Error("Falta enviar datos, todos los datos son requeridos");
    }

    // Verifico que no exista previamente un usuario con el mismo email
    let query = "SELECT id FROM users WHERE email = ?";

    let respuesta = await qy(query, [req.body.email]);

    if (respuesta.length > 0) {
      throw new Error("El email ya existe");
    }

    // Guardo nuevo usuario
    query =
      "INSERT INTO users (nombre, apellido, alias, email) VALUE (?, ?,?,?)";
    respuesta = await qy(query, [
      req.body.nombre,
      req.body.apellido,
      req.body.alias,
      req.body.email
    ]);
    res.send({ respuesta: respuesta.insertId });
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

/**
 *GET '/users' retorna status 200 y [{id: numerico, nombre: string, apellido: string, 
    alias: string, email; string}] o bien status 413 y []*
 */

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const respuesta = await qy(query);
    res.send({ respuesta: respuesta });
    console.log("respuesta", respuesta);
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado" });
  }
});

/**
 * GET '/users/:id' retorna status 200 y {id: numerico, nombre: string, apellido: string,
 *  alias: string, email; string} - status 413 , {mensaje: <descripcion del error>}
 * "error inesperado", "no se encuentra esa persona"
 */

router.get("/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE id = ?";

    const respuesta = await qy(query, [req.params.id]);
    console.log(respuesta);

    res.send({ respuesta: respuesta });
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

module.exports = router;
