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

  const url = "http://localhost:3003";

  //Funciones de Personas:
  const getPersons = async () => {
    try{
      const response = await axios.get(`${url}/persona`);
      setPersons(response.data);
    }catch(e){
      console.error('API /persona no response');
      setPersons([]);
    }
  };

  const getBooksByPerson = async (persona_id) => {
    try{
      const response = await axios.get(`${url}/persona/${persona_id}/libros`);
      return response.data; 
    }catch(e){
      console.error(`API /persona/${persona_id}/libros no response`);
      return [];
    }
  };

  const getPersonId = async (id) => {
    try{
      const response = await axios.get(`${url}/persona/${id}`);
      setPersonEdit(response.data);
    }catch(e){
      console.error(`API /persona/${id} no response`);
      return {};
    }
  };

  const postPersons = async (person) => {
    try{
      return await axios.post(`${url}/persona`, person);
    }catch(e){
      return e.response.data;
    }
  };

  const putPersons = async (id, person) => {
    try{
      return await axios.put(`${url}/persona/${id}`, person);
    }catch(e){
      return e.response.data;
    }
  };

  const deletePersons = async (id) => {
    try{
      return await axios.delete(`${url}/persona/${id}`);
    }catch(e){
      return e.response.data;
    }
  };

  //Funciones de libros:
  const getBooks = async () => {
    try{
      const libroResponse = await axios.get(`${url}/libro`);
      const books = await Promise.all(libroResponse.data.map( async (book) => {
        let persona = null;
        if(book.persona_id){
            const personaResponse = await axios.get(`${url}/persona/${book.persona_id}`);
            persona = personaResponse.data;
        }
  
        let categoria = null;
        if(book.categoria_id){
          const categoriaResponse = await axios.get(`${url}/categoria/${book.categoria_id}`);
          categoria = categoriaResponse.data;
        }      
        return {...book, persona, categoria};
      }))
      setBooks(books);
    }catch(e){
      console.error('API /libro no response');
      setBooks([]);
    }

  };
  const deleteBooks = async (id) => {
    try{
      return await axios.delete(`${url}/libro/${id}`);
    }catch(e){
      return e.response.data;
    }
  };

  const getBookId = async (id) => {
    const response = await axios.get(`${url}/libro/${id}`);
    setBookEdit(response.data);
  };

  const putBook = async (id, libro) => {
    try{
      await axios.put(`${url}/libro/${id}`, libro);
    }catch(e){
      return e.response.data;
    }
  };

  const postBook = async (libro) => {
    try{
      return await axios.post(`${url}/libro`, libro);
    }catch(e){
      return e.response.data;
    }
  };

  const putLeadBook = async (bookId, personId) => {
    try{
      return await axios.put(`${url}/libro/prestar/${bookId}`, {persona_id: personId});
    }catch(e){
      return e.response.data;
    }
  };

  const putReturnBook = async (bookId) => {
    try{
      return await axios.put(`${url}/libro/devolver/${bookId}`);
    }catch(e){
      return e.response.data;
    }
  };

  
  const getCategories = async () => {

    try{      
      const categoriesResponse = await axios.get(`${url}/categoria`);
      const categories = await Promise.all(categoriesResponse.data.map( async (category) => {
        const libroResponse = await axios.get(`${url}/libro?categoria_id=${category.id}`);
        return {...category, libros: libroResponse.data};
      }))
      setCategories(categories);

    }catch(e){
      console.error('API /categoria no response');
      setCategories([]);
    }
  }
  
  const deleteCategory = async (id) => {
    try{
      return await axios.delete(`${url}/categoria/${id}`);
    }catch(e){
      return e.response.data;
    }
  };


  const getCategoryId = async (id) => {
    try{
      const response = await axios.get(`${url}/categoria/${id}`);
      setCategoryEdit(response.data);
    }catch(e){
      console.error(`API /categoria/${id} no response`);
      setCategories([]);
    }
  };

  const postCategory = async (category) => {
    try{
      return await axios.post(`${url}/categoria`, category);
    }catch(e){
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
        setCategoryEdit,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
