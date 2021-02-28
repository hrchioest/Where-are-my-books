const express = require("express");
const router = express.Router();

const query = require("./libro.query");
const queryCategoria = require("../categoria/categoria.query");
const queryPersona = require("../persona/persona.query");

/*
GET '/libro' - Devuelve todos los libros o mensaje de error con status 413.
*/
router.get("/", async (req, res) => {
  try {
    const respuesta = await query.traerLibros();
    res.send(respuesta);
  } catch (e) {
    res.status(413).send({ error: "Error inesperado" });
  }
});

/*
POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}
devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}
o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe",
"nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"
*/

router.post("/", async (req, res) => {
  const nombre = req.body.nombre;
  const categoria_id = req.body.categoria_id;
  let persona_id = req.body.persona_id;
  const descripcion = req.body.descripcion || "";

  try {
    // Verifico que se pasen todos los datos requeridos.
    if (!nombre || !categoria_id) {
      throw new Error("Los campos nombre y categoria_id son obligatorios");
    }

    // Verifico que el nombre del libro no esté registrado
    const existeNombre = await query.existeNombre(nombre);
    if (existeNombre) {
      throw new Error("Ese libro ya existe");
    }

    // consulto si el id existe en categorias de libros
    const existeCategoria = await queryCategoria.traerCategoriaPorId(
      categoria_id
    );
    if (!existeCategoria) {
      throw new Error("No existe la categoría indicada");
    }

    // Verifico si persona_id es numerico y valido si corresponde a un usuario registrado sino sería null
    // y al ser null sería un libro que no lo tiene ninguna persona.
    if (Number.isInteger(persona_id)) {
      const persona = await queryPersona.traerPersonaPorId(persona_id);
      if (!persona) throw new Error("No existe la persona indicada");
    } else {
      persona_id = null;
    }

    // Si todo lo anterior esta correcto se procede al guardado en la DB y persona_id se guardará siendo validada
    //anteriormente.
    const respuesta = await query.crearLibro(
      nombre,
      descripcion,
      categoria_id,
      persona_id
    );

    //Devolviendo los datos ingresados del nuevo libro
    const libro = await query.traerLibroPorId(respuesta.insertId);

    res.send(libro);
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

/*
GET '/libro/:id' - Requiere el dato especifico del libro por id, verifica que el id ingresado se
encuentre en la base de datos.
*/
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const libro = await query.traerLibroPorId(id);

    if (!libro) {
      throw new Error("No se encuentra ese libro");
    }

    res.send(libro);
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

// router.get("/:id", async (req, res) =>{
//   const id= req.params.id;
//   try{
//     const persona = await query.traerPersonaPorLibro(id);
//     res.send(persona)
//   }catch (e) {
//     console.error(e.message);
//     res.status(413).send({ error: e.message });
//   }
// }
/* 
PUT '/libro/:id' y {id: numero, nombre:string, descripcion:string, categoria_id:numero,
persona_id:numero/null} devuelve status 200 y {id: numero, nombre:string, descripcion:string,
categoria_id:numero, persona_id:numero/null} modificado o bien status 413, {mensaje: 
<descripcion del error>} "error inesperado","solo se puede modificar la descripcion del libro"
*/
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const descripcion = req.body.descripcion;

  try {
    if (
      "nombre" in req.body ||
      "categoria_id" in req.body ||
      "persona_id" in req.body
    ) {
      throw new Error("Sólo se puede modificar la descripción del libro");
    }

    const existeLibro = await query.traerLibroPorId(id);
    if (!existeLibro) {
      throw new Error("No se encuentra ese libro");
    }

    // Realizo la modificacion.
    const respuesta = await query.actualizarLibro(id, descripcion);

    // Devuelvo el dato modificado
    const libro = await query.traerLibroPorId(id);
    res.send(libro);
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

/*
DELETE '/libro/:id' devuelve 200 y {mensaje: "se borro correctamente"}  o bien status 413,
{mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro", "ese 
libro esta prestado no se puede borrar"
*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const libro = await query.traerLibroPorId(id);
    if (!libro) {
      throw new Error("No se encuentra ese libro.");
    }

    if (libro.persona_id) {
      throw new Error("El libro se encuentra prestado, no se puede borrar");
    }

    // Realizo el borrado
    await query.eliminarLibro(id);

    res.send({ mensaje: "Se borró correctamente" });
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

/*
PUT '/libro/prestar/:id' y {id:numero, persona_id:numero} devuelve 200 y {mensaje: "se presto correctamente"}
o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "el libro ya se encuentra prestado,
no se puede prestar hasta que no se devuelva", "no se encontro el libro", "no se encontro la persona a la que 
se quiere prestar el libro"
*/
router.put("/prestar/:id", async (req, res) => {
  const id = req.params.id;
  const persona_id = req.body.persona_id;

  try {
    const existePersona = await queryPersona.traerPersonaPorId(persona_id);
    if (!existePersona) {
      throw new Error(
        "No se encuentra la persona a la que se quiere prestar el libro."
      );
    }

    const libro = await query.traerLibroPorId(id);
    if (!libro) {
      throw new Error("No se encuentra ese libro.");
    }

    if (libro.persona_id != null) {
      throw new Error(
        "El libro se encuentra prestado, no se puede prestar hasta que se devuelva."
      );
    }

    await query.prestarLibro(id, persona_id);
    res.send({ mensaje: "Se presto correctamente" });
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

/*
PUT '/libro/devolver/:id' y {} devuelve 200 y {mensaje: "se realizo la devolucion correctamente"} 
o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "ese libro no estaba 
prestado!", "ese libro no existe"
*/
router.put("/devolver/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // consulto si el libro a devolver existe.
    const libro = await query.traerLibroPorId(id);
    if (!libro) {
      throw new Error("No se encuentra ese libro.");
    }

    if (libro.persona_id === null) {
      throw new Error("El libro no se encuentra prestado.");
    }

    await query.devolverLibro(id);

    res.send({ mensaje: "Se realizó la devolución correctamente" });
  } catch (e) {
    res.status(413).send({ error: e.message });
  }
});

module.exports = router;
