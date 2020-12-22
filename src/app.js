const express = require("express");
const mysql = require("mysql");
const util = require("util");
const booksRouter=require("./routes/books");
const usersRouter=require("./routes/users");
const categoriesRouter=require("./routes/categories");
const port=3000

//Setting
const app = express();
app.set("port", process.env.PORT || 3000);

//Middleswares
app.use(express.json());

// Conexion con mysql
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // en mi caso SQL esta sin contraseña
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


app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

// Starting the server
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
