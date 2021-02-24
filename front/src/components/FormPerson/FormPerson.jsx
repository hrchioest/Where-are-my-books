import React, { useEffect } from "react";
import { DataContext } from "../../context/dataContext";
import LibrosPrestados from "../LibrosPrestados";
import axios from "axios";

const FormPerson = () => {
  const { personas, getPersonas } = React.useContext(DataContext);

  const handleDelete = async (id) => {
    const url = "http://localhost:3000";
    const response = await axios.delete(`${url}/persona/${id}`);
    return response.data;
  };

  useEffect(() => {
    getPersonas();
  }, [getPersonas]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Email</td>
            <td>Alias</td>
            <td>Libros prestados</td>
            <td>Action</td>
          </tr>
        </thead>
        {personas.map((persona) => (
          <tbody key={persona.id}>
            <tr>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.email}</td>
              <td>{persona.alias}</td>
              <td>
                <LibrosPrestados persona_id={persona.id} />
              </td>
              <td>
                <button onClick={() => handleDelete(persona.id)}>
                  eliminar
                </button>
                <button>editar</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default FormPerson;
