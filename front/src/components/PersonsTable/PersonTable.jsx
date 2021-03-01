import React, { useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import BorrowedBooks from "../BorrowedBooks/BorrowedBooks";
import Modal from "../Modal/Modal";
import "../../sass/styleTable.scss";
import iconPencil from "../../img/pencil-alt-solid.svg";
import iconTrash from "../../img/trash-alt-solid.svg";

const PersonsTable = () => {
  const { persons, getPersons, getPersonId, deletePersons } = React.useContext(
    DataContext
  );

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = React.useState("");

  useEffect(() => {
    getPersons();
  }, []);

  const handleEliminarPersona = async (id) => {
    const response = await deletePersons(id);

    if ("error" in response) {
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getPersons();
  };

  const onShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='main-table'>
      <table className='table'>
        <thead>
          <tr className='table-tr'>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Alias</th>
            <th>Libros prestados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {persons.map((persona) => (
          <tbody key={persona.id}>
            <tr className='table-tr'>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.email}</td>
              <td>{persona.alias}</td>
              <td>
                <BorrowedBooks persona_id={persona.id} />
              </td>
              <td className='buttons'>
                <button
                  className='button-icon'
                  onClick={() => handleEliminarPersona(persona.id)}
                >
                  <img className='button-icon' src={iconTrash} alt='trash' />
                </button>
                <button onClick={() => getPersonId(persona.id)}>
                  <img src={iconPencil} alt='pencil' />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {}
      <Modal show={showModal} onShow={onShow} modalText={modalText} />
    </div>
  );
};

export default PersonsTable;
