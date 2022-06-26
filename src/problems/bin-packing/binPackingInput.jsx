import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class BinPackingInput extends Component {
    state = {
        input: '',
        number: ''
    }

    changeInput = (event) => {
        this.setState({
            input: event.target.value
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
            let rnd = this.getRndInteger(parseInt(1, 10), parseInt(9, 10));
            input.push("0." + rnd);
        }
        this.setState({ input: input })
    }

    readInput = () => {
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ");
        const inputArray = Array.from(withoutCommas.split(" "));
        const onlyNumbers = inputArray.filter(Number);
        console.log(onlyNumbers);
        this.props.onSetInputArray(onlyNumbers);
    };

    render() {
        return (
            <div>
                <h6>
                    Provide an input with numbers from 0 to 1, for separation use commas (",") or spaces (" ")! Example input: 0.1, 0.2, 0.3
                </h6>
                <div className="input-manual">
                    <label>
                        Input:
                    </label>
                    <input type="text" value={this.state.input} onChange={this.changeInput} />
                    <button className='btn btn-success' onClick={this.readInput}>Save</button>
                </div>
                <h6>
                    You can also generate a random input.
                </h6>
                <div className='input-random'>
                    <label>Number of elements:</label>
                    <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
                    <Button variant="secondary" className='random-gen'
                        onClick={this.generateRandomInput}>Generate random input</Button>
                </div>
            </div>
        );
    }
}

export default BinPackingInput;