import React, { Component } from 'react';
import './common-styles/common.css';
import { validateSimpleInput } from './utilities';

//Ennek a komponensnek csak annyi a dolga, hogy az egesz szamos input-ot validalja es tovabbadja a parent komponensenek.

class SimpleInput extends Component {
    changeInput = (event) => {
        let input = event.target.value;
        this.props.changeInput(input);
        this.props.changeInputValidity(validateSimpleInput(input));
    }

    render() {
        let isInputValid = this.props.validity ? <div><br /></div> : <div className='invalid-field'>The input is invalid!</div>;

        return (
            <div>
                <label>{this.props.label}</label>
                <input value={this.props.input} onChange={this.changeInput}></input>
                {isInputValid}
            </div>
        );
    }
}

export default SimpleInput;