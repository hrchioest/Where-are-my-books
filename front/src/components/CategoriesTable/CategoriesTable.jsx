import React, { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";

const CategoriesTable = () => {
  const { categories, getCategories, deleteCategory } = React.useContext(
    DataContext
  );

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState('');

  useEffect(() => {
    getCategories();
  }, []);

  const handleDataDelete = async ({id}) => {
    const response = await deleteCategory(id);
    if('error' in response){
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getCategories();
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
            <td>Acciones</td>
          </tr>
        </thead>
        {categories.map((category) => (
          <tbody key={category.id}>
            <tr>
              <td>{category.nombre}</td>
              <td>
                <button onClick={() => handleDataDelete(category)}>
                  eliminar
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <Modal
        show={showModal}
        onShow={onShow}
        modalText={modalText}
      />
    </div>
  );
};

export default CategoriesTable;
