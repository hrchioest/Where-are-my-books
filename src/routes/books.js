const express = require("express");
const router = express.Router();
const conexion = require("./sql");
const util = require("util");

const qy = util.promisify(conexion.query).bind(conexion); // permite el uso de asyn-await en la conexion mysql

/*
POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe", "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"

GET '/libro/:id' devuelve 200 {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} y status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro"

PUT '/libro/:id' y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve status 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado",  "solo se puede modificar la descripcion del libro

PUT '/libro/prestar/:id' y {id:numero, persona_id:numero} devuelve 200 y {mensaje: "se presto correctamente"} o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva", "no se encontro el libro", "no se encontro la persona a la que se quiere prestar el libro"

PUT '/libro/devolver/:id' y {} devuelve 200 y {mensaje: "se realizo la devolucion correctamente"} o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "ese libro no estaba prestado!", "ese libro no existe"

DELETE '/libro/:id' devuelve 200 y {mensaje: "se borro correctamente"}  o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro", "ese libro esta prestado no se puede borrar"

*/

// GET '/libro' - Devuelve todos los libros o mensaje de error con status 413.
router.get('/', async (req, res, next) => {
    try{
        const query="SELECT * FROM books";
        const respuesta=await qy(query);
        res.send({"respuesta":respuesta});
    }
    catch(e){
        console.log(e.messange)
        res.status(413).send({Error:"Error inesperado"});
    }
})

// POST '/libro' - Recibe, nombre y descripcion como string, también recibe categoria_id y persona_id como int
// Verifica que se hayan pasado todos los datos y ademas que la categoria y la persona existan.
router.post('/', async (req, res, next) => {
    try{
        // Verifico que se pasen todos los datos requeridos.
        if(!req.body.nombre || !req.body.descripcion || !req.body.categoria_id /* || !req.body.persona_id*/){
            throw new Error("Todos los campos (nombre, descripcion, categoria_id y persona_id son obligatorios")
        }

        // consulto si el id existe en categorias de libros
        let query_cat="SELECT id FROM categories WHERE id=?";
        let respuesta_cat=await qy(query_cat,[req.body.categoria_id]);
        console.log(respuesta_cat)

        // consulto si el id existe en los usuarios o si es null (que nadie tiene asignado el libro)
        let query_user="SELECT id FROM users WHERE id=?";
        let respuesta_user=await qy(query_user,[req.body.persona_id]);
        console.log(respuesta_user)
        
        // Verifico primero si el valor de persona_id no es "null" ya que significa que nadie lo tiene reservado.
        // Si no es "null" verifico si la persona que lo tiene reservado existe en la tabla users
        if(req.body.persona_id!="null"){
            if(respuesta_cat.length==0 || respuesta_user.length==0) {
                throw new Error("El id de la categoria o de la persona indicada no existe")            
                }
        }
        // Si todo lo anterior esta correcto se procede al guardado en la DB
        query="INSERT INTO books (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)";
        respuesta=await qy(query,[req.body.nombre,req.body.descripcion,req.body.categoria_id,req.body.persona_id])
        console.log(respuesta)
        res.send({"respuesta":respuesta});
    }
    catch(e){
        console.log(e.messange)
        res.status(413).send({Error:"Error inesperado"});
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const query="SELECT * FROM books WHERE id=?";
        const respuesta=await qy(query,[req.params.id]);
        res.send({"respuesta":respuesta});
    }
    catch(e){
        console.log(e.messange)
        res.status(413).send({Error:"Error inesperado"});
    }
})


module.exports = router;
