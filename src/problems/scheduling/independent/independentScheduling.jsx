import React, { Component } from 'react';
import Description from '../../../common/description';
import IndependentSchInput from './independentSchInput';
import IndependentSchVisualization from './independentSchVisualization';
import Button from 'react-bootstrap/Button';

class IndependentScheduling extends Component {
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

    solveWithList(input, numOfMachines) {
        let machines = [];
        for (let j = 0; j < numOfMachines; j++) {
            machines.push(Number(0));
        }
        let history = new Map();
        history.set(0, machines.slice());

        for (let i = 0; i < input.length; i++) {
            let job = input[i];
            let smallestLoad = Number.MAX_VALUE;
            let indexToPutLoadOn = Number(0);
            let newLoad = Number(0);
            for (let j = 0; j < numOfMachines; j++) {
                let loadOfCurrentMachine = Number(machines[j]) + Number(job[j]);
                if (loadOfCurrentMachine < smallestLoad) {
                    smallestLoad = loadOfCurrentMachine;
                    indexToPutLoadOn = j;
                    newLoad = job[j];
                }
            }
            machines[indexToPutLoadOn] += Number(newLoad);
            history.set(i + 1, machines.slice());
        }

        let makeSpan = 0;
        for (let i = 0; i < numOfMachines; i++) {
            if (machines[i] > makeSpan) {
                makeSpan = machines[i];
            }
        }

        this.setState({ makeSpan, history, visualize: true });
    }

    render() {
        let loadsFromHistory;

        if (this.state.makeSpan > 0) {
            loadsFromHistory = this.state.history.get(this.state.currentStep);
        }

        return (<React.Fragment>
            <h3>Unrelated Machines</h3>
            <Description>
                <p className="description">
                    In this variant of the scheduling problem the execution times of the jobs can differ on every machine.
                    For example it is possible for a job to take 1 minute on the first machine and 2 on the second, we would represent
                    this as (1,2). The LIST algorithm for unrelated machines takes into consideration these different runtimes when determining
                    the loads. When a new job comes, it schedules it for the machine that would least increase the makespan.
                </p>
            </Description>
            <IndependentSchInput
                onSetInputArray={this.handleSetInputArray}
                onSetNumOfMachines={this.handleSetNumOfMachines}>
            </IndependentSchInput>
            <br />
            <button
                className='btn btn-success'
                onClick={() => this.solveWithList(this.state.inputArray, this.state.numOfMachines)}>
                Run LIST algorithm
            </button>
            <br />
            <br />
            <IndependentSchVisualization
                inputArray={this.state.inputArray}
                numOfMachines={this.state.numOfMachines}
                currentStep={this.state.currentStep}
                loadsFromHistory={loadsFromHistory}
                makeSpan={this.state.makeSpan}
                visualize={this.state.visualize}>
            </IndependentSchVisualization>
            <Button variant="light" onClick={this.previousStep}>&lt;</Button>
            <Button variant="light" onClick={this.nextStep}>&gt;</Button>
        </React.Fragment>);
    }
}

export default IndependentScheduling;