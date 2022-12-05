import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import SimpleInput from '../../common/simpleInput';
import NumberInput from '../../common/numberInput';

class ListAccessInput extends Component {
    state = {
        input: '',
        length: '',
        isInputValid: false,
        isLengthValid: false,
        inputIsReady: true,
        size: '',
        number: ''
    }

    changeInput = (value) => {
        this.setState({
            input: value
        });
    }

    changeLength = (value) => {
        this.setState({
            length: value
        });
    }

    changeInputValidity = (isValid) => {
        this.setState({
            isInputValid: isValid
        });
    }

    changeLengthValidity = (isValid) => {
        this.setState({
            isLengthValid: isValid
        });
    }

    changeNumber = (event) => {
        this.setState({
            number: event.target.value
        });
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomInput = () => {
        let input = [];
        for (let i = 0; i < this.state.number; i++) {
            let rnd = this.getRndInteger(parseInt(1, 10), parseInt(this.state.length, 10));
            input.push(rnd);
        }
        this.setState({ input: input });
        this.changeInputValidity(true);
    }

    readInput = () => {
        if (!this.state.isInputValid || !this.state.isLengthValid) {
            this.setState({ inputIsReady: false });
            return;
        }
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ").replace(/\s\s+/g, ' ');
        const inputArray = Array.from(withoutCommas.split(" "));
        const onlyNumbers = inputArray.map(Number);
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetCacheSize(this.state.length);
        this.setState({ inputIsReady: true });
    };

    render() {
        let validationMessage = this.state.inputIsReady ? <br /> : <div className='invalid-field'>Invalid input!</div>;

        return (
            <div>
                <h6>
                    Provide an input with whole numbers, for separation use commas (",") or spaces (" ")!
                    The length of the list will determine the linked list,
                    for example if the length is 3, then the list will be: 1 -&gt; 2 -&gt; 3.
                </h6>
                <SimpleInput
                    label={"Queries:"}
                    input={this.state.input}
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}
                    validity={this.state.isInputValid}
                    accpetedCharacters={[',', ' ']}
                >
                </SimpleInput>
                <NumberInput
                    label={"Length:"}
                    cache={this.state.length}
                    changeCache={this.changeLength}
                    changeCacheValidity={this.changeLengthValidity}
                    validity={this.state.isLengthValid}>
                </NumberInput>
                <button className='btn btn-success' onClick={this.readInput}>Save</button>
                {validationMessage}
                <h6>
                    You can also generate a random input.
                </h6>
                <div className='input-random'>
                    <label>Number of queries:</label>
                    <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
                    <NumberInput
                        label={"Length:"}
                        cache={this.state.length}
                        changeCache={this.changeLength}
                        changeCacheValidity={this.changeLengthValidity}
                        validity={this.state.isLengthValid}>
                    </NumberInput>
                    <Button variant="secondary" className='random-gen' onClick={this.generateRandomInput}>Generate</Button>
                </div>
            </div>
        );
    }
}

export default ListAccessInput;