import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Arrows extends Component {
    state = {}

    nextStep = () => {
        const length = this.props.input;
        if (!length || length === 0 || !this.props.history || this.props.cost === 0) return;
        const currentStep = this.props.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(length)) {
            this.props.setCurrentStep(nextStep);
        }
    };

    previousStep = () => {
        if (!this.props.history || this.props.cost === 0) return;
        let currentStep = this.props.currentStep;
        let prevStep = currentStep - 1;
        if (Number(currentStep) > 0) {
            this.props.setCurrentStep(prevStep);
        }
    };

    firstStep = () => {
        if (!this.props.history || this.props.cost === 0) return;
        this.props.setCurrentStep(0);
    }

    lastStep = () => {
        const length = this.props.input;
        if (!length || length === 0 || !this.props.history || this.props.cost === 0) return;
        this.props.setCurrentStep(length);
    }

    render() {
        return (
            <div>
                <Button variant="light" onClick={this.firstStep}>|&lt;</Button>
                <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                <Button variant="light" onClick={this.nextStep}>&gt;</Button>
                <Button variant="light" onClick={this.lastStep}>&gt;|</Button>
            </div>
        );
    }
}

export default Arrows;