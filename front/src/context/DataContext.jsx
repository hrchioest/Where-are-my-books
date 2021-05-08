import React, { useState } from "react";
import axios from "axios";

export const DataContext = React.createContext();

export const useDataContext = () => React.useContext(DataContext);

export const DataProvider = (props) => {
  const [persons, setPersons] = useState([]);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [personEdit, setPersonEdit] = useState({
    nombre: "",
    apellido: "",
    email: "",
    alias: ""
  });

  const [bookEdit, setBookEdit] = useState({
    nombre: "",
    descripcion: "",
    categoria_id: "",
    persona_id: ""
  });

  const [categoryEdit, setCategoryEdit] = useState({
    nombre: ""
  });

  const url = "http://localhost:3000";

  //Funciones de Personas:
  const getPersons = async () => {
    try {
      const response = await axios.get(`${url}/persons`);
      setPersons(response.data);
    } catch (e) {
      console.error("API /persons no response");
      setPersons([]);
    }
  };

  const getBooksByPerson = async (persona_id) => {
    try {
      const response = await axios.get(`${url}/persons/${persona_id}/books`);
      return response.data;
    } catch (e) {
      console.error(`API /persons/${persona_id}/books no response`);
      return [];
    }
  };

  const getPersonId = async (id) => {
    try {
      const response = await axios.get(`${url}/persons/${id}`);
      setPersonEdit(response.data);
    } catch (e) {
      console.error(`API /persons/${id} no response`);
      return {};
    }
  };

  const postPersons = async (person) => {
    try {
      return await axios.post(`${url}/persons`, person);
    } catch (e) {
      return e.response.data;
    }
  };

  const putPersons = async (id, person) => {
    try {
      return await axios.put(`${url}/persons/${id}`, person);
    } catch (e) {
      return e.response.data;
    }
  };

  const deletePersons = async (id) => {
    try {
      return await axios.delete(`${url}/persons/${id}`);
    } catch (e) {
      return e.response.data;
    }
  };

  //Funciones de libros:
  const getBooks = async () => {
    try {
      const libroResponse = await axios.get(`${url}/books`);
      const books = await Promise.all(
        libroResponse.data.map(async (book) => {
          let persona = null;
          if (book.persona_id) {
            const personaResponse = await axios.get(
              `${url}/persons/${book.persona_id}`
            );
            persona = personaResponse.data;
          }

          let categoria = null;
          if (book.categoria_id) {
            const categoriaResponse = await axios.get(
              `${url}/categories/${book.categoria_id}`
            );
            categoria = categoriaResponse.data;
          }
          return { ...book, persona, categoria };
        })
      );
      setBooks(books);
    } catch (e) {
      console.error("API /book no response");
      setBooks([]);
    }
  };
  const deleteBooks = async (id) => {
    try {
      return await axios.delete(`${url}/books/${id}`);
    } catch (e) {
      return e.response.data;
    }
  };

  const getBookId = async (id) => {
    const response = await axios.get(`${url}/books/${id}`);
    setBookEdit(response.data);
  };

  const putBook = async (id, book) => {
    try {
      await axios.put(`${url}/books/${id}`, book);
    } catch (e) {
      return e.response.data;
    }
  };

  const postBook = async (book) => {
    try {
      return await axios.post(`${url}/books`, book);
    } catch (e) {
      return e.response.data;
    }
  };

  const putLeadBook = async (bookId, personId) => {
    try {
      return await axios.put(`${url}/books/lend/${bookId}`, {
        persona_id: personId
      });
    } catch (e) {
      return e.response.data;
    }
  };

  const putReturnBook = async (bookId) => {
    try {
      return await axios.put(`${url}/books/lend/${bookId}`);
    } catch (e) {
      return e.response.data;
    }
  };

  //Funciones de Categorias
  const getCategories = async () => {
    try {
      const categoriesResponse = await axios.get(`${url}/categories`);
      const categories = await Promise.all(
        categoriesResponse.data.map(async (category) => {
          const libroResponse = await axios.get(
            `${url}/books?categoria_id=${category.id}`
          );
          return { ...category, libros: libroResponse.data };
        })
      );
      setCategories(categories);
    } catch (e) {
      console.error("API /categorie no response");
      setCategories([]);
    }
  };

  const deleteCategory = async (id) => {
    try {
      return await axios.delete(`${url}/categories/${id}`);
    } catch (e) {
      return e.response.data;
    }
  };

  const getCategoryId = async (id) => {
    try {
      const response = await axios.get(`${url}/categories/${id}`);
      setCategoryEdit(response.data);
    } catch (e) {
      console.error(`API /categories/${id} no response`);
      setCategories([]);
    }
  };

  const postCategory = async (category) => {
    try {
      return await axios.post(`${url}/categories`, category);
    } catch (e) {
      return e.response.data;
    }
  };

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
        deleteBooks,
        getBookId,
        bookEdit,
        setBookEdit,
        putBook,
        postBook,
        putLeadBook,
        putReturnBook,
        categories,
        getCategories,
        deleteCategory,
        getCategoryId,
        postCategory,
        categoryEdit,
        setCategoryEdit
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
