import React, { useState } from "react";
import { DataContext } from "../../context/dataContext";
import axios from "axios";

const FormAdd = () => {
  const { getPersonas } = React.useContext(DataContext);
  const [person, setPerson] = useState({
    nombre: "",
    apellido: "",
    email: "",
    alias: "",
    libro_prestado: ""
  });
  const url = "http://localhost:3000";

  const handleData = (e) => {
    let { name, value } = e.target;

    setPerson((state) => {
      return { ...state, [name]: value };
    });
  };

  const addForm = async () => {
    try {
      await axios.post(`${url}/persona`, person);
      getPersonas();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <br />
      <br />
      <label htmlFor=''>Nombre</label>
      <input type='text' name='nombre' onChange={handleData} />
      <br />
      <label htmlFor=''>Apellido</label>
      <input type='text' name='apellido' onChange={handleData} />
      <br />
      <label htmlFor=''>Mail</label>
      <input type='email' name='email' onChange={handleData} />
      <br />
      <label htmlFor=''>Alias</label>
      <input type='text' name='alias' onChange={handleData} />
      <label htmlFor=''>Libro Prestado</label>
      <input type='text' name='libro_prestado' onChange={handleData} />

      <div>
        <button onClick={addForm}>ADD</button>
      </div>
    </div>
  );
};

export default FormAdd;
