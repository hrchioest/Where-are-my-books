const express = require("express");
const cors = require("cors");

const libroRouter = require("./routes/libro/libro.route");
const personaRouter = require("./routes/persona/persona.route");
const categoriaRouter = require("./routes/categoria/categoria.route");

//Setting
const app = express();
const port = process.env.PORT || 3000;

//Middleswares
app.use(express.json());

//Cors
app.use(cors());

// rutas
app.use("/libro", libroRouter);
app.use("/persona", personaRouter);
app.use("/categoria", categoriaRouter);

// Starting the server
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
