import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class IndependentSchInput extends Component {
    state = {
        input: '',
        machines: undefined,
        from: '',
        to: '',
        number: '',
        warning: <div></div>
    };

    changeInput = (event) => {
        this.setState({
            input: event.target.value
        });
    }

    changeNumOfMachines = (event) => {
        this.setState({
            machines: event.target.value
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

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomInput = () => {
        if (!this.state.machines || !this.state.number || !this.state.from || !this.state.to) {
            this.setState({ warning: <div>Specify the number of machines, range and how many random jobs you want!</div> });
            return;
        }
        console.log(this.state.machines);
        let input = [];
        for (let i = 0; i < this.state.number; i++) {
            let job = [];
            for (let j = 0; j < this.state.machines; j++) {
                let rnd = this.getRndInteger(parseInt(this.state.from, 10), parseInt(this.state.to, 10));
                job.push(rnd.toString());
            }
            input.push(job + ';');
        }
        this.setState({ input: input, warning: <div></div> })
    }

    readInput = () => {
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ");
        const separated = Array.from(withoutCommas.split(";"));
        const jobs = separated.map(s => Array.from(s.split(" ")));
        console.log(jobs);
        const onlyNumbers = jobs.map(j => j.filter(Number));
        console.log(onlyNumbers);
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetNumOfMachines(this.state.machines);
    };

    render() {
        return (
            <React.Fragment>
                <h6>
                    Provide an input with whole numbers! Use this format for runtimes: x,y,z and semicolon (";") between the different jobs.
                    For example: 1,2,3; 4,5,6. You can use spaces (" ") instead of commas (",").
                </h6>
                <div className="input-manual">
                    <label>
                        Input:
                    </label>
                    <input type="text" value={this.state.input} onChange={this.changeInput} />
                    <label>
                        Number of machines:
                    </label>
                    <input type="number" value={this.state.machines} onChange={this.changeNumOfMachines} className='cache' />
                    <button className='btn btn-success' onClick={this.readInput}>Save</button>
                </div>
                <h6>
                    You can also generate a random input.
                </h6>
                <div className='input-random'>
                    <label>
                        Range: [
                    </label>
                    <input type="number" value={this.state.from} onChange={this.changeFrom} className='cache' />
                    <label>;</label>
                    <input type="number" value={this.state.to} onChange={this.changeTo} className='cache' />
                    <label>]</label>
                    <label>Size:</label>
                    <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
                    <Button variant="secondary" className='random-gen'
                        onClick={this.generateRandomInput}>Generate random input</Button>
                </div>
                {this.state.warning}
            </React.Fragment>);
    }
}

export default IndependentSchInput;