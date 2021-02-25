import React from 'react';

class Input extends React.Component {
    render(){
        const input=<input type="text" name={this.props.name} placeholder={this.props.name} onChange={this.props.accion}></input>
        return input
    }
}

export default Input