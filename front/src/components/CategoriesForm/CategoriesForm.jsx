import React from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";
import "../../sass/styleForm.scss";

const CategoriaForm = () => {
  const {
    categoryEdit: category,
    setCategoryEdit,
    getCategories,
    postCategory
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const handleData = (e) => {
    let { name, value } = e.target;
    setCategoryEdit((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleCreate = async () => {
    if (category.nombre === "") {
      setShowModal(true);
      setModalText("Es necesario un nombre para la categoría");
      return;
    }

    const response = await postCategory(category);
    if ("error" in response) {
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getCategories();
    setCategoryEdit({ nombre: "" });
  };

  const onShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='newLibro-form'>
      <h2>Añadir Categoria</h2>
      <input
        type='text'
        value={category.nombre}
        name='nombre'
        onChange={handleData}
        placeholder='Nombre'
      />
      <button className='button-form' onClick={handleCreate}>
        Crear
      </button>

      <Modal show={showModal} onShow={onShow} modalText={modalText} />
    </div>
  );
};

export default CategoriaForm;
