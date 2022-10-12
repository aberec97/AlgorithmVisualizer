import { Component } from 'react';
import { validateNumberInput } from './utilities';
import './common-styles/common.css';

class NumberInput extends Component {
    changeCache = (event) => {
        let input = event.target.value;
        this.props.changeCache(input);
        this.props.changeCacheValidity(validateNumberInput(input));
    }

    render() {
        return (
            <div className='inputField'>
                <label>{this.props.label}</label>
                <input
                    type="number"
                    value={this.props.cache}
                    onChange={this.changeCache}
                    onKeyDown={(event) => event.key === 'e' && event.preventDefault()}
                    className='cache' />
            </div>
        );
    }
}

export default NumberInput;