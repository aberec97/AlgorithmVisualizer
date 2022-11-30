import React, { Component } from 'react';
import './bin-packing.css';
import Arrows from '../../common/arrows';
import { visualizeInput } from '../../common/utilities';

class BinPackingVisualization extends Component {

    render() {
        let inputLength = this.props.input.length;
        let history = this.props.history;
        let currentStep = this.props.currentStep;
        let bins = new Map();
        let currentItemAndBin;
        let binItems = [];
        let fullnessIndicator;

        for (let i = 1; i <= currentStep; i++) {
            currentItemAndBin = history.get(i);
            let currentBin = currentItemAndBin['bin'];
            if (!bins.has(currentBin)) {
                bins.set(currentBin, []);
                binItems.push([]);
            }
            let currentItem = currentItemAndBin['item'];
            bins.get(currentBin).push(currentItem);
            fullnessIndicator = currentItem + "em";
            binItems[currentBin].push(
                Number(currentItem) === 10 ?
                    <div key={i} style={{ height: fullnessIndicator }} className='bin-item'>{currentItem / 10}</div> :
                    <div key={i} style={{ height: fullnessIndicator }} className='bin-item'>0.{currentItem}</div>);
        }
        let elements = visualizeInput(this.props.input, this.props.currentStep);
        let binsForVisualization = [];
        for (let i = 0; i < binItems.length; i++) {
            binsForVisualization.push(<div key={i} className='bin'>{binItems[i]}</div>)
        }

        return (
            <React.Fragment>
                <div className='input-holder'>
                    {elements}
                </div>
                <div className='bin-container'>
                    {binsForVisualization}
                </div>
                Current step: {this.props.currentStep} / {inputLength}
                <p className='explanation'>{this.props.history.get(this.props.currentStep)['explanation']}</p>
                <Arrows
                    input={this.props.input.length}
                    history={this.props.history}
                    cost={this.props.cost}
                    currentStep={this.props.currentStep}
                    setCurrentStep={this.props.setCurrentStep}
                ></Arrows>
            </React.Fragment>
        );
    }
}

export default BinPackingVisualization;