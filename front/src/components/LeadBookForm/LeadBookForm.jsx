import React from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";

const LeadBookForm = ({ book, onLeadBook }) => {
  const { persons, putLeadBook, getBooks } = React.useContext(DataContext);

  const [selectedPerson, setSelectedPerson] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState("");

  const handleChangePerson = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleLeadBook = async () => {
    const response = await putLeadBook(book.id, selectedPerson);

    if ("error" in response) {
      setShowModal(true);
      setModalText(response.error);
      return;
    }

    handleCancel();
    getBooks();
  };

  const handleCancel = () => {
    onLeadBook({});
  };

  const onShow = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          textAlign: "center",
          backgroundColor: "#201e1e",
          paddingBottom: "20px"
        }}
      >
        <div>
          <label>
            <h3 style={{ color: "#ef9579" }}>Prestar "{book.nombre}" a:</h3>
          </label>
          <select onChange={handleChangePerson} style={{ width: "30%" }}>
            <option value=''>Seleccionar persona</option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.alias}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={handleLeadBook}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
      <Modal show={showModal} onShow={onShow} modalText={modalText} />
    </>
  );
};

export default LeadBookForm;
