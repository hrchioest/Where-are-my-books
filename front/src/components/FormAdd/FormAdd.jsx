import React from "react";
import { DataContext } from "../../context/DataContext";

const FormAdd = () => {
  const {
    getPersons,
    postPersons,
    putPersons,
    personEdit: person,
    setPersonEdit
  } = React.useContext(DataContext);

  const handleData = (e) => {
    let { name, value } = e.target;

    setPersonEdit((state) => {
      return { ...state, [name]: value };
    });
  };

  const onAdd = async () => {
    await postPersons(person);
    getPersons();
    setPersonEdit({ nombre: "", apellido: "", email: "", alias: "" });
  };

  const handleUpData = async () => {
    const dataPerson = { ...person };
    delete dataPerson.email;
    await putPersons(person.id, dataPerson);
    getPersons();
    setPersonEdit({ nombre: "", apellido: "", email: "", alias: "" });
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
          <button onClick={onAdd}>ADD</button>
        )}
      </div>
    </div>
  );
};

export default FormAdd;
