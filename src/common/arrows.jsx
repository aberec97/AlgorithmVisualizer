import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Arrows extends Component {
    state = {
        alreadyStarted: false
    }
    intervalID = 0;

    nextStep = () => {
        const length = this.props.input;
        if (!length || length === 0 || !this.props.history || this.props.cost === 0) return;
        const currentStep = this.props.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(length)) {
            this.props.setCurrentStep(nextStep);
        }
        else {
            clearInterval(this.intervalID);
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

    start = () => {
        if (!this.state.alreadyStarted) {
            this.intervalID = setInterval(() => {
                this.nextStep();
            }, 1000);
            this.setState({ alreadyStarted: true });
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalID);
    }

    stop = () => {
        if (this.state.alreadyStarted) {
            clearInterval(this.intervalID);
            this.setState({ alreadyStarted: false });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Button variant="light" onClick={this.firstStep}>|&lt;</Button>
                    <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                    <Button variant="light" onClick={this.stop}><i className="fa-sharp fa-solid fa-pause"></i></Button>
                    <Button variant="light" onClick={this.start}><i className="fa-sharp fa-solid fa-play"></i></Button>
                    <Button variant="light" onClick={this.nextStep}>&gt;</Button>
                    <Button variant="light" onClick={this.lastStep}>&gt;|</Button>
                </div>
            </React.Fragment>

        );
    }
}

export default Arrows;