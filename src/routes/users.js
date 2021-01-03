const express = require("express");
const router = express.Router();

const util = require("util");
const conexion = require("../dbConnection");
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
      "INSERT INTO users (nombre, apellido, alias, email) VALUE (?,?,?,?)";
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
  } catch (e) {
    console.error(e.message);
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

/*

** PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string}
 el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413, 
 {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

*/

router.put("/:id", async (req, res) => {
  try {
    let query = "SELECT * FROM users WHERE id = ?";

    //verificando si el usuario solicitado existe:
    let respuesta = await qy(query, [req.params.id]);
    if (respuesta.length === 0) {
      throw new Error("El usuario no existe");
    }

    query = "UPDATE users SET nombre = ?, apellido = ?, alias = ? WHERE id = ?";
    respuesta = await qy(query, [
      req.body.nombre,
      req.body.apellido,
      req.body.alias,
      req.params.id
    ]);

    if ("email" in req.body) {
      throw new Error("El mail no se puede modificar");
    }

    // Para retornar el objeto modificado con sus respectivos datos
    query = "SELECT * FROM users WHERE id = ?";
    respuesta = await qy(query, [req.params.id]);
    
    res.send({ respuesta: respuesta });
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

/*

** DELETE '/persona/:id' retorna: 200 y {mensaje: "se borro correctamente"} o bien 413, 
{mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa 
persona tiene libros asociados, no se puede eliminar"

*/

router.delete("/:id", async (req, res) => {
  try {
    let query = "SELECT * FROM users WHERE id = ?";

    let respuesta = await qy(query, [req.params.id]);

    // Verificando si el id ingresado pertenece a algún usuario:
    if (respuesta.length === 0) {
      throw new Error("Este usuario no existe");
    }

    query = "DELETE FROM users WHERE id = ?";

    respuesta = await qy(query, [req.params.id]);

    res.send("El usuario con el id ingresado se borro correctamente.");
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});

module.exports = router;
