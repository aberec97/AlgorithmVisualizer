import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import NumberInput from '../../../common/numberInput'
import SimpleInput from '../../../common/simpleInput';

class IndependentSchInput extends Component {
    state = {
        input: '',
        machines: '',
        isInputValid: false,
        isMachinesValid: false,
        inputIsReady: true,
        from: '',
        to: '',
        number: '',
        warning: <div></div>
    };

    changeInput = (value) => {
        this.setState({
            input: value
        });
    }

    changeNumOfMachines = (value) => {
        this.setState({
            machines: value
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

    changeInputValidity = (isValid) => {
        this.setState({
            isInputValid: isValid
        });
    }

    changeMachinesValidity = (isValid) => {
        this.setState({
            isMachinesValid: isValid
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
        let input = [];
        for (let i = 0; i < this.state.number; i++) {
            let job = [];
            for (let j = 0; j < this.state.machines; j++) {
                let rnd = this.getRndInteger(parseInt(this.state.from, 10), parseInt(this.state.to, 10));
                job.push(rnd.toString());
            }
            if (i < this.state.number - 1) input.push(job + ';');
            else input.push(job);
        }
        this.setState({ input: input, warning: <div></div>, isInputValid: true });
    }

    readInput = () => {
        if (!this.state.isInputValid || !this.state.isMachinesValid) {
            this.setState({ inputIsReady: false });
            return;
        }
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ");
        const separated = Array.from(withoutCommas.split(";"));
        const trimmed = separated.map(s => s.trim());
        const jobs = trimmed.map(s => Array.from(s.split(" ")));
        const onlyNumbers = jobs.map(j => j.map(Number));
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetNumOfMachines(this.state.machines);
        this.setState({ inputIsReady: true });
    };

    render() {
        let validationMessage = this.state.inputIsReady ? <br /> : <div className='invalid-field'>Invalid input!</div>;

        return (
            <React.Fragment>
                <h6>
                    Provide an input with whole numbers! Use this format for runtimes: x,y,z and semicolon (";") between the different jobs.
                    For example: 1,2,3; 4,5,6. You can use spaces (" ") instead of commas (",").
                </h6>
                <SimpleInput
                    label={"Input:"}
                    changeInput={this.changeInput}
                    input={this.state.input}
                    changeInputValidity={this.changeInputValidity}
                    validity={this.state.isInputValid}
                    acceptedCharacters={[',', ' ', ';']}>
                </SimpleInput>
                <NumberInput
                    label={"Number of machines:"}
                    cache={this.state.machines}
                    changeCache={this.changeNumOfMachines}
                    validity={this.state.isMachinesValid}
                    changeCacheValidity={this.changeMachinesValidity}>
                </NumberInput>
                <button className='btn btn-success' onClick={this.readInput}>Save</button>
                {validationMessage}
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
                        onClick={this.generateRandomInput}>Generate</Button>
                </div>
                {this.state.warning}

            </React.Fragment>);
    }
}

export default IndependentSchInput;