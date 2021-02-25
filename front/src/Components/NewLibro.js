import React from 'react';
import axios from 'axios';
import Input from './Input'

class NewLibro extends React.Component {
  state = {
    nombre: '',
    descripcion: '',
    categoria_id: '',
    persona_id: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleClick = () => {
    const values=JSON.stringify(this.state)
    axios.post(`http://localhost:3000/libro`, {
      values
    }).then((data)=>{
      console.log(data);
    }).catch((e)=>{
    console.log(e)
  })
  }


  render(){
    return (
      <div className='newLibro-form'>
        <Input name='nombre' accion={this.handleChange} />
        <Input name='descripcion' accion={this.handleChange} />
        <Input name='categoria_id' accion={this.handleChange}/>
        <Input name='persona_id' accion={this.handleChange}/>
        <button onClick={()=>this.handleClick()}>Guardar</button>
      </div>
    )
  }
}

export default NewLibro;