import React from 'react';
import axios from 'axios';

class ViewLibro extends React.Component {
    state = {
      libros: []
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
            </tr>
            {this.state.libros.map(libro => 
            <tr>
              <td>{libro.nombre}</td>
              <td>{libro.descripcion}</td>
              <td>{libro.categoria}</td>
              <td>{libro.alias}</td>
            </tr>
            )}
            
          </table>
        </div>
      )
    }
  }
  
  export default ViewLibro;