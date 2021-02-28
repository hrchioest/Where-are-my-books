import React from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";


const PersonForm = () => {
  const {
    getPersons,
    postPersons,
    putPersons,
    personEdit: person,
    setPersonEdit
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState('');


  const handleData = (e) => {
    let { name, value } = e.target;

    setPersonEdit((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleCreate = async () => {
    const response = await postPersons(person);

    if('error' in response){
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getPersons();
    setPersonEdit({ nombre: "", apellido: "", email: "", alias: "" });
  };

  const handleUpData = async () => {
    const dataPerson = { ...person };
    delete dataPerson.email;

    const response = await putPersons(person.id, dataPerson);

    console.log(response);

    if('error' in response){
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getPersons();
    setPersonEdit({ nombre: "", apellido: "", email: "", alias: "" });
  };

  const isEdit = person.id > 0;


  const onShow = ()=>{
    setShowModal(!showModal);
  }

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
          <button onClick={() => handleUpData()}>Editar</button>
        ) : (
          <button onClick={handleCreate}>Crear</button>
        )}
      </div>


    <Modal
        show={showModal}
        onShow={onShow}
        modalText={modalText}
      />
    </div>
  );
};

export default PersonForm;
