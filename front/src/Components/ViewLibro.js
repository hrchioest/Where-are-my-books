import React from 'react';
import axios from 'axios';

class ViewLibro extends React.Component {
  constructor(props){
    super(props);
    this.state={libros:[]}
  }
  
  componentDidMount() {
    axios.get(`http://localhost:3000/libro`)
      .then(res => {
        const libros = res.data;
        this.setState({libros});
      })  
  }

  render() {
    return (
      <div className='main-table'>
        <table className='table'>
          <tr className='table-tr'>
            <td><strong>Nombre</strong></td>
            <td><strong>Descripcion</strong></td>
            <td><strong>Categoria</strong></td>
            <td><strong>Persona</strong></td>
            <td><strong></strong></td>
            <td><strong></strong></td>
          </tr>
          {this.state.libros.map(libro => 
          <tr>
            <td>{libro.nombre}</td>
            <td>{libro.descripcion}</td>
            <td>{libro.categoria}</td>
            <td>{libro.alias}</td>
            <td><a href={"/edit/"+libro.id}><button>Editar</button></a></td>
            <td><a href={"/delete/"+libro.id}><button>Eliminar</button></a></td>
          </tr>
          )}
          
        </table>
      </div>
    )
  }
}
  
export default ViewLibro;