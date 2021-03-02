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
    postBook,
    categories,
    postPersons,
    persons
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const handleData = (e) => {
    console.log("targ", e.target);
    let { name, value } = e.target;

    setBookEdit((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleCreate = async () => {
    const response = await postBook({ ...book, persona_id: +book.persona_id });

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
  console.log("book", book);
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
      <div className='newLibro-form'>
        {isEdit ? <h2>Editar libro</h2> : <h2>Añadir libro</h2>}
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

        <select
          name='categoria_id'
          value={book.categoria_id}
          onChange={handleData}
        >
          <option value=''>Categorias</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id} disabled={isEdit}>
              {category.nombre}
            </option>
          ))}
        </select>

        <select name='persona_id' value={book.persona_id} onChange={handleData}>
          <option value=''>Personas</option>
          {persons.map((person) => (
            <option key={person.id} value={person.id} disabled={isEdit}>
              {person.alias}
            </option>
          ))}
        </select>

        <>
          {isEdit ? (
            <button className='button-form' onClick={handleUpdate}>
              Editar
            </button>
          ) : (
            <button className='button-form' onClick={handleCreate}>
              Guardar
            </button>
          )}
        </>
      </div>
      <Modal show={showModal} onShow={onShow} modalText={modalText} />
    </>
  );
};

export default BookForm;
