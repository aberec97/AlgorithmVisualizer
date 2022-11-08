import React, { Component } from 'react';

class IndependentSchVisualization extends Component {
    state = {
        currentStep: 0
    }
    render() {

        if (!this.props.visualize) {
            return <React.Fragment>Run the algorithm! <br /> </React.Fragment>;
        }

        let jobs = [];
        let numOfMachines;
        let machinesForRender = [];
        let loadsFromHistory = [];
        if (this.props.inputArray && this.props.inputArray.length > 0 && this.props.numOfMachines > 0) {
            jobs = this.props.inputArray;
            numOfMachines = this.props.numOfMachines;
            loadsFromHistory = this.props.currentHistory['machines'];
            for (let i = 0; i < numOfMachines; i++) {
                let load = (loadsFromHistory[i] * 2) + "em";
                machinesForRender.push(<div key={i} style={{ display: "flex" }}><i className="fa-solid fa-desktop fa-xl"></i><div className='load' style={{ width: load }}>{loadsFromHistory[i]}</div></div>);
            }
        }
        else {
            return <React.Fragment>Please provide an input!</React.Fragment>;
        }

        let inputString = jobs.map(j => j + ";").toString();
        let inputStringForRender = inputString.replace(/,/g, " ");

        let makeSpan = this.props.currentStep === this.props.inputArray.length ?
            <React.Fragment>Makespan = {this.props.makeSpan}</React.Fragment> : <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                The input is &#123; {inputStringForRender} &#125; with {numOfMachines} machines.
                <div className='machines-loads'>
                    <div className='machines'>
                        {machinesForRender}
                    </div>
                </div>
                Current step: {this.props.currentStep} / {this.props.inputArray.length}
                <p className='explanation'>{this.props.currentHistory['explanation']}</p>
                {makeSpan}
                <br />
            </React.Fragment>
        );
    }
}

export default IndependentSchVisualization;