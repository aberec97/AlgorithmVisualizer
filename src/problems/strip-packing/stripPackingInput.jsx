import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import SimpleInput from '../../common/simpleInput';
import NumberInput from '../../common/numberInput';

class StipPackingInput extends Component {
    state = {
        input: '',
        number: '',
        isInputValid: false,
        isRValid: false,
        isInputReady: true,
        r: ''
    }

    changeInput = (value) => {
        this.setState({
            input: value
        });
    }

    changeInputValidity = (isValid) => {
        this.setState({
            isInputValid: isValid
        });
    }

    changeRValidity = (isValid) => {
        this.setState({
            isRValid: isValid
        });
    }

    changeNumber = (event) => {
        this.setState({
            number: event.target.value
        });
    }

    changeR = (value) => {
        this.setState({
            r: value
        });
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomInput = () => {
        let input = [];
        for (let i = 0; i < this.state.number; i++) {
            let rnd = this.getRndInteger(parseInt(1, 10), parseInt(9, 10));
            let rnd2 = this.getRndInteger(parseInt(1, 10), parseInt(9, 10));
            if (i < this.state.number - 1) input.push("0." + rnd + " 0." + rnd2 + ";");
            else input.push("0." + rnd + " 0." + rnd2);
        }
        this.setState({ input: input, isInputValid: true })
    }

    readInput = () => {
        if (!this.state.isInputValid || !this.state.isRValid) {
            this.setState({ isInputReady: false });
            return;
        }
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ");
        const separated = Array.from(withoutCommas.split(";"));
        const boxes = separated.map(s => Array.from(s.split(" ")));
        const onlyNumbers = boxes.map(j => j.filter(Number));
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetRValue(this.state.r);
        this.setState({ isInputReady: true });
    };

    render() {
        let validationMessage = this.state.isInputReady ? <br /> : <div className='invalid-field'>Invalid input!</div>;

        return (
            <div>
                <h6>
                    Provide an input with numbers from 0 to 1, for separation use commas (",") or spaces (" ")!
                    For each item, you need to give a width and a height. Example input: 0.1, 0.2; 0.3, 0.4.
                    The R value has to be between 0 and 1 as well.
                </h6>
                <SimpleInput
                    label={"Input:"}
                    input={this.state.input}
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}
                    validity={this.state.isInputValid}
                    acceptedCharacters={['.', ';', ',', ' ']}
                >
                </SimpleInput>
                <NumberInput
                    label={"R:"}
                    cache={this.state.r}
                    changeCache={this.changeR}
                    changeCacheValidity={this.changeRValidity}
                    validity={this.state.isRValid}
                >
                </NumberInput>
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

export default StipPackingInput;