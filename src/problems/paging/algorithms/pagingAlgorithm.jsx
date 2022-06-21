import './pagingAlg.css'
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PagingVisualization from './pagingVisualization';


class PagingAlgorithm extends Component {
    state = {
        currentStep: 0,
        cost: 0,
        history: new Map(),
        indexOfRemoved: -1
    }

    nextStep = () => {
        const length = this.props.inputArray.length;
        if (length === 0 || !this.state.history || this.state.cost === 0) return;
        let currentStep = this.state.currentStep;
        let nextStep = currentStep + 1;
        if (Number(currentStep) < Number(length) - 1) {
            let indexOfRemoved = this.findRemovedElement(this.state.history.get(nextStep), this.state.history.get(nextStep + 1));
            this.setState({ indexOfRemoved });
        } else {
            this.setState({ indexOfRemoved: -1 });
        }
        if (Number(currentStep) < Number(length)) {
            this.setState({ currentStep: nextStep });
        }
    };

    previousStep = () => {
        if (!this.state.history || this.state.cost === 0) return;
        let currentStep = this.state.currentStep;
        let prevStep = currentStep - 1;
        if (Number(currentStep) > 1) {
            let indexOfRemoved = this.findRemovedElement(this.state.history.get(prevStep), this.state.history.get(currentStep));
            this.setState({ indexOfRemoved });
        } else {
            this.setState({ indexOfRemoved: -1 });
        }
        if (Number(currentStep) > 0) {
            this.setState({ currentStep: prevStep });
        }
    };

    findRemovedElement(currCache, nextCache) {
        let removedElementIndex = -1;
        for (let i = 0; i < currCache.length; i++) {
            if (!nextCache.includes(currCache[i])) {
                removedElementIndex = i;
            }
        }
        return removedElementIndex;
    }

    solveWithFIFO(input, cache_size) {
        if (input.length === 0) {
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
        if (input.length === 0) {
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

    solveWithLFD(input, cache_size) {
        if (input.length === 0) {
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
                    let nextCachePos = [];
                    let elementToRemove;
                    for (let j = i; j < input.length; j++) {
                        if (cache.includes(input[j]) && !nextCachePos.includes(input[j])) {
                            nextCachePos.push(input[j]);
                        }
                    }
                    if (nextCachePos.length < cache.length) {
                        for (let j = 0; j < cache.length; j++) {
                            if (!nextCachePos.includes(cache[j])) {
                                elementToRemove = cache[j]; break;
                            }
                        }
                    } else {
                        elementToRemove = nextCachePos[nextCachePos.length - 1];
                    }
                    cache[cache.indexOf(elementToRemove)] = currentElement;
                    cost++;
                }
            }
            history.set(Number(i + 1), cache.slice());
        }
        return { cost, history };
    }

    solveWithSelectedAlgorithm(selectedAlg, input, cacheSize) {
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "FIFO": result = this.solveWithFIFO(input, cacheSize); break;
            case "LRU": result = this.solveWithLRU(input, cacheSize); break;
            case "LFD": result = this.solveWithLFD(input, cacheSize); break;
            default: result = null;
        }
        this.setState({ cost: result['cost'], history: result['history'] });
        return result;
    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment></React.Fragment>;
        let inputString = this.props.inputArray.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let elements = <React.Fragment></React.Fragment>;
        let cacheFromHistory;

        if (!this.state.history) {
            return (<p>Provide an input!</p>);
        }

        if (this.state.currentStep > 0 && this.state.cost > 0) {
            cacheFromHistory = this.state.history.get(this.state.currentStep);
            elements = cacheFromHistory;
        }

        return (
            <div>
                <p>You selected {this.props.selectedAlgorithm} with &#123; {inputStringForRender} &#125; input and cache size of {this.props.cacheSize}.
                    Now press the Run button to see the result!</p>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.inputArray, this.props.cacheSize)}>
                    Run
                </button>
                <br />
                <PagingVisualization
                    inputArray={this.props.inputArray}
                    cacheSize={this.props.cacheSize}
                    currentStep={this.state.currentStep}
                    cacheElements={elements}
                    removedElementIndex={this.state.indexOfRemoved}>
                </PagingVisualization>
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
        )
    }
}

export default PagingAlgorithm;