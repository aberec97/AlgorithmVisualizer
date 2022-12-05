import React, { Component } from 'react';
import RangeSizeRandomGenerator from '../../../common/rangeSizeRandomGenerator';
import SimpleInput from '../../../common/simpleInput';

class DependentSchInput extends Component {
    state = {
        input: '',
        machineSpeeds: '',
        isInputValid: false,
        isMachineSpeedsValid: false,
        inputIsReady: true
    };

    changeInput = (value) => {
        this.setState({
            input: value
        });
    }

    changeMachineSpeeds = (value) => {
        this.setState({
            machineSpeeds: value
        });
    }

    changeInputValidity = (isValid) => {
        this.setState({
            isInputValid: isValid
        });
    }

    changeMachineSpeedsValidity = (isValid) => {
        this.setState({
            isMachineSpeedsValid: isValid
        });
    }

    readInput = () => {
        if (!this.state.isInputValid || !this.state.isMachineSpeedsValid) {
            this.setState({ inputIsReady: false });
            return;
        }
        const inputStr = this.state.input.toString();
        const withoutCommas = inputStr.replace(/,/g, " ").replace(/\s\s+/g, ' ');
        const inputArray = Array.from(withoutCommas.split(" "));
        const onlyNumbers = inputArray.map(Number);
        this.props.onSetInputArray(onlyNumbers);
        const inputStrSpeed = this.state.machineSpeeds.toString();
        const withoutCommasSpeed = inputStrSpeed.replace(/,/g, " ").replace(/\s\s+/g, ' ');
        const inputArraySpeed = Array.from(withoutCommasSpeed.split(" "));
        const onlyNumbersSpeed = inputArraySpeed.map(Number);
        this.props.onSetInputArray(onlyNumbers);
        this.props.onSetMachineSpeeds(onlyNumbersSpeed);
        this.setState({ inputIsReady: true });
    };

    render() {
        let validationMessage = this.state.inputIsReady ? <br /> : <div className='invalid-field'>Invalid input!</div>;

        return (
            <React.Fragment>
                <h6>
                    List the jobs and then provide a speed for each machine
                    (the number of speeds determines the number of machines). You can use spaces (" ") or commas (",") for separation.
                </h6>
                <SimpleInput
                    label={"Input:"}
                    input={this.state.input}
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}
                    validity={this.state.isInputValid}
                    acceptedCharacters={[',', ' ']}>
                </SimpleInput>
                <SimpleInput
                    label={"Speed of machines:"}
                    input={this.state.machineSpeeds}
                    changeInput={this.changeMachineSpeeds}
                    changeInputValidity={this.changeMachineSpeedsValidity}
                    validity={this.state.isMachineSpeedsValid}
                    acceptedCharacters={[',', ' ']}>
                </SimpleInput>
                <button className='btn btn-success' onClick={this.readInput}>Save</button>
                {validationMessage}
                <RangeSizeRandomGenerator
                    randomGenDescription={"You can also generate a random input"}
                    label1={"Input - Range:"}
                    label2={"Size:"}
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}></RangeSizeRandomGenerator>
                <RangeSizeRandomGenerator
                    label1={"Machine speeds - Range:"}
                    label2={"Size:"}
                    changeInput={this.changeMachineSpeeds}
                    changeInputValidity={this.changeMachineSpeedsValidity}></RangeSizeRandomGenerator>
            </React.Fragment>);
    }
}

export default DependentSchInput;