const mysql = require("mysql");
require("dotenv").config();

const conexion = mysql.createConnection({
  host: "localhost",
  user: 'root',//process.env.DB_USER,
  password: '',//process.env.DB_PASS,
  database: "mybooks"
});

conexion.connect((error) => {
  if (error) {
    throw error;
  }

  console.log("Conexión con la base de datos mysql establecida");
});

module.exports = conexion;
