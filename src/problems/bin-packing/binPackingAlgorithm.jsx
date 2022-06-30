import React, { Component } from 'react';
import BinPackingVisualization from './binPackingVisualization';
import Button from 'react-bootstrap/Button';

class BinPackingAlgorithm extends Component {
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
            case "Next Fit": result = this.solveWithNextFit(input); break;
            case "First Fit": result = this.solveWithFirstFit(input); break;
            default: result = null;
        }
        this.setState({ cost: result['cost'], history: result['history'] });
        return result;
    }

    solveWithNextFit(input) {
        if (input.length === 1 && input[0] === 0) return 0;

        let cost = 0;
        let bins = [];
        let bin = {
            capacity: 10,
            fullness: 0
        }
        bins.push(bin);
        cost += 1;
        let history = new Map();
        history.set(0, bins.slice());

        for (let i = 0; i < input.length; i++) {
            let item = Number(input[i]) * 10;
            let openBin = bins[bins.length - 1];
            if (item + Number(openBin['fullness']) <= Number(openBin['capacity'])) {
                let sum = openBin['fullness'] + item;
                openBin['fullness'] = sum;
            } else {
                bins.push({
                    capacity: 10,
                    fullness: item
                });
                cost += 1;
            }
            //how many steps the algo takes can be extracted from here
            history.set(Number(i + 1), bins.slice());
        }
        return { cost, history };
    }

    solveWithFirstFit(input) {
        if (input.length === 1 && input[0] === 0) return 0;

        let cost = 0;
        let bins = [];
        let bin = {
            capacity: 10,
            fullness: 0
        }
        bins.push(bin);
        cost += 1;
        let history = new Map();
        history.set(0, bins.slice());

        for (let i = 0; i < input.length; i++) {
            let item = Number(input[i]) * 10;
            for (let j = 0; j < bins.length; j++) {
                let currentBin = bins[j];
                if (item + Number(currentBin['fullness']) <= Number(currentBin['capacity'])) {
                    currentBin['fullness'] += item;
                    item = 0;
                }
            }
            if (item !== 0) {
                bins.push({
                    capacity: 10,
                    fullness: item
                });
                cost += 1;
            }
            history.set(Number(i + 1), bins.slice());
        }

        return { cost, history };
    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment></React.Fragment>;
        let inputString = this.props.input.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let bins = <React.Fragment></React.Fragment>;

        if (!this.state.history) {
            return (<p>Provide an input!</p>);
        }

        if (this.state.cost > 0) {
            bins = this.state.history.get(this.state.currentStep);
        }

        return (
            <div>
                <p>You selected {this.props.selectedAlgorithm} with &#123; {inputStringForRender} &#125; input.
                    Press the Run button to see the result!
                </p>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.input)}>
                    Run
                </button>
                <br />
                <BinPackingVisualization
                    bins={bins}
                    currentStep={this.state.currentStep}
                    input={this.props.input}>
                </BinPackingVisualization>
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

export default BinPackingAlgorithm;