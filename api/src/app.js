const express = require("express");
const cors = require("cors");

const booksRouter = require("./routes/books/books.route");
const personsRouter = require("./routes/persons/persons.route");
const categoriesRouter = require("./routes/categories/categories.route");

//Setting
const app = express();
const port = process.env.PORT || 3000;

//Middleswares
app.use(express.json());

//Cors
app.use(cors());

// rutas
app.use("/books", booksRouter);
app.use("/persons", personsRouter);
app.use("/categories", categoriesRouter);

// Starting the server
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
