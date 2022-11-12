import React, { Component } from 'react';
import BinPackingVisualization from './binPackingVisualization';

class BinPackingAlgorithm extends Component {
    state = {
        cost: 0,
        history: new Map(),
        selectedAlgorithm: '',
        input: '',
        currentStep: 0,
        visualize: false
    }

    setCurrentStep = (value) => {
        this.setState({ currentStep: value });
    }

    solveWithSelectedAlgorithm(selectedAlg, input) {
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "Next Fit": result = this.solveWithNextFit(input); break;
            case "First Fit": result = this.solveWithFirstFit(input); break;
            default: result = null;
        }
        this.setState({
            cost: result['cost'], history: result['history'],
            selectedAlgorithm: selectedAlg, input: input, currentStep: 0, visualize: true
        });
        return result;
    }

    solveWithNextFit(input) {
        if (input.length === 1 && input[0] === 0) return 0;

        let cost = 0;
        let bins = [];
        let history = new Map();
        let explanation = "";
        history.set(0, {});

        for (let i = 0; i < input.length; i++) {
            let item = Number(input[i]) * 10;
            let openBin;
            if (bins.length > 0) {
                openBin = bins[bins.length - 1];
            }
            if (bins.length <= 0 || (item + Number(openBin['fullness']) > Number(openBin['capacity']))) {
                bins.push({
                    capacity: 10,
                    fullness: item,
                    items: [item]
                });
                cost += 1;
                explanation = "The previous item was " + input[i] +
                    ", we did not have an open bin which could store it so we opened a new one. +1 cost.";
            } else {
                let sum = openBin['fullness'] + item;
                openBin['fullness'] = sum;
                openBin['items'].push(item);
                explanation = "The previous item was " + input[i] +
                    ", we were able to store it in the open bin. This action was free because we didn't need to open a new bin.";
            }
            history.set(Number(i + 1), { item: item, bin: bins.length, explanation: explanation });
        }
        return { cost, history };
    }

    solveWithFirstFit(input) {
        if (input.length === 1 && input[0] === 0) return 0;

        let cost = 0;
        let bins = [];
        let history = new Map();
        let explanation = "";
        history.set(0, {});

        for (let i = 0; i < input.length; i++) {
            let item = Number(input[i]) * 10;
            let chosenBin;
            let currentBin;
            for (let j = 0; j <= bins.length; j++) {
                if (j === bins.length) {
                    bins.push({
                        capacity: 10,
                        fullness: item,
                        items: [item]
                    });
                    chosenBin = j + 1;
                    cost += 1;
                    explanation = "The previous item was " + input[i] +
                        ", we did not have an open bin which could store it so we opened a new one. +1 cost.";
                    break;
                }
                currentBin = bins[j];
                if (item + Number(currentBin['fullness']) <= Number(currentBin['capacity'])) {
                    let sum = currentBin['fullness'] + item;
                    currentBin['fullness'] = sum;
                    currentBin['items'].push(item);
                    chosenBin = bins.indexOf(currentBin) + 1;
                    explanation = "The previous item was " + input[i] +
                        ", we were able to store it in the " + chosenBin + ". bin. This action was free as we didn't need to open a new bin.";
                    break;
                }
            }
            history.set(Number(i + 1), { item: item, bin: chosenBin, explanation: explanation });
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

        let costViz = this.state.currentStep === this.state.input.length ?
            <p>The cost of running {this.state.selectedAlgorithm} on this input is {this.state.cost}</p> :
            <React.Fragment></React.Fragment>;

        let visualization = this.state.visualize ? <React.Fragment>
            <p>You selected {this.state.selectedAlgorithm} with &#123; {inputStringForRender} &#125; input.</p>
            <br />
            <BinPackingVisualization
                history={this.state.history}
                input={this.props.input}
                currentStep={this.state.currentStep}
                previousStep={this.previousStep}
                nextStep={this.nextStep}
                cost={this.state.cost}
                setCurrentStep={this.setCurrentStep}>
            </BinPackingVisualization>
            <br />
            <div>
                {costViz}
            </div>
        </React.Fragment> : <React.Fragment></React.Fragment>;

        return (
            <div>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.input)}>
                    Run
                </button>
                {visualization}
            </div>
        );
    }
}

export default BinPackingAlgorithm;