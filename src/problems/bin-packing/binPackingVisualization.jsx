import React, { Component } from 'react';
import './bin-packing.css'

class BinPackingVisualization extends Component {
    render() {

        let inputLength = this.props.input.length;
        let history = this.props.history;
        console.log(history);
        let currentStep = this.props.currentStep;
        let bins = new Map();
        bins.set(0, [])
        let currentItemAndBin;
        let binsForVisualization = [];
        let fullnessIndicator;

        for (let i = 1; i <= currentStep; i++) {
            currentItemAndBin = history.get(i);
            let currentBin = currentItemAndBin['bin'];
            if (!bins.has(currentBin)) {
                bins.set(currentBin, []);
                binsForVisualization.push([]);
            }
            let currentItem = currentItemAndBin['item'];
            bins.get(currentBin).push(currentItem);
            fullnessIndicator = currentItem + "em";
            binsForVisualization[currentBin - 1].push(
                Number(currentItem) === 10 ?
                    <div key={i} style={{ height: fullnessIndicator }} className='bin-item'>{currentItem / 10}</div> :
                    <div key={i} style={{ height: fullnessIndicator }} className='bin-item'>0.{currentItem}</div>);
        }
        let visualize = [];

        for (let i = 0; i < binsForVisualization.length; i++) {
            visualize.push(<div key={i} className='bin'>{binsForVisualization[i]}</div>)
        }

        return (
            <React.Fragment>
                <div className='bin-container'>
                    {visualize}
                </div>
                Current step: {this.props.currentStep} / {inputLength}
            </React.Fragment>
        );
    }
}

export default BinPackingVisualization;