const express = require("express");
const mysql = require("mysql");
const util = require("util");

//Setting
const app = express();
const port = process.env.PORT || 3000;

//Middleswares
app.use(express.json());

// Conexion con mysql
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mybooks"
});

conexion.connect((error) => {
  if (error) {
    throw error;
  }

  console.log("Conexion con la base de datos mysql establecida");
});

const qy = util.promisify(conexion.query).bind(conexion); // permite el uso de asyn-await en la conexion mysql

//Routes
app.use(require("./routes/books"));
app.use(require("./routes/users"));
app.use(require("./routes/categories"));

// Starting the server
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
