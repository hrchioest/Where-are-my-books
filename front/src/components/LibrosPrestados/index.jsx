import React, { useState, useEffect } from "react";
import axios from "axios";

const LibrosPrestados = (persona_id) => {
  const [libros, setLibros] = useState([]);
  const url = "http://localhost:3000/persona";

  useEffect(async () => {
    const response = await axios.post(`${url}/persona/${persona_id}/libros`);
    setLibros(response.data);
  }, []);

  return (
    <>
      {libros ? (
        <ul>
          {libros.map((libro) => {
            <li key={libro.id}>{libro.nombre}</li>;
          })}
        </ul>
      ) : (
        <div>No tiene libros prestados</div>
      )}
    </>
  );
};

export default LibrosPrestados;
