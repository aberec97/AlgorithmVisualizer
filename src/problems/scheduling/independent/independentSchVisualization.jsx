import React, { Component } from 'react';
import { visualizeInput } from '../../../common/utilities';

class IndependentSchVisualization extends Component {
    state = {
        currentStep: 0
    }
    render() {

        if (!this.props.visualize || !this.props.inputArray) {
            return <React.Fragment>Run the algorithm or provide a valid input!<br /></React.Fragment>;
        }

        let jobs = [];
        let numOfMachines;
        let machinesForRender = [];
        let loadsFromHistory = [];

        let inputArray = this.props.inputArray;

        let elements = visualizeInput(inputArray.map(e => e + " "), this.props.currentStep);

        if (inputArray && inputArray.length > 0 && this.props.numOfMachines > 0) {
            jobs = inputArray;
            numOfMachines = this.props.numOfMachines;
            loadsFromHistory = this.props.currentHistory['machines'];
            for (let i = 0; i < numOfMachines; i++) {
                let load = (loadsFromHistory[i] * 2) + "em";
                machinesForRender.push(<div key={i} style={{ display: "flex" }}><i className="fa-solid fa-desktop fa-xl"></i><div className='load' style={{ width: load }}>{loadsFromHistory[i]}</div></div>);
            }
        }
        else {
            return <React.Fragment>Please provide an input!<br /></React.Fragment>;
        }

        let inputString = jobs.map(j => j + ";").toString();
        let inputStringForRender = inputString.replace(/,/g, " ");

        let makeSpan = this.props.currentStep === this.props.inputArray.length ?
            <p>Makespan = {this.props.makeSpan}</p> : <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                <p style={{ margin: 0, marginTop: "1em" }}>
                    The input is &#123; {inputStringForRender} &#125; with {numOfMachines} machines.
                </p>
                <div className='input-holder'>
                    {elements}
                </div>
                <div className='machines-loads'>
                    <div className='machines'>
                        {machinesForRender}
                    </div>
                </div>
                Current step: {this.props.currentStep} / {this.props.inputArray.length}
                <p className='explanation'>{this.props.currentHistory['explanation']}</p>
                {makeSpan}
            </React.Fragment>
        );
    }
}

export default IndependentSchVisualization;