import React, { Component } from 'react';
import NumberInput from './NumberInput';
import SimpleInput from './SimpleInput';

class SimpleInputController extends Component {
    state = {
        input: '',
        cache: '',
        isInputValid: false,
        isCacheValid: false
    }

    changeInput = (value) => {
        this.setState({
            input: value
        });
    }

    changeCache = (value) => {
        this.setState({
            cache: value
        });
    }

    changeInputValidity = (isValid) => {
        this.setState({
            isInputValid: isValid
        });
    }

    changeCacheValidity = (isValid) => {
        this.setState({
            isCacheValid: isValid
        });
    }

    readInput = () => {
        if (this.state.isInputValid) {
            const inputStr = this.state.input.toString();
            const withoutCommas = inputStr.replace(/,/g, " ");
            const inputArray = Array.from(withoutCommas.split(" "));
            const onlyNumbers = inputArray.filter(Number);
            console.log("The final input is: ", onlyNumbers);
            console.log("The final cache is: ", this.state.cache);
            //this.props.onSetInputArray(onlyNumbers);
            //this.props.onSetCacheSize(this.state.cache);
        } else {
            return;
        }
    };

    render() {
        let finalInput = this.state.isInputValid ? this.state.input : "Input is invalid!";
        let finalCache = this.state.isInputValid ? this.state.cache : "Input is invalid!";

        return (
            <div>
                <h4>
                    Simple input controller
                </h4>
                <div>Input: {finalInput} Cache size: {finalCache} </div>
                <SimpleInput
                    label='Input:'
                    input={this.state.input}
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}
                    validity={this.state.isInputValid}>
                </SimpleInput>
                <NumberInput
                    label='Cache size:'
                    cache={this.state.cache}
                    changeCache={this.changeCache}
                    changeCacheValidity={this.changeCacheValidity}
                    validity={this.state.isCacheValid}>
                </NumberInput>
                <button className='btn btn-success' onClick={this.readInput}>Save</button>
            </div>
        );
    }
}

export default SimpleInputController;