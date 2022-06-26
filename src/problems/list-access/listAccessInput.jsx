import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ListAccessInput extends Component {
    state = {
        input: '',
        length: '',
        size: '',
        number: ''
    }

    changeInput = (event) => {
        this.setState({
            input: event.target.value
        });
    }

    changeLength = (event) => {
        this.setState({
            length: event.target.value
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
        this.setState({ input: input })
    }

    readInput = () => {
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ");
        const inputArray = Array.from(withoutCommas.split(" "));
        const onlyNumbers = inputArray.filter(Number);
        console.log(onlyNumbers);
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetCacheSize(this.state.length);
    };

    render() {
        return (
            <div>
                <h6>
                    Provide an input with whole numbers, for separation use commas (",") or spaces (" ")!
                    The length of the list will determine the linked list,
                    for example if the length is 3, the list will be: 1 -&gt; 2 -&gt; 3.
                </h6>
                <div className="input-manual">
                    <label>
                        Queries:
                    </label>
                    <input type="text" value={this.state.input} onChange={this.changeInput} />
                    <label>
                        {this.props.label}
                    </label>
                    <input type="number" value={this.state.length} onChange={this.changeLength} className='cache' />
                    <button className='btn btn-success' onClick={this.readInput}>Save</button>
                </div>
                <h6>
                    You can also generate a random input.
                </h6>
                <div className='input-random'>
                    <label>Number of queries:</label>
                    <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
                    <label>{this.props.label}</label>
                    <input type="number" value={this.state.length} onChange={this.changeLength} className='cache' />
                    <Button variant="secondary" className='random-gen'
                        onClick={this.generateRandomInput}>Generate random input</Button>
                </div>
            </div>
        );
    }
}

export default ListAccessInput;