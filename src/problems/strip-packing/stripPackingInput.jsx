import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class StipPackingInput extends Component {
    state = {
        input: '',
        number: '',
        r: ''
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

    changeR = (event) => {
        this.setState({
            r: event.target.value
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
        this.setState({ input: input })
    }

    readInput = () => {
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ");
        const separated = Array.from(withoutCommas.split(";"));
        const boxes = separated.map(s => Array.from(s.split(" ")));
        const onlyNumbers = boxes.map(j => j.filter(Number));
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetRValue(this.state.r);
    };

    render() {
        return (
            <div>
                <h6>
                    Provide an input with numbers from 0 to 1, for separation use commas (",") or spaces (" ")!
                    For each item, you need to give a width and a height. Example input: 0.1, 0.2; 0.3, 0.4.
                    The R value has to be between 0 and 1 as well.
                </h6>
                <div className="input-manual">
                    <label>
                        Input:
                    </label>
                    <input type="text" value={this.state.input} onChange={this.changeInput} />
                    <label>
                        R:
                    </label>
                    <input type="number" value={this.state.r} onChange={this.changeR} className='cache' />
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

export default StipPackingInput;