const conexion = require("../../dbConnection");

const util = require("util");
const qy = util.promisify(conexion.query).bind(conexion);

async function existeNombre(nombre) {
  let query = "SELECT id FROM categoria WHERE nombre = ?";
  let respuesta = await qy(query, [nombre]);

  return respuesta.length > 0;
}

async function crearCategoria(nombre) {
  query = "INSERT INTO `categoria` (`nombre`) VALUES (?)";
  return await qy(query, [nombre]);
}

async function traerCategorias() {
  const query = "SELECT * FROM categoria";
  return await qy(query);
}

async function traerCategoriaPorId(id) {
  const query = "SELECT * FROM categoria WHERE id = ?";
  const respuesta = await qy(query, [id]);
  return respuesta.length === 1 ? respuesta[0] : null;
}

async function existeLibrosConCategoria(id) {
  const query = "SELECT * FROM libro WHERE categoria_id = ?";
  const respuesta = await qy(query, [id]);
  return respuesta.length > 0;
}

async function eliminarCategoria(id) {
  query = "DELETE FROM categoria WHERE id=?";
  return await qy(query, [id]);
}

module.exports = {
  existeNombre: existeNombre,
  crearCategoria: crearCategoria,
  traerCategorias: traerCategorias,
  traerCategoriaPorId: traerCategoriaPorId,
  eliminarCategoria: eliminarCategoria,
  existeLibrosConCategoria: existeLibrosConCategoria
};
