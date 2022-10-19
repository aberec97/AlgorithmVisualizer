import { Component } from 'react';
import './common-styles/common.css';
import { validateInput } from './utilities';

//Ennek a komponensnek csak annyi a dolga, hogy az egesz szamos input-ot validalja es tovabbadja a parent komponensenek.

class SimpleInput extends Component {
    changeInput = (event) => {
        let input = event.target.value;
        this.props.changeInput(input);
        this.props.changeInputValidity(validateInput(input, this.props.acceptedCharacters));
    }

    render() {
        return (
            <div className='inputField'>
                <label>{this.props.label}</label>
                <input value={this.props.input} onChange={this.changeInput}></input>
            </div>
        );
    }
}

export default SimpleInput;