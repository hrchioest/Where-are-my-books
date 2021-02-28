import React, { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";

const TableBooks = () => {
  const { books, getBooks, deleteBooks, hasBooksPerson } = React.useContext(
    DataContext
  );

  console.log("books", books);

  useEffect(() => {
    getBooks();
  }, []);

  // const handleDataDelete = async (id) => {
  //   const showAlertNotDelete = hasBooksPerson(id);
  //   if (showAlertNotDelete) {
  //     setShowModal(showAlertNotDelete);
  //   } else {
  //     await deletePersons(id);
  //     getPersons();
  //   }
  //   await deleteBooks(id);
  //   getBooks();
  // };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Descripción</td>
            <td>categoria_id</td>
            <td>persona_id</td>
            <td>Acciones</td>
          </tr>
        </thead>
        {books.map((libro) => (
          <tbody key={libro.id}>
            <tr>
              <td>{libro.nombre}</td>
              <td>{libro.descripcion}</td>
              <td>{libro.categoria_id}</td>
              <td>{libro.persona_id}</td>
              {/* <td>
              <BorrowedBooks persona_id={persona.id} />
            </td> */}
              <td>
                {/* <button onClick={() => handleDataDelete(libro.id)}>
                  eliminar
                </button> */}
                <button>editar</button>
                <button>Prestar</button>
                <button>Devolver Libro</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {/* <Modal
        show={showModal}
        modalText='Esta acción no se puede realizar, fue prestado a una persona'
      /> */}
    </div>
  );
};

export default TableBooks;
