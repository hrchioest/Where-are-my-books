import React, { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";
import LeadBookForm from "../LeadBookForm/LeadBookForm"

const BooksTable = () => {
  const { books, getBooks, deleteBooks, getBookId, putReturnBook } = React.useContext(
    DataContext
  );

  const [leadBook, setLeadBook] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState('');

  console.log("books", books);

  useEffect(() => {
    getBooks();
  }, []);

  const handleDataDelete = async ({id}) => {
      const response = await deleteBooks(id);
    
      if('error' in response){
        setShowModal(true);
        setModalText(response.error);
        return;
      } 

      getBooks();
  };

  const handleLeadBook = (book) => {
    setLeadBook(book)
  }

  const handleReturnBook = async ({ id }) => {
    const response = await putReturnBook(id);
    if('error' in response){
      setShowModal(true);
      setModalText(response.error);
      return;
    } 

    getBooks();
  }

  const onShow = ()=>{
    setShowModal(!showModal);
  }

  const hasLeadBook =  Object.keys(leadBook).length > 0;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Descripción</td>
            <td>Categoria</td>
            <td>Persona (alias)</td>
            <td>Acciones</td>
          </tr>
        </thead>
        {books.map((libro) => (
          <tbody key={libro.id}>
            <tr>
              <td>{libro.nombre}</td>
              <td>{libro.descripcion}</td>
              <td>{libro.categoria?.nombre}</td>
              <td>{libro.persona?.alias}</td>
              <td>
                <button onClick={() => handleDataDelete(libro)}>
                  eliminar
                </button>
                <button onClick={()=> getBookId(libro.id)}>editar</button>
                <button disabled={!!libro.persona_id} onClick={() => handleLeadBook(libro)}>Prestar</button>
                <button disabled={!libro.persona_id} onClick={()=> handleReturnBook(libro)}>Devolver Libro</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      {hasLeadBook && <LeadBookForm book={leadBook} onLeadBook={handleLeadBook} />}

      <Modal
        show={showModal}
        onShow={onShow}
        modalText={modalText}
      />
    </div>
  );
};



export default BooksTable;
