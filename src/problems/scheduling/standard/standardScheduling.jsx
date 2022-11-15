import React, { Component } from 'react';
import Description from '../../../common/description';
import SimpleInputController from '../../../common/simpleInputController';
import './../scheduling.css';
import StandardSchVisualization from './standardSchVisualization';
import Arrows from '../../../common/arrows';

class StandardScheduling extends Component {
    state = {
        inputArray: '',
        numOfMachines: '',
        currentStep: 0,
        makeSpan: 0,
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

        let minimumLoad = Number.MAX_VALUE;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < numOfMachines; j++) {
                if (machines[j] < minimumLoad) {
                    minimumLoad = machines[j];
                }
            }
            explanation = "The previous job was: " + input[i] + ", we scheduled it on the " +
                (machines.indexOf(minimumLoad) + 1) + ". machine, because it was the first one available.";
            machines[machines.indexOf(minimumLoad)] += Number(input[i]);
            minimumLoad += Number(input[i]);
            history.set(Number(i + 1), { machines: machines.slice(), explanation: explanation });
        }

        let makeSpan = 0;
        for (let j = 0; j < numOfMachines; j++) {
            if (machines[j] >= makeSpan) {
                makeSpan = machines[j];
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
                    numOfMachines={this.state.numOfMachinesForVisualization}
                    currentStep={this.state.currentStep}
                    currentHistory={currentHistory}
                    makeSpan={this.state.makeSpan}
                >
                </StandardSchVisualization>
                <br />
                <Arrows
                    input={this.state.inputArray.length}
                    history={this.state.history}
                    cost={this.state.makeSpan}
                    currentStep={this.state.currentStep}
                    setCurrentStep={this.setCurrentStep}
                ></Arrows>
            </React.Fragment> : <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                <h3>Standard scheduling</h3>
                <Description>
                    <p className="description">
                        In the standard version of scheduling, the jobs can be simply represented as numbers.
                        These numbers tell how much time each job requires. LIST is an online algorithm for this problem which
                        always schedules the next job to the first machine available.
                    </p>
                </Description>
                <SimpleInputController
                    onSetInputArray={this.handleSetInputArray}
                    onSetCacheSize={this.handleSetNumOfMachines}
                    inputLabel={"Input:"}
                    cacheLabel={"Number of machines:"}
                    inputDescription={"Provide an input with whole numbers, for separation use commas (\",\") or spaces (\" \")!"}
                    randomGenDescription={"You can also generate a random input."}
                    acceptedCharacters={[',', ' ']}>
                </SimpleInputController>
                <br />
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithList(this.state.inputArray, this.state.numOfMachines)}>
                    Run LIST algorithm
                </button>
                <br />
                {visualization}
            </React.Fragment>
        );
    }
}

export default StandardScheduling;