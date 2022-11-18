import React, { Component } from 'react';
import { v4 } from 'uuid';

class SchTimeModelVisualization extends Component {
    render() {
        let numOfMachines = this.props.numOfMachines;
        let history = this.props.history;
        let itemsForHighlight = [];
        let machinesForRender = [];

        if (this.props.selectedAlgorithm === "INTV") {
            let currentMachines = [];
            let currentMaxLoads = [];
            for (let i = 0; i < this.props.currentStep; i++) {
                let currMachines = history.get(i)['machines'];
                currentMachines.push(currMachines.map(m => m['items']));
                currentMaxLoads.push(history.get(i)['maxLoad']);
            }

            for (let j = 0; j < this.props.numOfMachines; j++) {
                let allItems = [];
                for (let i = 0; i < currentMachines.length; i++) {
                    let loadSum = 0;
                    for (let x = 0; x < currentMachines[i][j].length; x++) {
                        let job = currentMachines[i][j][x]['job'];
                        let time = currentMachines[i][j][x]['time'];
                        let width = job * 2 + "em";
                        loadSum += job;
                        allItems.push(<div key={v4()} className='load' style={{ width: width }}>{job},{time}</div>);
                        if (i === this.props.currentStep - 1) {
                            let str = "(" + job + ", " + time + ")";
                            itemsForHighlight.push(<div key={v4()} className='highlighted m-2'>{str}</div>);
                        }
                    }
                    if (loadSum < currentMaxLoads[i]) {
                        let width = (currentMaxLoads[i] - loadSum) * 2 + "em";
                        allItems.push(<div key={v4()} style={{ width: width }}> </div>);
                    }
                }
                machinesForRender.push(<div key={v4()} style={{ display: "flex" }}><i className="fa-solid fa-desktop fa-xl"></i>{allItems}</div>);
            }
        } else {
            let currentMachines = [];
            let currentLoads = [];
            for (let i = 0; i < this.props.currentStep; i++) {
                itemsForHighlight = [];
                let currMachines = history.get(i)['machines'];
                if (history.get(i)['prevJobs']) {
                    itemsForHighlight = history.get(i)['prevJobs'].map(m => { return <div key={v4()} className='highlighted m-2'>{"(" + m['job'] + ", " + m['time'] + ")"}</div> });
                }
                currentLoads.push(currMachines.map(m => m['load']));
                currentMachines.push(currMachines.map(m => m['items']));
            }

            for (let j = 0; j < this.props.numOfMachines; j++) {
                let allItems = [];
                let min = Number.MAX_SAFE_INTEGER;
                for (let i = 0; i < currentMachines.length; i++) {
                    allItems = [];
                    for (let x = 0; x < currentMachines[i][j].length; x++) {
                        if (currentMachines[i][j][x].hasOwnProperty('space')) {
                            allItems.push(<div key={v4()} style={{ width: currentMachines[i][j][x]['space'] }}> </div>);
                        } else {
                            let job = currentMachines[i][j][x]['job'];
                            let time = currentMachines[i][j][x]['time'];
                            if (job < min) {
                                min = time;
                            }
                            let width = job * 2 + "em";
                            allItems.push(<div key={v4()} className='load' style={{ width: width }}>{job},{time}</div>);
                        }
                    }
                }
                machinesForRender.push(<div key={v4()} style={{ display: "flex" }}><i className="fa-solid fa-desktop fa-xl"></i>{allItems}</div>);
            }
        }

        let inputString = this.props.inputArray.map(j => j + ";").toString();
        let inputStringForRender = inputString.replace(/,/g, " ");

        let makeSpan = this.props.currentStep === this.props.counter ?
            <p>Makespan = {this.props.makeSpan}</p> : <p><br /></p>;

        let explanation = this.props.currentStep > 0 ? history.get(this.props.currentStep - 1)['explanation'] : "";

        return (
            <React.Fragment>
                <p style={{ margin: 0, marginTop: "1em" }}>You selected {this.props.selectedAlgorithm} with
                    &#123; {inputStringForRender} &#125; input and {numOfMachines} machines.</p>
                <div className='input-holder'>
                    {itemsForHighlight}
                </div>
                <div className='machines-loads'>
                    <div className='machines'>
                        {machinesForRender}
                    </div>
                </div>
                <p>Current step: {this.props.currentStep} / {this.props.counter}</p>
                <p className='explanation'>{explanation}</p>
                {makeSpan}
            </React.Fragment>
        );
    }
}

export default SchTimeModelVisualization;