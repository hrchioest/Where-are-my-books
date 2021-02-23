import React, { useState, useEffect } from "react";
import axios from "axios";

const LibrosPrestados = ({ persona_id }) => {
  const [libros, setLibros] = useState([]);
  console.log({ persona_id });
  const url = "http://localhost:3000";

  useEffect(async () => {
    const response = await axios.get(`${url}/persona/${persona_id}/libros`);
    setLibros(response.data);
  }, [persona_id]);

  return (
    <>
      {libros.length > 0 ? (
        <ul>
          {libros.map((libro) => {
            return <li key={libro.id}>{libro.nombre}</li>;
          })}
        </ul>
      ) : (
        <div>No tiene libros prestados</div>
      )}
    </>
  );
};

export default LibrosPrestados;
