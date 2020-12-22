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

// rutas
app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

// Starting the server
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});

