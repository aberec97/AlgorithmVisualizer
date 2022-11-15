import React, { Component } from 'react';
import Description from '../../../common/description';
import SchTimeModelInput from './schTimeModelInput';
import SchTimeModelAlgorithm from './schTimeModelAlgorithm';
import ButtonHolder from '../../../common/buttonHolder';
import '../scheduling.css';

class SchTimeModel extends Component {
    state = {
        inputArray: '',
        numOfMachines: '',
        currentStep: 0,
        makeSpan: '',
        history: new Map(),
        visualize: false,
        algorithms: [{ id: 1, name: "INTV" }, { id: 2, name: "Online LPT" }],
        selectedAlgorithm: ''
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    };

    handleSetNumOfMachines = (numOfMachines) => {
        this.setState({ numOfMachines });
    };

    handleAlgSelect = (selectedAlgorithm) => {
        this.setState({ selectedAlgorithm });
    };

    nextStep = () => {
        const length = this.state.inputArray.length;
        if (length === 0 || !this.state.history || this.state.cost === 0) return;
        const currentStep = this.state.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(length)) {
            this.setState({ currentStep: nextStep });
        }
    };

    previousStep = () => {
        if (!this.state.history || this.state.cost === 0) return;
        let currentStep = this.state.currentStep;
        let prevStep = currentStep - 1;
        if (Number(currentStep) > 0) {
            this.setState({ currentStep: prevStep });
        }
    };

    render() {
        return (
            <React.Fragment>
                <h3>Scheduling Time Model</h3>
                <Description>
                    <p className="description">
                        With the time model, each job has a timespan that tells us when the given job is received.
                        Multiple jobs can arrive at the same time and we can use different strategies to handle them.
                        The algorithms we can use here are INTV (Interval of Time) and Online LPT (Longest Processing Time).
                        The makespan is the longest working machine's finishing time.
                    </p>
                </Description>
                <div>
                    <SchTimeModelInput
                        onSetInputArray={this.handleSetInputArray}
                        onSetNumOfMachines={this.handleSetNumOfMachines}>
                    </SchTimeModelInput>
                </div>
                <div className='algorithm-chooser'>
                    <h5>Choose an algorithm:</h5>
                    <ButtonHolder buttons={this.state.algorithms} onSelect={this.handleAlgSelect}></ButtonHolder>
                </div>
                <SchTimeModelAlgorithm
                    selectedAlgorithm={this.state.selectedAlgorithm}
                    inputArray={this.state.inputArray}
                    numOfMachines={this.state.numOfMachines}
                >
                </SchTimeModelAlgorithm>
                <br />
            </React.Fragment>
        );
    }
}

export default SchTimeModel;