import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Arrows extends Component {
    state = {}

    nextStep = () => {
        const input = this.props.input;
        if (!input || input.length === 0 || !this.props.history || this.props.cost === 0) return;
        const currentStep = this.props.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(input.length)) {
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

    render() {
        return (
            <div>
                <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                <Button variant="light" onClick={this.nextStep}>&gt;</Button>
            </div>
        );
    }
}

export default Arrows;