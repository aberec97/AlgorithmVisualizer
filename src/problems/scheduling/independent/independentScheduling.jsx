import React, { Component } from 'react';
import Description from '../../../common/description';
import IndependentSchInput from './independentSchInput';
import IndependentSchVisualization from './independentSchVisualization';
import Arrows from '../../../common/arrows';

class IndependentScheduling extends Component {
    state = {
        inputArray: '',
        numOfMachines: '',
        currentStep: 0,
        makeSpan: '',
        history: new Map(),
        visualize: false,
        inputForVisualization: '',
        numOfMachinesForVisualization: ''
    }

    setCurrentStep = (value) => {
        this.setState({ currentStep: value });
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    };

    handleSetNumOfMachines = (numOfMachines) => {
        this.setState({ numOfMachines });
    };

    solveWithList(input, numOfMachines) {
        this.setState({ inputForVisualization: input, numOfMachinesForVisualization: numOfMachines });
        let machines = [];
        for (let j = 0; j < numOfMachines; j++) {
            machines.push(Number(0));
        }
        let history = new Map();
        let explanation = "";
        history.set(0, { machines: machines.slice(), explanation: explanation });

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
            explanation = "The previous job was (" + input[i] + "), we scheduled it to the " + (indexToPutLoadOn + 1) +
                ". machine, because it was the fastest at handling that job (or to minimize the makespan).";
            history.set(i + 1, { machines: machines.slice(), explanation: explanation });
        }

        let makeSpan = 0;
        for (let i = 0; i < numOfMachines; i++) {
            if (machines[i] > makeSpan) {
                makeSpan = machines[i];
            }
        }

        this.setState({ makeSpan, history, visualize: true, currentStep: 0 });
    }

    render() {
        let currentHistory;

        if (this.state.makeSpan > 0) {
            currentHistory = this.state.history.get(this.state.currentStep);
        }

        let visualization = this.state.visualize ?
            <React.Fragment>
                <IndependentSchVisualization
                    inputArray={this.state.inputForVisualization}
                    numOfMachines={this.state.numOfMachinesForVisualization}
                    currentStep={this.state.currentStep}
                    currentHistory={currentHistory}
                    makeSpan={this.state.makeSpan}
                    visualize={this.state.visualize}>
                </IndependentSchVisualization>
                <Arrows
                    input={this.state.inputArray}
                    history={this.state.history}
                    cost={this.state.makeSpan}
                    currentStep={this.state.currentStep}
                    setCurrentStep={this.setCurrentStep}
                ></Arrows>
            </React.Fragment> : <React.Fragment></React.Fragment>;

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
            {visualization}
        </React.Fragment>);
    }
}

export default IndependentScheduling;