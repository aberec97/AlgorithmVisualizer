import './pagingAlg.css'
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PagingVisualization from './pagingVisualization';


class PagingAlgorithm extends Component {
    state = {
        currentStep: 0,
        cost: 0,
        history: new Map(),
        indexOfRemoved: -1,
        isReadyForVisualization: false,
        inputArray: '',
        cacheSize: '',
        selectedAlgorithm: ''
    }

    intervalID = 0;

    nextStep = () => {
        const length = this.props.inputArray.length;
        if (length === 0 || !this.state.history || this.state.cost === 0) return;
        let currentStep = this.state.currentStep;
        let nextStep = currentStep + 1;
        if (Number(currentStep) < Number(length) - 1) {
            let indexOfRemoved = this.findRemovedElement(this.state.history.get(nextStep)['cache'], this.state.history.get(nextStep + 1)['cache']);
            this.setState({ indexOfRemoved });
        } else {
            this.setState({ indexOfRemoved: -1 });
        }
        if (Number(currentStep) < Number(length)) {
            this.setState({ currentStep: nextStep });
        } else {
            clearInterval(this.intervalID);
        }
    };

    previousStep = () => {
        if (!this.state.history || this.state.cost === 0) return;
        let currentStep = this.state.currentStep;
        let prevStep = currentStep - 1;
        if (Number(currentStep) > 1) {
            let indexOfRemoved = this.findRemovedElement(this.state.history.get(prevStep)['cache'], this.state.history.get(currentStep)['cache']);
            this.setState({ indexOfRemoved });
        } else {
            this.setState({ indexOfRemoved: -1 });
        }
        if (Number(currentStep) > 0) {
            this.setState({ currentStep: prevStep });
        }
    };

    firstStep = () => {
        if (!this.state.history || this.state.cost === 0) return;
        this.setCurrentStep(0);
    }

    lastStep = () => {
        const input = this.props.inputArray;
        if (!input || input.length === 0 || !this.state.history || this.state.cost === 0) return;
        this.setCurrentStep(this.props.inputArray.length);
    }

    setCurrentStep = (value) => {
        this.setState({ currentStep: value });
    }

    start = () => {
        this.intervalID = setInterval(() => {
            this.nextStep();
        }, 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalID);
    }

    stop = () => {
        clearInterval(this.intervalID);
    }

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
        let explanation = <br />;
        history.set(0, { cache: cache.slice(), explanation: explanation });
        for (let i = 0; i < input.length; i++) {
            let currentElement = input[i];
            if (cache.length < cache_size && !cache.includes(currentElement)) {
                cache.push(currentElement);
                cost++;
                explanation = "The previous input element was " + currentElement +
                    ". Cache had room for it so we inserted it.";
            }
            else if (!cache.includes(currentElement)) {
                explanation = "The previous input element was " + currentElement +
                    ". Cache was full so we needed to replace " + cache.shift() + " (FIFO always removes the first cache element). +1 insertion.";
                cache.push(currentElement);
                cost++;
            }
            else {
                explanation = "The previous input element was " + currentElement +
                    ". It was already in the cache so we didn't need to do anything.";
            }
            history.set(Number(i + 1), { cache: cache.slice(), explanation: explanation });
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
        let explanation = <br />;
        history.set(0, { cache: cache.slice(), explanation: explanation });
        for (let i = 0; i < input.length; i++) {
            let currentElement = input[i];
            if (cache.length < cache_size && !cache.includes(currentElement)) {
                cache.push(currentElement);
                cost++;
                explanation = "The previous input element was " + currentElement +
                    ". Cache had room for it so we inserted it.";
            } else if (!cache.includes(currentElement)) {
                let order = [];
                for (let j = inputUntilNow.length - 1; j >= 0; j--) {
                    let currentJ = inputUntilNow[j];
                    if (!order.includes(currentJ) && order.length < cache_size) {
                        order.push(currentJ);
                    }
                }
                let elementToRemove = order[order.length - 1];
                explanation = "The previous input element was " + currentElement +
                    ". Cache was full so we needed to replace " + elementToRemove + " (LRU always removes the least recently used element). +1 insertion.";
                cache.splice(cache.indexOf(elementToRemove), 1);
                cache.push(currentElement);
                cost++;
            } else {
                explanation = "The previous input element was " + currentElement +
                    ". It was already in the cache so we didn't need to do anything.";
            }
            history.set(Number(i + 1), { cache: cache.slice(), explanation: explanation });
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
        let explanation = <br />;
        history.set(0, { cache: cache.slice(), explanation: explanation });
        for (let i = 0; i < input.length; i++) {
            let currentElement = input[i];
            if (cache.length < cache_size && !cache.includes(currentElement)) {
                explanation = "The previous input element was " + currentElement +
                    ". Cache had room for it so we inserted it.";
                cache.push(currentElement);
                cost++;
            }
            else if (!cache.includes(currentElement)) {
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
                explanation = "The previous input element was " + currentElement +
                    ". Cache was full so we needed to replace " + elementToRemove +
                    " (LFD always removes the element that will be needed last). +1 insertion.";
                cache[cache.indexOf(elementToRemove)] = currentElement;
                cost++;
            } else {
                explanation = "The previous input element was " + currentElement +
                    ". It was already in the cache so we didn't need to do anything.";
            }

            history.set(Number(i + 1), { cache: cache.slice(), explanation: explanation });
        }
        return { cost, history };
    }

    solveWithSelectedAlgorithm(selectedAlg, input, cacheSize) {
        this.setState({
            inputArray: this.props.inputArray,
            cacheSize: this.props.cacheSize,
            selectedAlgorithm: this.props.selectedAlgorithm
        });
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "FIFO": result = this.solveWithFIFO(input, cacheSize); break;
            case "LRU": result = this.solveWithLRU(input, cacheSize); break;
            case "LFD": result = this.solveWithLFD(input, cacheSize); break;
            default: result = null;
        }
        if (result['history'] !== null) {
            this.setState({
                cost: result['cost'],
                history: result['history'],
                isReadyForVisualization: true,
                currentStep: 0
            });
        }
        return result;
    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment></React.Fragment>;

        let currentHistory = <React.Fragment></React.Fragment>;

        if (this.state.currentStep >= 0 && this.state.cost > 0) {
            currentHistory = this.state.history.get(this.state.currentStep);
        }

        let costVisualization = this.state.currentStep === this.state.inputArray.length ?
            <p>The cost of running {this.state.selectedAlgorithm} on this input is {this.state.cost}</p> : <br />;

        let visualization = this.state.isReadyForVisualization ?
            <div>
                <PagingVisualization
                    inputArray={this.state.inputArray}
                    cacheSize={this.state.cacheSize}
                    currentStep={this.state.currentStep}
                    history={currentHistory}
                    removedElementIndex={this.state.indexOfRemoved}
                    selectedAlgorithm={this.state.selectedAlgorithm}>
                </PagingVisualization>
                <br />
                <div>
                    <div>
                        <Button variant="light" onClick={this.firstStep}>|&lt;</Button>
                        <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                        <Button variant="light" onClick={this.stop}><i className="fa-sharp fa-solid fa-pause"></i></Button>
                        <Button variant="light" onClick={this.start}><i className="fa-sharp fa-solid fa-play"></i></Button>
                        <Button variant="light" onClick={this.nextStep}>&gt;</Button>
                        <Button variant="light" onClick={this.lastStep}>&gt;|</Button>
                    </div>
                    <br />
                    {costVisualization}
                </div>
            </div> : <React.Fragment></React.Fragment>;

        return (
            <div>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.inputArray, this.props.cacheSize)}>
                    Run
                </button>
                {visualization}
            </div>
        )
    }
}

export default PagingAlgorithm;