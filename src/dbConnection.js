const mysql = require("mysql");
require("dotenv").config();

const conexion = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: "mybooks"
});

conexion.connect((error) => {
  if (error) {
    throw error;
  }

  console.log("Conexión con la base de datos mysql establecida");
});

module.exports = conexion;
