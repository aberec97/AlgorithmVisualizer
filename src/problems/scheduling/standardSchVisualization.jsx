import React, { Component } from 'react';

class StandardSchVisualization extends Component {
    state = {
        currentStep: 0
    }
    render() {

        if (!this.props.visualize) {
            return <React.Fragment>Run the algorithm!</React.Fragment>;
        }

        let jobs = [];
        let numOfMachines;
        let machinesForRender = [];
        let loadsFromHistory = [];
        let loadsForRender = [];
        if (this.props.inputArray && this.props.inputArray.length > 0 && this.props.numOfMachines > 0) {
            jobs = this.props.inputArray;
            numOfMachines = this.props.numOfMachines;
            loadsFromHistory = this.props.loadsFromHistory;
            for (let i = 0; i < numOfMachines; i++) {
                machinesForRender.push(<i key={i} className="fa-solid fa-desktop"></i>);
                let load = (loadsFromHistory[i] * 2) + "em";
                loadsForRender.push(<div key={i} className='load' style={{ width: load }}>{loadsFromHistory[i]}</div>);
            }
        }
        else {
            return <React.Fragment>Please provide an input!</React.Fragment>;
        }

        let inputString = jobs.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        return (
            <React.Fragment>
                {inputStringForRender} and {numOfMachines}
                <div className='machines-loads'>
                    <div className='machines'>
                        {machinesForRender}
                    </div>
                    <div className='machines'>
                        {loadsForRender}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StandardSchVisualization;