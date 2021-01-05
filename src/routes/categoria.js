const express = require("express");
const router = express.Router();

const util = require("util");
const conexion = require("../dbConnection");
const qy = util.promisify(conexion.query).bind(conexion);
  
/*
POST '/categoria' recibe: {nombre: string} retorna: status: 200, {id: numerico, nombre: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoria ya existe", "error inesperado"
*/

router.post("/", async (req, res) => {
  try {
    // Valido que me manden correctamente la info
    if (!req.body.nombre) {
      throw new Error("Falta enviar el nombre de la categoria!");
    }

    // Verifico que no exista previamente una categoria con el mismo nombre
    let query = "SELECT id FROM categoria WHERE nombre = ?";

    let respuesta = await qy(query, [req.body.nombre]);

    if (respuesta.length > 0) {
      throw new Error("Esta categoria ya existe");
    }

    // Guardo nueva categoria
    query = "INSERT INTO `categoria` (`nombre`) VALUES (?)";
    respuesta = await qy(query, [req.body.nombre]);
    res.send({ respuesta: respuesta.insertId });

  } catch (e) {
    console.error(e.message);
    res.status(413).send({ Error: e.message });
  }
});


/*
GET '/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y []
*/

router.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM categoria";
        const respuesta = await qy (query);
        res.send({respuesta: respuesta});
        console.log("respuesta", respuesta);     
    } catch (e) {
        res.status(413).send({Error: "Error inesperado"});
    }
});

/*
GET '/categoria/:id' retorna: status 200 y {id: numerico, nombre:string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "error inesperado", "categoria no encontrada"
*/

router.get("/:id", async (req, res) => {
    try {
        const query = "SELECT * FROM categoria WHERE id = ?";
        const respuesta = await qy(query, [req.params.id]);
        if(respuesta.length == 0){
            throw new Error("Error inesperado, la categoria no existe!");
        }
        res.send({respuesta: respuesta});
    } catch (e) {
        console.error(e.message);
        res.status(413).send({Error: e.message});
    }
});


/*
DELETE '/categoria/:id' retorna: status 200 y {mensaje: "se borro correctamente"} - status: 413, {mensaje: <descripcion del error>} que puese ser: "error inesperado", "categoria con libros asociados, no se puede eliminar", "no existe la categoria indicada"
*/

router.delete('/:id', async (req, res, next) => {
  try{
      let query="SELECT *egoria WHERE id=?";
      let respuesta=await qy(query,[req.params.id]);
      if(respuesta.length==0){
          throw new Error("La categoria no existe.") 
      } 
      
      // Realizo el borrado
      query="DELETE FROM categoria WHERE id=?"
      respuesta=await qy(query,[req.params.id])
      res.send("La categoria ingresada se ha borrado correctamente de la base de datos.");
  }
  catch(e){
      res.status(413).send({Error:"Error inesperado - "+e});
  }
});


module.exports = router;