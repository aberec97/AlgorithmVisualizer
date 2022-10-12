import React, { Component } from 'react';
import NumberInput from './numberInput';
import SimpleInput from './simpleInput';
import './common-styles/common.css'
import RangeSizeRandomGenerator from './rangeSizeRandomGenerator';

class SimpleInputController extends Component {
    state = {
        input: '',
        cache: '',
        isInputValid: false,
        isCacheValid: false,
        inputIsReady: true
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
        if (this.state.isInputValid && this.state.isCacheValid) {
            const inputStr = this.state.input.toString();
            const withoutCommas = inputStr.replace(/,/g, " ");
            const inputArray = Array.from(withoutCommas.split(" "));
            const onlyNumbers = inputArray.filter(Number);
            console.log("The final input is: ", onlyNumbers);
            console.log("The final cache is: ", this.state.cache);
            this.setState({ inputIsReady: true });
            //this.props.onSetInputArray(onlyNumbers);
            //this.props.onSetCacheSize(this.state.cache);
        } else {
            this.setState({ inputIsReady: false });
            return;
        }
    };

    render() {
        let validationMessage = this.state.inputIsReady ? <br /> : <div className='invalid-field'>Invalid input!</div>;

        return (
            <div>
                <h4>
                    Simple input controller
                </h4>
                <div className='input-manual'>
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
                {validationMessage}
                <RangeSizeRandomGenerator
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}>
                </RangeSizeRandomGenerator>
            </div>
        );
    }
}

export default SimpleInputController;