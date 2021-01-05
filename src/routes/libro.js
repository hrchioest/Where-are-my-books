const express = require("express");
const router = express.Router();
const conexion = require("../dbConnection");
const util = require("util");
const qy = util.promisify(conexion.query).bind(conexion); // permite el uso de asyn-await en la conexion mysql

// GET '/libro' - Devuelve todos los libros o mensaje de error con status 413.
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM libro";
    const respuesta = await qy(query);
    res.send({ respuesta: respuesta });
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado" });
  }
});

/**
 * POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}
 * devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}
 *  o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe",
 *  "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"
 */
router.post("/", async (req, res) => {
  try {
    // Verifico que se pasen todos los datos requeridos.
    if (!req.body.nombre || !req.body.categoria_id) {
      throw new Error("Los campos nombre y categoria_id son obligatorios");
    }

    // Verifico que el nombre del libro no esté registrado
    let query = "SELECT id FROM libro WHERE nombre = ?";
    let nombre_libro = await qy(query, [req.body.nombre]);
    if(nombre_libro.length > 0) {
        throw new Error("Ese libro ya existe");
    }

    // consulto si el id existe en categorias de libros
    const query_cat = "SELECT id FROM categoria WHERE id=?";
    const respuesta_cat = await qy(query_cat, [req.body.categoria_id]);

    if (respuesta_cat.length === 0) {
      throw new Error("No existe la categoría indicada");
    }

    // Verifico si persona_id es numerico y validad si corresponde a un usuario registrado sino sería null
    //y al ser null sería un libro que no lo tiene ningun usuario
    
    let persona_id = req.body.persona_id;
    if (Number.isInteger(persona_id)) {
      const query_user = "SELECT id FROM persona WHERE id=?";
      const respuesta_user = await qy(query_user, [persona_id]);

      if (respuesta_user.length === 0)
        throw new Error("No existe la persona indicada");
    } else {
      persona_id = null;
    }
    

    // Si todo lo anterior esta correcto se procede al guardado en la DB y persona_id se guardará siendo validada
    //anteriormente.
    query =
      "INSERT INTO libro (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)";
    let respuesta_insert = await qy(query, [
      req.body.nombre,
      req.body.descripcion,
      req.body.categoria_id,
      persona_id
    ]);

    //Devolviendo los datos ingresados del nuevo book
    query = "SELECT * FROM libro WHERE id=?";
    respuesta = await qy(query, [respuesta_insert.insertId]);
    res.send({ respuesta: respuesta });
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado - " + e });
  }
});

// GET '/libro/:id' - Requiere el dato especifico del libro por id, verifica que el id ingresado se encuentre en la base de datos.
router.get("/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM libro WHERE id=?";
    const respuesta = await qy(query, [req.params.id]);
    if (respuesta.length === 0) {
      throw new Error("No se encuentra ese libro");
    }
    res.send({ respuesta: respuesta });
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado - " + e });
  }
});

// PUT '/libro/prestar/:id' y {id:numero, persona_id:numero} devuelve 200 y {mensaje: "se presto correctamente"} o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva", "no se encontro el libro", "no se encontro la persona a la que se quiere prestar el libro"

router.put("/prestar/:id", async (req, res) => {
  try {
    let query = "SELECT * FROM libro WHERE id=?";
    let respuesta = await qy(query, [req.params.id]);
    console.log(respuesta);

    // consulto si el id existe en los usuarios
    let query_user = "SELECT id FROM persona WHERE id=?";
    let respuesta_user = await qy(query_user, [req.body.persona_id]);

    if (respuesta.length === 0) {
      throw new Error("No se encuentra ese libro.");
    }

    if (respuesta[0].persona_id != 0) {
      throw new Error(
        "El libro se encuentra prestado, no se puede prestar hasta que se devuelva."
      );
    }

    if (respuesta_user.length == 0) {
      throw new Error(
        "No se encuentra la persona a la que se quiere prestar el libro."
      );
    }

    // Realizo la modificacion.
    query = "UPDATE libro SET persona_id=? WHERE id=? ";
    respuesta = await qy(query, [req.body.persona_id, req.params.id]);

    // Devuelvo el dato modificado
    query = "SELECT * FROM libro WHERE id=?";
    respuesta = await qy(query, [req.params.id]);

    res.send({ respuesta: "Se presto correctamente" });
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado - " + e });
  }
});

// PUT '/libro/devolver/:id' y {} devuelve 200 y {mensaje: "se realizo la devolucion correctamente"} o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "ese libro no estaba prestado!", "ese libro no existe"
router.put("/devolver/:id", async (req, res) => {
  try {
    // consulto si el libro a devolver existe.
    let query = "SELECT * FROM libro WHERE id=?";
    let respuesta = await qy(query, [req.params.id]);

    if (respuesta.length == 0) {
      throw new Error("No se encuentra ese libro.");
    }

    if (respuesta[0].persona_id == 0) {
      throw new Error("El libro no se encuentra prestado.");
    }

    // Realizo la modificacion.
    query = "UPDATE libro SET persona_id=? WHERE id=? ";
    respuesta = await qy(query, [0, req.params.id]);

    // Devuelvo el dato modificado
    query = "SELECT * FROM libro WHERE id=?";
    respuesta = await qy(query, [req.params.id]);

    res.send({ respuesta: "Se realizo la devolucion correctamente" });
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado - " + e });
  }
});

// PUT '/libro/:id' - Requiere el dato especifico del libro por id, verifica que el id ingresado se encuentre
// en la base de datos y realiza la modificacion.
router.put("/:id", async (req, res) => {
  try {
    let query = "SELECT * FROM libro WHERE id=?";
    let respuesta = await qy(query, [req.params.id]);
    if (respuesta.length === 0) {
      throw new Error("No se encuentra ese libro");
    }

    // Realizo la modificacion.
    query = "UPDATE libro SET descripcion = ? WHERE id = ?";
    respuesta = await qy(query, [req.body.descripcion, req.params.id]);

    // Devuelvo el dato modificado
    query = "SELECT * FROM libro WHERE id=?";
    respuesta = await qy(query, [req.params.id]);
    res.send({ respuesta: respuesta });
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado - " + e });
  }
});

// DELETE '/libro/:id'
router.delete("/:id", async (req, res) => {
  try {
    let query = "SELECT * FROM libro WHERE id=?";
    let respuesta = await qy(query, [req.params.id]);
    if (respuesta.length == 0) {
      throw new Error("No se encuentra ese libro");
    }
    console.log(respuesta[0].persona_id);
    if (respuesta[0].persona_id > 0) {
      throw new Error("El libro se encuentra prestado");
    }

    // Realizo el borrado
    query = "DELETE FROM libro WHERE id=?";
    respuesta = await qy(query, [req.params.id]);
    res.send({ respuesta: "Se borro correctamente" });
  } catch (e) {
    res.status(413).send({ Error: "Error inesperado - " + e });
  }
});

module.exports = router;
