const express = require("express");
const libroRouter = require("./routes/libro");
const personaRouter = require("./routes/persona");
const categoriaRouter = require("./routes/categoria");
const cors = require('cors');
app.use(cors());


//Setting
const app = express();
const port = process.env.PORT || 3000;

//Middleswares
app.use(express.json());

// rutas
app.use("/libro", libroRouter);
app.use("/persona", personaRouter);
app.use("/categoria", categoriaRouter);

// Starting the server
app.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
