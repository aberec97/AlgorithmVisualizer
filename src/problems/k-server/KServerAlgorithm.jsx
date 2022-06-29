import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class KServerAlgorithm extends Component {
    state = {
        currentStep: 0,
        cost: 0,
        history: new Map()
    }

    nextStep = () => {
        if (!this.props.input || this.props.input.length === 0 || !this.state.history || this.state.cost === 0) return;
        const currentStep = this.state.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(this.props.input.length)) {
            this.setState({ currentStep: nextStep });
        }
    };

    previousStep = () => {
        if (!this.state.history || this.state.cost === 0) return;
        let currentStep = this.state.currentStep;
        let prevStep = currentStep - 1;
        if (Number(currentStep) > 0) {
            this.setState({ currentStep: prevStep });
        }
    };

    solveWithSelectedAlgorithm(selectedAlg, input) {
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "DC": result = this.solveWithDC(input); break;
            case "Lazy DC": result = this.solveWithLazyDC(input); break;
            default: result = null;
        }
        this.setState({ cost: result['cost'], history: result['history'] });
        return result;
    }

    solveWithDC(input) {

    }

    solveWithLazyDC(input) {

    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment>Select an algorithm!</React.Fragment>;

        let startConfigString = this.props.startConfig.toString();
        let startConfigStringForRender = startConfigString.replace(/,/g, ", ");

        let inputString = this.props.input.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        return (
            <div>
                <p>You selected {this.props.selectedAlgorithm} with &#123; {startConfigStringForRender} &#125; starting configuration
                    and &#123; {inputStringForRender} &#125; input. Press Run to see the result!
                </p>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.input)}>
                    Run
                </button>
                <br />
                visualization
                <br />
                <div>
                    <div>
                        <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                        <Button variant="light" onClick={this.nextStep}>&gt;</Button>
                    </div>
                    <br />
                    The cost of running {this.props.selectedAlgorithm} on this input is {this.state.cost}
                </div>
            </div>
        );
    }
}

export default KServerAlgorithm;