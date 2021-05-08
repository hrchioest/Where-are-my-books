import React from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";
import "../../sass/styleForm.scss";

const PersonForm = () => {
  const {
    getPersons,
    postPersons,
    putPersons,
    personEdit: person,
    setPersonEdit
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const handleData = (e) => {
    let { name, value } = e.target;

    setPersonEdit((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleCreate = async () => {
    const response = await postPersons(person);

    if ("error" in response) {
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

    if ("error" in response) {
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getPersons();
    setPersonEdit({ nombre: "", apellido: "", email: "", alias: "" });
  };

  const isEdit = person.id > 0;

  const onShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='newLibro-form'>
      {isEdit ? <h2>Edit Person</h2> : <h2>Add Persona</h2>}

      <input
        type='text'
        value={person.nombre}
        name='nombre'
        onChange={handleData}
        placeholder='Nombre'
      />

      <input
        type='text'
        value={person.apellido}
        name='apellido'
        onChange={handleData}
        placeholder='Apellido'
      />

      <input
        disabled={isEdit}
        type='email'
        name='email'
        value={person.email}
        onChange={handleData}
        placeholder='Mail'
      />

      <input
        type='text'
        name='alias'
        value={person.alias}
        onChange={handleData}
        placeholder='Alias'
      />

      {isEdit ? (
        <button className='button-form' onClick={() => handleUpData()}>
          Edit
        </button>
      ) : (
        <button className='button-form' onClick={handleCreate}>
          To create
        </button>
      )}

      <Modal show={showModal} onShow={onShow} modalText={modalText} />
    </div>
  );
};

export default PersonForm;
