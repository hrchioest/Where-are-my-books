import React, { useState } from "react";
import axios from "axios";

export const DataContext = React.createContext();

export const useDataContext = () => React.useContext(DataContext);

export const DataProvider = (props) => {
  const [persons, setPersons] = useState([]);
  const [books, setBooks] = useState([]);
  const [personEdit, setPersonEdit] = useState({
    nombre: "",
    apellido: "",
    email: "",
    alias: ""
  });

  const url = "http://localhost:3000";

  //Funciones de Personas:
  const getPersons = async () => {
    const response = await axios.get(`${url}/persona`);
    setPersons(response.data);
  };

  const getBooksByPerson = async (persona_id) => {
    const response = await axios.get(`${url}/persona/${persona_id}/libros`);
    return response.data;
  };

  const getPersonId = async (id) => {
    const response = await axios.get(`${url}/persona/${id}`);
    setPersonEdit(response.data);
  };

  const postPersons = async (person) => {
    await axios.post(`${url}/persona`, person);
  };

  const putPersons = async (id, person) => {
    await axios.put(`${url}/persona/${id}`, person);
  };

  const deletePersons = async (id) => {
    await axios.delete(`${url}/persona/${id}`);
  };

  const hasBooksPerson = async (id) => {
    return (await getBooksByPerson(id).length) > 0;
  };

  //Funciones de libros:
  const getBooks = async () => {
    const response = await axios.get(`${url}/libro`);
    setBooks(response.data);
  };
  const deleteBooks = async (id) => {
    await axios.delete(`${url}/persona/${id}`);
  };
  // const getPersonByBook = async (persona_id) => {
  //   const response = await axios.get(`${url}/libro/${persona_id}/libros`);
  //   return response.data;
  // };

  return (
    <DataContext.Provider
      value={{
        persons,
        books,
        getBooks,
        getPersons,
        getPersonId,
        personEdit,
        setPersonEdit,
        postPersons,
        putPersons,
        getBooksByPerson,
        deletePersons,
        hasBooksPerson,
        deleteBooks
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
