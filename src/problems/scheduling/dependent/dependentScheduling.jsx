import React, { Component } from 'react';
import Description from '../../../common/description';
import DependentSchInput from './dependentSchInput';
import StandardSchVisualization from '../standard/standardSchVisualization';
import Button from 'react-bootstrap/Button';

class DependentScheduling extends Component {
    state = {
        inputArray: '',
        machineSpeeds: '',
        currentStep: 0,
        makeSpan: '',
        history: new Map(),
        visualize: false,
        inputForVisualization: '',
        machineSpeedsForVisualization: ''
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    };

    handleSetMachineSpeeds = (machineSpeeds) => {
        this.setState({ machineSpeeds });
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
        this.setState({ inputForVisualization: input, machineSpeedsForVisualization: numOfMachines });
        let machines = [];
        for (let j = 0; j < numOfMachines; j++) {
            machines.push(Number(0));
        }

        let history = new Map();
        let explanation = "";
        history.set(0, { machines: machines.slice(), explanation: explanation });
        let machineSpeeds = this.state.machineSpeeds;
        for (let i = 0; i < input.length; i++) {
            let job = Number(input[i]);
            let smallestLoad = Number.MAX_VALUE;
            let indexOfSmallestLoad = 0;
            let nextLoad = 0;
            for (let j = 0; j < numOfMachines; j++) {
                let loadOnThisMachine = Number(machines[j]) + job / Number(machineSpeeds[j]);
                if (loadOnThisMachine < smallestLoad) {
                    smallestLoad = loadOnThisMachine;
                    nextLoad = job / Number(machineSpeeds[j]);
                    indexOfSmallestLoad = j;
                }
            }
            machines[indexOfSmallestLoad] += nextLoad;
            explanation = "The previous job was: " + input[i] + ", we scheduled it on the " +
                (indexOfSmallestLoad + 1) + ". machine to minimize the makespan.";
            history.set(Number(i + 1), { machines: machines.slice(), explanation: explanation });
        }

        let makeSpan = 0;
        for (let i = 0; i < machines.length; i++) {
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
                <StandardSchVisualization
                    inputArray={this.state.inputForVisualization}
                    numOfMachines={this.state.machineSpeedsForVisualization}
                    currentStep={this.state.currentStep}
                    currentHistory={currentHistory}
                    makeSpan={this.state.makeSpan}
                    visualize={this.state.visualize}
                >
                </StandardSchVisualization>
                <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                <Button variant="light" onClick={this.nextStep}>&gt;</Button>
            </React.Fragment> : <React.Fragment></React.Fragment>

        return (
            <React.Fragment>
                <h3>Related Machines</h3>
                <Description>
                    <p className="description">
                        In this variant of the scheduling problem the execution times of the jobs are the same but the speed of the machines can differ.
                        The jobs can be represented as numbers and for each machine we have to specify a speed.
                        The LIST algorithm for related machines takes into consideration how fast the upcoming job can be completed on the different machines
                        and how big the makespan would be.
                    </p>
                </Description>
                <DependentSchInput
                    onSetInputArray={this.handleSetInputArray}
                    onSetMachineSpeeds={this.handleSetMachineSpeeds}
                ></DependentSchInput>
                <br />
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithList(this.state.inputArray, this.state.machineSpeeds.length)}>
                    Run LIST algorithm
                </button>
                <br />
                <br />
                {visualization}
            </React.Fragment>
        );
    }
}

export default DependentScheduling;