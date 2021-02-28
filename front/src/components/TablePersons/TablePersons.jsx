import React, { useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import BorrowedBooks from "../BorrowedBooks/BorrowedBooks";
import Modal from "../Modal/Modal";

const FormPersons = () => {
  const {
    persons,
    getPersons,
    getPersonId,
    deletePersons,
    hasBooksPerson
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getPersons();
  }, []);

  const handleData = async (id) => {
    // const showAlertNotDelete = hasBooksPerson(id);
    // if (showAlertNotDelete) {
    //   setShowModal(showAlertNotDelete);
    // } else {
    //   await deletePersons(id);
    //   getPersons();
    // }
  };

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
                <button onClick={() => handleData(persona.id)}>eliminar</button>
                <button onClick={() => getPersonId(persona.id)}>editar</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {}
      <Modal
        show={showModal}
        const
        modalText='Esta acción no se puede realizar, porque la persona tiene 
        libros prestados'
      />
    </div>
  );
};

export default FormPersons;
