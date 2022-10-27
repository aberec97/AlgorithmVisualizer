import React, { Component } from 'react';
import './bin-packing.css';
import Button from 'react-bootstrap/Button';

class BinPackingVisualization extends Component {
    state = {
        currentStep: 0
    }

    nextStep = () => {
        if (!this.props.input || this.props.input.length === 0 || !this.props.history || this.props.cost === 0) return;
        const currentStep = this.state.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(this.props.input.length)) {
            this.setState({ currentStep: nextStep });
        }
    };

    previousStep = () => {
        if (!this.props.history || this.props.cost === 0) return;
        let currentStep = this.state.currentStep;
        let prevStep = currentStep - 1;
        if (Number(currentStep) > 0) {
            this.setState({ currentStep: prevStep });
        }
    };

    render() {
        let inputLength = this.props.input.length;
        let history = this.props.history;
        let currentStep = this.state.currentStep;
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
                Current step: {this.state.currentStep} / {inputLength}
                <div>
                    <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                    <Button variant="light" onClick={this.nextStep}>&gt;</Button>
                </div>
            </React.Fragment>
        );
    }
}

export default BinPackingVisualization;