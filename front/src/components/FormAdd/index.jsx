import React, { useEffect, useState } from "react";
import { DataContext } from "../../context/dataContext";
import axios from "axios";

const FormAdd = () => {
  const {
    getPersonas,
    postPersonas,
    putPersonas,
    personaEditar: person,
    setPersonaEditar
  } = React.useContext(DataContext);

  const url = "http://localhost:3000";

  const handleData = (e) => {
    let { name, value } = e.target;

    setPersonaEditar((state) => {
      return { ...state, [name]: value };
    });
  };

  const addForm = async () => {
    await postPersonas(person);
    getPersonas();
    setPersonaEditar({ nombre: "", apellido: "", email: "", alias: "" });
  };

  const handleUpData = async () => {
    const dataPersona = { ...person };
    delete dataPersona.email;

    await putPersonas(person.id, dataPersona);
    getPersonas();
  };

  const isEdit = person.id > 0;

  return (
    <div>
      <br />
      <br />
      <label htmlFor=''>Nombre</label>
      <input
        type='text'
        value={person.nombre}
        name='nombre'
        onChange={handleData}
      />
      <br />
      <label htmlFor=''>Apellido</label>
      <input
        type='text'
        value={person.apellido}
        name='apellido'
        onChange={handleData}
      />
      <br />
      <label htmlFor=''>Mail</label>
      <input
        disabled={isEdit}
        type='email'
        name='email'
        value={person.email}
        onChange={handleData}
      />
      <br />
      <label htmlFor=''>Alias</label>
      <input
        type='text'
        name='alias'
        value={person.alias}
        onChange={handleData}
      />

      <div>
        {isEdit ? (
          <button onClick={() => handleUpData()}>ADD</button>
        ) : (
          <button onClick={addForm}>ADD</button>
        )}
      </div>
    </div>
  );
};

export default FormAdd;
