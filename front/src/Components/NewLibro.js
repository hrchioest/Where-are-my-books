import React from 'react';
import axios from 'axios';
import Input from './Input'

class NewLibro extends React.Component {
  render(){
    return (
      <div className='newLibro-form'>
        <Input name='Nombre' />
        <Input name='Descripcion' />
        <Input name='ID Categoria' />
        <Input name='ID Persona' />
        <button type='submit'>Guardar</button>
      </div>
    )
  }
}

export default NewLibro;