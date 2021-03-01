import React from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";
import "../../sass/styleForm.scss";

const BookForm = () => {
  const {
    bookEdit: book,
    setBookEdit,
    putBook,
    getBooks,
    postBook
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const handleData = (e) => {
    let { name, value } = e.target;

    setBookEdit((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleCreate = async () => {
    const response = await postBook(book);

    if ("error" in response) {
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getBooks();
    setBookEdit({
      nombre: "",
      descripcion: "",
      categoria_id: "",
      persona_id: ""
    });
  };

  const handleUpdate = async () => {
    const { descripcion, books } = { ...book };
    await putBook(book.id, { descripcion });
    getBooks();
    setBookEdit({
      nombre: "",
      descripcion: "",
      categoria_id: "",
      persona_id: ""
    });
  };

  const isEdit = book.id > 0;

  const onShow = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div class='newLibro-form'>
        <h2>Añadir libro</h2>
        <input
          disabled={isEdit}
          type='text'
          value={book.nombre}
          name='nombre'
          onChange={handleData}
          placeholder='Nombre'
        />
        <input
          type='text'
          name='descripcion'
          value={book.descripcion}
          onChange={handleData}
          placeholder='Descripcion'
        />

        <input
          disabled={isEdit}
          type='text'
          value={book.categoria_id}
          name='categoria_id'
          onChange={handleData}
          placeholder='Categoria_id'
        />
        <input
          disabled={isEdit}
          type='text'
          name='persona_id'
          value={book.persona_id}
          onChange={handleData}
          placeholder='Persona_id'
        />
        <>
          {isEdit ? (
            <button onClick={handleUpdate}>Editar</button>
          ) : (
            <button onClick={handleCreate}>Guardar</button>
          )}
        </>
      </div>
      <Modal show={showModal} onShow={onShow} modalText={modalText} />
    </>
  );
};

export default BookForm;
