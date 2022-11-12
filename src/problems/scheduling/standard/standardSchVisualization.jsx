import React, { Component } from 'react';
import { visualizeInput } from '../../../common/utilities';

class StandardSchVisualization extends Component {
    render() {
        let jobs = [];
        let numOfMachines;
        let machinesForRender = [];
        let loadsFromHistory = [];

        let elements = visualizeInput(this.props.inputArray, this.props.currentStep);

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
            return <React.Fragment>Please provide an input!<br /></React.Fragment>;
        }

        let inputString = jobs.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let makeSpan = this.props.currentStep === this.props.inputArray.length ?
            <React.Fragment>Makespan = {this.props.makeSpan}</React.Fragment> : <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                <p style={{ margin: 0, marginTop: "1em" }}>The input is &#123; {inputStringForRender} &#125; with {numOfMachines} machines.</p>
                <div className='input-holder'>
                    {elements}
                </div>
                <div className='machines-loads'>
                    <div className='machines'>
                        {machinesForRender}
                    </div>
                </div>
                Current step: {this.props.currentStep} / {this.props.inputArray.length}
                <br />
                <p className='explanation'>{this.props.currentHistory['explanation']}</p>
                {makeSpan}
                <br />
            </React.Fragment>
        );
    }
}

export default StandardSchVisualization;