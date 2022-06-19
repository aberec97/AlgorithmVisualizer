import './pagingAlg.css'
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class PagingAlgorithm extends Component {
    state = {
        currentStep: 0
    }

    nextStep = length => {
        if (length === 0) return;
        if (Number(this.state.currentStep) < Number(length)) {
            this.setState({
                currentStep: this.state.currentStep + 1
            });
        }
    };

    previousStep = () => {
        if (Number(this.state.currentStep) > 0) {
            this.setState({
                currentStep: this.state.currentStep - 1
            });
        }
    };

    solveWithFIFO(input, cache_size) {
        if (input[0] === "") {
            return { cost: 0, history: null };
        }
        let cache = [];
        let cost = 0;
        let history = new Map();
        history.set(0, cache.slice());
        for (let i = 0; i < input.length; i++) {
            let currentElement = input[i];
            if (cache.length < cache_size && !cache.includes(currentElement)) {
                cache.push(currentElement);
                cost++;
            }
            else {
                if (!cache.includes(currentElement)) {
                    cache.shift()
                    cache.push(currentElement);
                    cost++;
                }
            }
            history.set(Number(i + 1), cache.slice());
        }
        return { cost, history };
    }

    solveWithLRU(input, cache_size) {
        if (input[0] === "") {
            return { cost: 0, history: null };
        }
        let cache = [];
        let inputUntilNow = [];
        let cost = 0;
        let history = new Map();
        history.set(0, cache.slice());

        for (let i = 0; i < input.length; i++) {
            let currentElement = input[i];
            if (cache.length < cache_size && !cache.includes(currentElement)) {
                cache.push(currentElement);
                cost++;
            } else {
                if (!cache.includes(currentElement)) {
                    let order = [];
                    for (let j = inputUntilNow.length - 1; j >= 0; j--) {
                        let currentJ = inputUntilNow[j];
                        if (!order.includes(currentJ) && order.length < cache_size) {
                            order.push(currentJ);
                        }
                    }
                    let elementToRemove = order[order.length - 1];
                    cache.splice(cache.indexOf(elementToRemove), 1);
                    cache.push(currentElement);
                    cost++;
                }
            }
            history.set(Number(i + 1), cache.slice());
            inputUntilNow.push(currentElement);
        }
        return { cost, history };
    }

    solveWithSelectedAlgorithm(selectedAlg, input, cacheSize) {
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "FIFO": result = this.solveWithFIFO(input, cacheSize); break;
            case "LRU": result = this.solveWithLRU(input, cacheSize); break;
            default: result = null;
        }
        return result;
    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment></React.Fragment>;
        let inputString = this.props.inputArray.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let { cost, history } = this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.inputArray, this.props.cacheSize);

        if (history === null) {
            return (<p>Provide an input!</p>);
        }
        let cacheFromHistory = history.get(this.state.currentStep);

        const elements = cacheFromHistory.map((e) =>
            <div key={e} className='cache-items'>{e}</div>
        );

        return (
            <div>
                <p>Running {this.props.selectedAlgorithm} on &#123; {inputStringForRender} &#125; with cache size: {this.props.cacheSize}</p>
                <div>
                    Cache:
                </div>
                {elements}
                <div>
                    <div>
                        <Button variant="light" onClick={() => this.nextStep(this.props.inputArray.length)}>Next step</Button>
                        <Button variant="light" onClick={this.previousStep}>Previous step</Button>
                    </div>
                    The cost of running FIFO on this input is {cost}
                </div>
            </div>
        )
    }
}

export default PagingAlgorithm;