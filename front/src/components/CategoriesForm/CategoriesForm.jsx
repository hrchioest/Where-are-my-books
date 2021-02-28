import React from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";

const CategoriaForm = () => {
  const {
    categoryEdit: category,
    setCategoryEdit,
    getCategories,
    postCategory,
  } = React.useContext(DataContext);

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState('');


  const handleData = (e) => {
    let { name, value } = e.target;
    setCategoryEdit((state) => {
      return { ...state, [name]: value };
    });
  };

  const handleCreate = async () => {
    if(category.nombre === ''){
      setShowModal(true);
      setModalText('Es necesario un nombre para la categoría');
      return;
    }

    const response  = await postCategory(category);
    if('error' in response){
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getCategories();
    setCategoryEdit({ nombre: "" }); 
  };

  const onShow = ()=>{
    setShowModal(!showModal);
  }

  return (<>
    <div>
      <br />
      <br />
      <label htmlFor=''>Nombre</label>
      <input
        type='text'
        value={category.nombre}
        name='nombre'
        onChange={handleData}
      />
      <div>
          <button onClick={handleCreate}>Crear</button>
      </div>
    </div>
    <Modal
        show={showModal}
        onShow={onShow}
        modalText={modalText}
      />
    </>
  );
};

export default CategoriaForm;
