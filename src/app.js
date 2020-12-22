const express = require("express");
const booksRouter = require("./routes/books");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");

//Setting
const app = express();
const port = process.env.PORT || 3000;

//Middleswares
app.use(express.json());

// rutas
app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);

// Starting the server
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
