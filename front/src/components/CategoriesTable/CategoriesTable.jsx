import React, { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";
import "../../sass/styleTable.scss";
import iconTrash from "../../img/trash-alt-solid.svg";

const CategoriesTable = () => {
  const { categories, getCategories, deleteCategory } = React.useContext(
    DataContext
  );

  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const handleDataDelete = async ({ id }) => {
    const response = await deleteCategory(id);
    if ("error" in response) {
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    getCategories();
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
            <th>Acciones</th>
          </tr>
        </thead>
        {categories.map((category) => (
          <tbody key={category.id}>
            <tr className='table-tr'>
              <td>{category.nombre}</td>
              <td>
                <button
                  className='button-icon'
                  onClick={() => handleDataDelete(category)}
                >
                  <img src={iconTrash} alt='trash' />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <Modal show={showModal} onShow={onShow} modalText={modalText} />
    </div>
  );
};

export default CategoriesTable;
