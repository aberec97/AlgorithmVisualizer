import React, { Component } from 'react';
import BinPackingVisualization from './binPackingVisualization';

class BinPackingAlgorithm extends Component {
    state = {
        cost: 0,
        history: new Map(),
        selectedAlgorithm: '',
        input: '',
        currentStep: 0
    }

    nextStep = () => {
        if (!this.state.input || this.state.input.length === 0 || !this.state.history || this.state.cost === 0) return;
        const currentStep = this.state.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(this.state.input.length)) {
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
        this.setState({ cost: result['cost'], history: result['history'], selectedAlgorithm: selectedAlg, input: input, currentStep: 0 });
        return result;
    }

    solveWithNextFit(input) {
        if (input.length === 1 && input[0] === 0) return 0;

        let cost = 0;
        let bins = [];
        let bin = {
            capacity: 10,
            fullness: 0,
            items: []
        }
        bins.push(bin);
        cost += 1;
        let history = new Map();
        history.set(0, {});

        for (let i = 0; i < input.length; i++) {
            let item = Number(input[i]) * 10;
            let openBin = bins[bins.length - 1];
            if (item + Number(openBin['fullness']) <= Number(openBin['capacity'])) {
                let sum = openBin['fullness'] + item;
                openBin['fullness'] = sum;
                openBin['items'].push(item);
            } else {
                bins.push({
                    capacity: 10,
                    fullness: item,
                    items: [item]
                });
                cost += 1;
            }
            history.set(Number(i + 1), { item: item, bin: bins.length });
        }
        return { cost, history };
    }

    solveWithFirstFit(input) {
        if (input.length === 1 && input[0] === 0) return 0;

        let cost = 0;
        let bins = [];
        let bin = {
            capacity: 10,
            fullness: 0,
            items: []
        }
        bins.push(bin);
        cost += 1;
        let history = new Map();
        history.set(0, {});

        for (let i = 0; i < input.length; i++) {
            let item = Number(input[i]) * 10;
            let choosenBin;
            let currentBin;
            for (let j = 0; j <= bins.length; j++) {
                if (j === bins.length) {
                    bins.push({
                        capacity: 10,
                        fullness: item,
                        items: [item]
                    });
                    choosenBin = j + 1;
                    cost += 1;
                    break;
                }
                currentBin = bins[j];
                if (item + Number(currentBin['fullness']) <= Number(currentBin['capacity'])) {
                    let sum = currentBin['fullness'] + item;
                    currentBin['fullness'] = sum;
                    currentBin['items'].push(item);
                    choosenBin = bins.indexOf(currentBin) + 1;
                    break;
                }
            }
            history.set(Number(i + 1), { item: item, bin: choosenBin });
        }
        return { cost, history };
    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment></React.Fragment>;
        let inputString = this.state.input.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        if (!this.state.history) {
            return (<p>Provide an input!</p>);
        }

        return (
            <div>
                <p>You selected {this.state.selectedAlgorithm} with &#123; {inputStringForRender} &#125; input.
                    Press the Run button to see the result!
                </p>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.input)}>
                    Run
                </button>
                <br />
                <BinPackingVisualization
                    history={this.state.history}
                    input={this.props.input}
                    currentStep={this.state.currentStep}
                    previousStep={this.previousStep}
                    nextStep={this.nextStep}>
                </BinPackingVisualization>
                <br />
                <div>
                    <br />
                    The cost of running {this.state.selectedAlgorithm} on this input is {this.state.cost}
                </div>
            </div>
        );
    }
}

export default BinPackingAlgorithm;