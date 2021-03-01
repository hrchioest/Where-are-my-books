import "../Modal/modal.scss";

const Modal = ({ show, modalText, onShow }) => {
  return (
    <>
      <div
        className='modal-wrapper'
        style={show ? { display: "block" } : { display: "none" }}
      >
        <div className='modal-content-form'>
          <form action='#'>
            <div className='modal-header'>
              <h2 className='modal-title'>Alerta!</h2>
              <button onClick={onShow} className='boton-cancel-x'>
                x
              </button>
            </div>
            <div className='modal-body'>
              <p id='modal-alerta' className='modal-alerta'>
                {modalText}
              </p>
            </div>
            <div className='modal-footer'>
              <button onClick={onShow} className='boton-cancel' type='button'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
