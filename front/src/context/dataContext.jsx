import React, { useState } from "react";
import axios from "axios";

export const DataContext = React.createContext();

export const useDataContext = () => React.useContext(DataContext);

export const DataProvider = (props) => {
  const [personas, setPersonas] = useState([]);
  const [personaEditar, setPersonaEditar] = useState({
    nombre: "",
    apellido: "",
    email: "",
    alias: ""
  });

  const url = "http://localhost:3000";
  const getPersonas = async () => {
    const response = await axios.get(`${url}/persona`);
    setPersonas(response.data);
  };

  const getLibrosPorPersona = async (persona_id) => {
    const response = await axios.get(`${url}/persona/${persona_id}/libros`);
    return response.data;
  };

  const getPersonId = async (id) => {
    const response = await axios.get(`${url}/persona/${id}`);
    setPersonaEditar(response.data);
  };

  const postPersonas = async (person) => {
    await axios.post(`${url}/persona`, person);
  };

  const putPersonas = async (id, person) => {
    await axios.put(`${url}/persona/${id}`, person);
  };

  const deletePersonas = async (id) => {
    await axios.delete(`${url}/persona/${id}`);
  };

  const hasBooksPerson = async (id) => {
    return (await getLibrosPorPersona(id).length) > 0;
  };

  return (
    <DataContext.Provider
      value={{
        personas,
        getPersonas,
        getPersonId,
        personaEditar,
        setPersonaEditar,
        postPersonas,
        putPersonas,
        getLibrosPorPersona,
        deletePersonas,
        hasBooksPerson
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
