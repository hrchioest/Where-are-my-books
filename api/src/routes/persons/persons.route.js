const express = require("express");
const router = express.Router();

const query = require("./persons.query");
/*
POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} 
retorna: status: 200, {id: numérico, nombre: string, apellido: string, alias: string, email: string}
- status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se
encuentra registrado", "error inesperado"
*/

router.post("/", async (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const alias = req.body.alias;
  const email = req.body.email;

  try {
    // Valido que me manden correctamente la info
    if (!nombre || !apellido || !alias || !email) {
      throw new Error("Falta enviar datos, todos los datos son requeridos");
    }

    // Verifico que no exista previamente un usuario con el mismo email
    const existeEmail = await query.existeEmail(email);
    if (existeEmail) {
      throw new Error("El email ya existe");
    }

    // Guardo nuevo usuario
    const respuesta = await query.crearPersona(nombre, apellido, alias, email);
    const persona = await query.traerPersonaPorId(respuesta.insertId);
    res.send(persona);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ error: e.message });
  }
});

/*
GET '/persona' retorna status 200 y [{id: numérico, nombre: string, apellido: string, 
alias: string, email; string}] o bien status 413 y []*
 */

router.get("/", async (req, res) => {
  try {
    const personas = await query.traerPersonas();
    res.send(personas);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ error: "Error inesperado" });
  }
});

/*
GET '/persona/:id' retorna status 200 y {id: numérico, nombre: string, apellido: string,
alias: string, email; string} - status 413 , {mensaje: <descripción del error>}
"error inesperado", "no se encuentra esa persona"
 */

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const persona = await query.traerPersonaPorId(id);
    res.send(persona);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ error: e.message });
  }
});

router.get("/:id/books", async (req, res) => {
  const id = req.params.id;
  try {
    const libros = await query.traerLibrosPorPersona(id);
    res.send(libros);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ error: e.message });
  }
});

/*
 PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string}
 el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413, 
 {mensaje: <descripción del error>} "error inesperado", "no se encuentra esa persona"
*/

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const alias = req.body.alias;

  try {
    // Validando que no se envia email para modificar
    if ("email" in req.body) {
      throw new Error("El mail no se puede modificar");
    }

    //verificando si existe la persona solicitada
    const existePersona = await query.traerPersonaPorId(id);
    if (!existePersona) {
      throw new Error("No se encuentra esa persona");
    }

    await query.actualizarPersona(id, nombre, apellido, alias);

    // Para retornar el objeto modificado con sus respectivos datos
    const persona = await query.traerPersonaPorId(id);
    res.send(persona);
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ error: e.message });
  }
});

/*
DELETE '/persona/:id' retorna: 200 y {mensaje: "se borro correctamente"} o bien 413, 
{mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa 
persona tiene libros asociados, no se puede eliminar"
*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const existePersona = await query.traerPersonaPorId(id);
    if (!existePersona) {
      throw new Error("No se encuentra esa persona");
    }

    const existeLibros = await query.existeLibrosConPersona(id);
    if (existeLibros) {
      throw new Error(
        "La persona contiene libros asociados, no se puede eliminar."
      );
    }

    await query.eliminarPersona(id);

    res.send({
      mensaje: "La persona con el id ingresado se borró correctamente."
    });
  } catch (e) {
    console.error(e.message);
    res.status(413).send({ error: e.message });
  }
});

module.exports = router;
