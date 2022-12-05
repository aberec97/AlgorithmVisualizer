import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import SimpleInput from '../../common/simpleInput';

class BinPackingInput extends Component {
    state = {
        input: '',
        number: '',
        isInputValid: false,
        inputIsReady: true
    }

    changeInput = (value) => {
        this.setState({
            input: value
        });
    }

    changeNumber = (event) => {
        this.setState({
            number: event.target.value
        });
    }

    changeInputValidity = (isValid) => {
        this.setState({
            isInputValid: isValid
        });
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomInput = () => {
        let input = [];
        for (let i = 0; i < this.state.number; i++) {
            let rnd = this.getRndInteger(parseInt(1, 10), parseInt(9, 10));
            input.push("0." + rnd);
        }
        this.setState({ input: input });
        this.setState({ isInputValid: true });
    }

    readInput = () => {
        if (!this.state.isInputValid) {
            this.setState({ inputIsReady: false });
            return;
        }
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ").replace(/\s\s+/g, ' ');
        const inputArray = Array.from(withoutCommas.split(" "));
        const onlyNumbers = inputArray.map(Number);
        this.props.onSetInputArray(onlyNumbers);
        this.setState({ inputIsReady: true });
    };

    render() {
        let validationMessage = this.state.inputIsReady ? <br /> : <div className='invalid-field'>Invalid input!</div>;

        return (
            <div>
                <h6>
                    Provide an input with numbers from 0 to 1, for separation use commas (",") or spaces (" ")! Example input: 0.1, 0.2, 0.3
                </h6>
                <SimpleInput
                    label={"Input:"}
                    input={this.state.input}
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}
                    validity={this.state.isInputValid}
                    acceptedCharacters={['.', ',', ' ']}>
                </SimpleInput>
                <button className='btn btn-success' onClick={this.readInput}>Save</button>
                {validationMessage}
                <h6>
                    You can also generate a random input.
                </h6>
                <div className='input-random'>
                    <label>Number of elements:</label>
                    <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
                    <Button variant="secondary" className='random-gen'
                        onClick={this.generateRandomInput}>Generate</Button>
                </div>
            </div>
        );
    }
}

export default BinPackingInput;