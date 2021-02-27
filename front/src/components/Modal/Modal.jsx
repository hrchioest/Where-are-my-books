const Modal = ({ show }) => {
  return (
    <>
      <div
        className='modal-wrapper js-modal-eliminar'
        style={show ? { display: "block" } : { display: "none" }}
      >
        <div className='modal-content-form'>
          <form action='#'>
            <div className='modal-header'>
              <h2 className='modal-title'>Alerta!</h2>
              <button className='js-boton-cancel boton-cancel-x'>x</button>
            </div>
            <div className='modal-body'>
              <p id='modal-alerta' className='modal-alerta'>
                Esta acción no se puede realizar, porque la persona tiene libros
                prestados
              </p>
            </div>
            <div className='modal-footer'>
              <button className='boton-cancel js-boton-cancel' type='button'>
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
