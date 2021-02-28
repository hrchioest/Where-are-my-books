import React from "react";
import { DataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";

const LeadBookForm = ({book, onLeadBook}) => {
  const { persons, putLeadBook, getBooks } = React.useContext(
    DataContext
  );

  const [selectedPerson, setSelectedPerson] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  
  const handleChangePerson = (event) => {
    setSelectedPerson(event.target.value)
  }

  const handleLeadBook = async () =>{
    const response = await putLeadBook(book.id, selectedPerson);

    if('error' in response){
      setShowModal(true);
      setModalText(response.error);
      return;
    } 

    handleCancel();
    getBooks();
  }

  const handleCancel = () =>{
    onLeadBook({});
  }

  const onShow = ()=>{
    setShowModal(!showModal);
  }

  return (<>
    <label>Prestar {book.nombre} a:</label>
    <select onChange={handleChangePerson}>
      <option value="">Seleccionar persona</option>
      {persons.map(person => <option key={person.id} value={person.id}>{person.alias}</option>)}
    </select>
    <button onClick={handleLeadBook}>Guardar</button>
    <button onClick={handleCancel}>Cancelar</button>

    <Modal
        show={showModal}
        onShow={onShow}
        modalText={modalText}
      />
    </>
  )
}

export default LeadBookForm;