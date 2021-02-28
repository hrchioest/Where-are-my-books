import React, { useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import BorrowedBooks from "../BorrowedBooks/BorrowedBooks";
import Modal from "../Modal/Modal";

const PersonsTable = () => {
  const {
    persons,
    getPersons,
    getPersonId,
    deletePersons,
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = React.useState('');

  useEffect(() => {
    getPersons();
  }, []);

  const handleEliminarPersona = async (id) => {
      const response = await deletePersons(id);

      if('error' in response){
        setShowModal(true);
        setModalText(response.error);
        return;
      }

      getPersons();
  };

  const onShow = ()=>{
    setShowModal(!showModal);
  }

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
            <td>Acciones</td>
          </tr>
        </thead>
        {persons.map((persona) => (
          <tbody key={persona.id}>
            <tr>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.email}</td>
              <td>{persona.alias}</td>
              <td>
                <BorrowedBooks persona_id={persona.id} />
              </td>
              <td>
                <button onClick={() => handleEliminarPersona(persona.id)}>eliminar</button>
                <button onClick={() => getPersonId(persona.id)}>editar</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {}
      <Modal
        show={showModal}
        onShow={onShow}
        modalText={modalText}
      />
    </div>
  );
};

export default PersonsTable;
