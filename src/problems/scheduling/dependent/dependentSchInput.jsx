import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class DependentSchInput extends Component {
    state = {
        input: '',
        machineSpeeds: '',
        from: '',
        to: '',
        number: '',
        fromSpeed: '',
        toSpeed: '',
        numberSpeed: ''
    };

    changeInput = (event) => {
        this.setState({
            input: event.target.value
        });
    }

    changeMachineSpeeds = (event) => {
        this.setState({
            machineSpeeds: event.target.value
        });
    }

    changeFrom = (event) => {
        this.setState({
            from: event.target.value
        });
    }

    changeTo = (event) => {
        this.setState({
            to: event.target.value
        });
    }

    changeNumber = (event) => {
        this.setState({
            number: event.target.value
        });
    }

    changeFromSpeed = (event) => {
        this.setState({
            fromSpeed: event.target.value
        });
    }

    changeToSpeed = (event) => {
        this.setState({
            toSpeed: event.target.value
        });
    }

    changeNumberSpeed = (event) => {
        this.setState({
            numberSpeed: event.target.value
        });
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomInput = (number, from, to) => {
        let input = [];
        for (let i = 0; i < number; i++) {
            let rnd = this.getRndInteger(parseInt(from, 10), parseInt(to, 10));
            input.push(rnd);
        }
        this.setState({ input: input })
    }

    generateRandomMachineSpeeds = (number, from, to) => {
        let input = [];
        for (let i = 0; i < number; i++) {
            let rnd = this.getRndInteger(parseInt(from, 10), parseInt(to, 10));
            input.push(rnd);
        }
        this.setState({ machineSpeeds: input })
    }

    readInput = () => {
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ");
        const inputArray = Array.from(withoutCommas.split(" "));
        const onlyNumbers = inputArray.filter(Number);
        this.props.onSetInputArray(onlyNumbers);
        const inputStrSpeed = this.state.machineSpeeds.toString();
        const withoutCommasSpeed = inputStrSpeed.replace(/,/g, " ");
        const inputArraySpeed = Array.from(withoutCommasSpeed.split(" "));
        const onlyNumbersSpeed = inputArraySpeed.filter(Number);
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetMachineSpeeds(onlyNumbersSpeed);
    };

    render() {
        return (
            <React.Fragment>
                <h6>
                    List the jobs and then provide a speed for each machine
                    (the number of speeds determines the number of machines). You can use spaces (" ") or commas (",") for separation.
                </h6>
                <div className="input-manual">
                    <label>
                        Input:
                    </label>
                    <input type="text" value={this.state.input} onChange={this.changeInput} />
                    <label>
                        Speed of machines:
                    </label>
                    <input type="text" value={this.state.machineSpeeds} onChange={this.changeMachineSpeeds} />
                    <button className='btn btn-success' onClick={this.readInput}>Save</button>
                </div>
                <h6>
                    You can also generate a random input.
                </h6>
                <div className='input-random'>
                    <label>
                        Input - Range: [
                    </label>
                    <input type="number" value={this.state.from} onChange={this.changeFrom} className='cache' />
                    <label>;</label>
                    <input type="number" value={this.state.to} onChange={this.changeTo} className='cache' />
                    <label>]</label>
                    <label>Size:</label>
                    <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
                    <Button variant="secondary" className='random-gen'
                        onClick={() => this.generateRandomInput(this.state.number, this.state.from, this.state.to)}>Generate random input</Button>
                    <br />
                    <label>
                        Machine speeds - Range: [
                    </label>
                    <input type="number" value={this.state.fromSpeed} onChange={this.changeFromSpeed} className='cache' />
                    <label>;</label>
                    <input type="number" value={this.state.toSpeed} onChange={this.changeToSpeed} className='cache' />
                    <label>]</label>
                    <label>Size:</label>
                    <input type="number" value={this.state.numberSpeed} onChange={this.changeNumberSpeed} className='cache' />
                    <Button variant="secondary" className='random-gen'
                        onClick={() => this.generateRandomMachineSpeeds(this.state.numberSpeed, this.state.fromSpeed, this.state.toSpeed)}>Generate random input</Button>
                </div>
            </React.Fragment>);
    }
}

export default DependentSchInput;