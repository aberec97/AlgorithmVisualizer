import React, { Component } from 'react';
import { validateNumberInput } from './utilities';

class NumberInput extends Component {
    changeCache = (event) => {
        let input = event.target.value;
        this.props.changeCache(input);
        this.props.changeCacheValidity(validateNumberInput(input));
    }

    render() {
        let isInputValid = this.props.validity ? <div><br /></div> : <div className='invalid-field'>The input is invalid!</div>;
        return (
            <div>
                <label>{this.props.label}</label>
                <input
                    type="number"
                    value={this.props.cache}
                    onChange={this.changeCache}
                    onKeyDown={(event) => event.key === 'e' && event.preventDefault()}
                    className='cache' />
                {isInputValid}
            </div>
        );
    }
}

export default NumberInput;