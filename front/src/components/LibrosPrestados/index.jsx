import React, { useState, useEffect } from "react";
import { DataContext } from "../../context/dataContext";

const LibrosPrestados = ({ persona_id }) => {
  const { getLibrosPorPersona } = React.useContext(DataContext);

  const [libros, setLibros] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setLibros(await getLibrosPorPersona(persona_id));
    }
    fetchData();
  }, []);

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
