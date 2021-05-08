const express = require("express");
const router = express.Router();

const query = require("./categories.query");

/*
POST '/categoria' recibe: {nombre: string} retorna: status: 200, {id: numerico, nombre: string} 
- status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de
 categoria ya existe", "error inesperado"
*/
router.post("/", async (req, res) => {
  const nombre = req.body.nombre;

  try {
    // Valido que me manden correctamente la info
    if (!nombre) {
      throw new Error("Falta enviar el nombre de la categoria!");
    }

    // Verifico que no exista previamente una categoria con el mismo nombre
    if (await query.existeNombre(nombre)) {
      throw new Error("Esta categoria ya existe");
    }

    // Guardo nueva categoria
    const respuesta = await query.crearCategoria(nombre);
    res.send({ id: respuesta.insertId, nombre: nombre });
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ error: e.message });
  }
});

/*
GET '/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y []
*/
router.get("/", async (req, res) => {
  try {
    const respuesta = await query.traerCategorias();
    res.send(respuesta);
  } catch (e) {
    res.status(413).send({ error: "Error inesperado" });
  }
});

/*
GET '/categoria/:id' retorna: status 200 y {id: numerico, nombre:string} - status: 413,
 {mensaje: <descripcion del error>} que puede ser: "error inesperado", "categoria no encontrada"
*/

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const respuesta = await query.traerCategoriaPorId(id);

    if (!respuesta) {
      throw new Error("Error inesperado, la categoria no existe!");
    }

    res.send(respuesta);
  } catch (e) {
    console.error(e);
    res.status(413).send({ Error: e.message });
  }
});

/*
DELETE '/categoria/:id' retorna: status 200 y {mensaje: "se borro correctamente"} - 
status: 413, {mensaje: <descripcion del error>} que puese ser: "error inesperado", 
"categoria con libros asociados, no se puede eliminar", "no existe la categoria indicada"
*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const respuesta = await query.traerCategoriaPorId(id);

    if (!respuesta) {
      throw new Error("La categoria no existe.");
    }

    const existeLibros = await query.existeLibrosConCategoria(id);
    if (existeLibros) {
      throw new Error(
        "La categoria contiene libros asociados, no se puede eliminar."
      );
    }

    // Realizo el borrado
    await query.eliminarCategoria(id);

    res.send({
      mensaje: "La categoria ingresada se ha borrado correctamente."
    });
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

module.exports = router;
