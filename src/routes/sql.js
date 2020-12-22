const mysql = require("mysql");

module.exports= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // en mi caso SQL esta sin contraseña
    database: "mybooks" 
})