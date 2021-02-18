const conexion = require("../../dbConnection");

const util = require("util");
const qy = util.promisify(conexion.query).bind(conexion);

async function existeEmail(email) {
  const query = "SELECT id FROM persona WHERE email = ?";
  const respuesta = await qy(query, [email]);

  return respuesta.length > 0;
}

async function crearPersona(nombre, apellido, alias, email) {
  const query =
    "INSERT INTO persona (nombre, apellido, alias, email) VALUE (?,?,?,?)";
  return await qy(query, [nombre, apellido, alias, email]);
}

async function traerPersonas() {
  const query = "SELECT * FROM persona";
  return await qy(query);
}

async function traerPersonaPorId(id) {
  const query = "SELECT * FROM persona WHERE id = ?";
  const respuesta = await qy(query, [id]);
  return respuesta.length === 1 ? respuesta[0] : null;
}

async function eliminarPersona(id) {
  const query = "DELETE FROM persona WHERE id=?";
  return await qy(query, [id]);
}

async function actualizarPersona(id, nombre, apellido, alias) {
  const query =
    "UPDATE persona SET nombre = ?, apellido = ?, alias = ? WHERE id = ?";
  return await qy(query, [nombre, apellido, alias, id]);
}

async function existeLibrosConPersona(id) {
  const query = "SELECT * FROM libro WHERE persona_id = ?";
  const respuesta = await qy(query, [id]);
  return respuesta.length > 0;
}

module.exports = {
  existeEmail: existeEmail,
  crearPersona: crearPersona,
  traerPersonas: traerPersonas,
  actualizarPersona: actualizarPersona,
  traerPersonaPorId: traerPersonaPorId,
  eliminarPersona: eliminarPersona,
  existeLibrosConPersona: existeLibrosConPersona
};
