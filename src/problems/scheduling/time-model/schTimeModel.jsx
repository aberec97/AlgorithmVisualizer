import React, { Component } from 'react';

import Description from '../../../common/description';
import SchTimeModelInput from './schTimeModelInput';

class SchTimeModel extends Component {
    state = {
        inputArray: '',
        numOfMachines: '',
        currentStep: 0,
        makeSpan: '',
        history: new Map(),
        visualize: false
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    };

    handleSetNumOfMachines = (numOfMachines) => {
        this.setState({ numOfMachines });
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
                        Multiple jobs can arrive at the same time, we can use different strategies to handle them.
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
                <br />
                Algorithm is not implemented yet!
            </React.Fragment>
        );
    }
}

export default SchTimeModel;