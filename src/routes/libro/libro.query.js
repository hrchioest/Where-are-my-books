const conexion = require("../../dbConnection");

const util = require("util");
const qy = util.promisify(conexion.query).bind(conexion);

async function existeNombre(nombre){
    let query = "SELECT id FROM libro WHERE nombre = ?";
    let respuesta = await qy(query, [nombre]);

    return respuesta.length > 0
}

async function crearLibro(nombre, descripcion, categoria_id, persona_id){
    query = "INSERT INTO libro (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)";
    return await qy(query, [nombre, descripcion, categoria_id, persona_id]);
}

async function traerLibros(){
    const query = "SELECT libro.nombre, libro.descripcion, persona.alias, categoria.nombre AS categoria FROM libro, persona, categoria WHERE libro.persona_id = persona.id AND libro.categoria_id = categoria.id";
    return await qy(query);
}

async function traerLibroPorId(id){
    const query = "SELECT * FROM libro WHERE id = ?";
    const respuesta =  await qy(query, [id]);
    return respuesta.length === 1 ? respuesta[0] : null
} 

async function eliminarLibro(id){
    const query = "DELETE FROM libro WHERE id=?";
    return await qy(query, [id]);
}

async function actualizarLibro(id, descripcion){
    const query = "UPDATE libro SET descripcion = ? WHERE id = ?";
    return  await qy(query, [descripcion, id]);
}

async function prestarLibro(id, persona_id){
    query = "UPDATE libro SET persona_id=? WHERE id=? ";
    respuesta = await qy(query, [persona_id, id]);
}

async function devolverLibro(id){
    query = "UPDATE libro SET persona_id=null WHERE id=? ";
    respuesta = await qy(query, [id]);
}

module.exports = {
    existeNombre: existeNombre,
    crearLibro: crearLibro,
    traerLibros: traerLibros,
    traerLibroPorId: traerLibroPorId,
    actualizarLibro: actualizarLibro,
    eliminarLibro: eliminarLibro,
    prestarLibro: prestarLibro,
    devolverLibro: devolverLibro,
}
  