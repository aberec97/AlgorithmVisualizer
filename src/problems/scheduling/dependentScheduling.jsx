import React, { Component } from 'react';
import Description from '../../common/description';
import DependentSchInput from './dependentSchInput';

class DependentScheduling extends Component {
    state = {
        inputArray: '',
        machineSpeeds: ''
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    };

    handleSetMachineSpeeds = (machineSpeeds) => {
        this.setState({ machineSpeeds });
    };

    render() {
        return (
            <React.Fragment>
                <h3>Dependent Machines</h3>
                <Description>
                    <p className="description">
                        In this variant of the scheduling problem the execution times of the jobs are the same but the speed of the machines can differ.
                        The jobs can be represented as numbers and for each machine we have to specify a speed.
                        The LIST algorithm for dependent machines takes into consideration how fast the upcoming job can be completed on the different machines
                        and how big the makespan would be.
                    </p>
                </Description>
                <DependentSchInput
                    onSetInputArray={this.handleSetInputArray}
                    onSetMachineSpeeds={this.handleSetMachineSpeeds}
                ></DependentSchInput>
            </React.Fragment>
        );
    }
}

export default DependentScheduling;