import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import KServerVisualization from './kServerVisualization';

class KServerAlgorithm extends Component {
    state = {
        currentStep: 0,
        cost: -1,
        history: new Map(),
        range: []
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

    findRange(startConfig, input) {
        let confCopy = [...startConfig]
        let conf = confCopy.map(e => Number(e));
        let inpCopy = [...input];
        let inp = inpCopy.map(e => Number(e));
        conf.sort((a, b) => a - b);
        inp.sort((a, b) => a - b);

        let range = [];
        let min, max = -1;

        if (conf[0] > inp[0]) {
            min = inp[0];
        } else {
            min = conf[0];
        }
        if (conf[conf.length - 1] > inp[inp.length - 1]) {
            max = conf[conf.length - 1];
        } else {
            max = inp[inp.length - 1];
        }
        range.push(min);
        range.push(max);
        return range;
    }

    solveWithSelectedAlgorithm(selectedAlg, input, startConfig) {
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "DC": result = this.solveWithDC(input, startConfig); break;
            case "Lazy DC": result = this.solveWithLazyDC(input, startConfig); break;
            default: result = null;
        }
        let range = this.findRange(this.props.startConfig, this.props.input);
        this.setState({ cost: result['cost'], history: result['history'] });
        this.setState({ range });
    }

    distance(x, y) {
        return Math.abs(x - y);
    }

    compareRequestToServers(serverPositions, request) {
        let allPositions = [...serverPositions];
        let requestPosition = Number(-1);
        for (let i = 0; i < serverPositions.length; i++) {
            let currentServer = Number(serverPositions[i]);
            if (request === currentServer) {
                return serverPositions;
            }
            else if (request < currentServer) {
                currentServer === 0 ?
                    requestPosition = 0 :
                    requestPosition = i;
                break;
            } else if (currentServer < request) {
                requestPosition = i + 1;
            }
        }
        if (requestPosition >= 0) allPositions.splice(requestPosition, 0, request);
        return allPositions;
    }

    moveServer(serverPositions, from, to) {
        serverPositions[serverPositions.indexOf(from)] = to;
        serverPositions.sort((a, b) => a - b);
    }

    solveWithDC(input, startConfig) {
        let start = [...startConfig];
        let serverPositions = start.map(s => Number(s));
        serverPositions.sort((a, b) => a - b);
        let cost = Number(0);

        let history = new Map();
        history.set(Number(0), serverPositions.slice());

        for (let i = 0; i < input.length; i++) {
            let request = Number(input[i]);
            let allPositions = this.compareRequestToServers(serverPositions, request);
            if (serverPositions.length === allPositions.length) {
                history.set(Number(i + 1), serverPositions.slice());
                continue;
            }
            for (let j = 0; j < allPositions.length; j++) {
                let currentElement = allPositions[j];
                if (currentElement === request) {
                    if (currentElement === allPositions[0]) {
                        let nextElement = allPositions[j + 1];
                        cost += this.distance(request, nextElement);
                        this.moveServer(serverPositions, nextElement, request);
                        history.set(Number(i + 1), serverPositions.slice());
                        break;
                    }
                    else if (currentElement === allPositions[allPositions.length - 1]) {
                        let prevElement = allPositions[j - 1];
                        cost += this.distance(request, prevElement);
                        this.moveServer(serverPositions, prevElement, request);
                        history.set(Number(i + 1), serverPositions.slice());
                        break;
                    }
                    else {
                        let prevElement = allPositions[j - 1];
                        let nextElement = allPositions[j + 1];
                        let distanceRequestPrevElement = this.distance(request, prevElement);
                        let distanceRequestNextElement = this.distance(request, nextElement);
                        if (distanceRequestPrevElement <= distanceRequestNextElement) {
                            cost += 2 * distanceRequestPrevElement;
                            this.moveServer(serverPositions, prevElement, request);
                            this.moveServer(serverPositions, nextElement, nextElement - distanceRequestPrevElement);
                            history.set(Number(i + 1), serverPositions.slice());
                        } else {
                            cost += 2 * distanceRequestNextElement;
                            this.moveServer(serverPositions, nextElement, request);
                            this.moveServer(serverPositions, prevElement, prevElement + distanceRequestNextElement);
                            history.set(Number(i + 1), serverPositions.slice());
                        }
                        break;
                    }
                }
            }
        }
        return { cost, history };
    }

    solveWithLazyDC(input, startConfig) {
        let start = [...startConfig];
        let serverPositions = start.map(s => Number(s));
        serverPositions.sort((a, b) => a - b);
        let cost = Number(0);

        let history = new Map();
        history.set(Number(0), serverPositions.slice());

        for (let i = 0; i < input.length; i++) {
            let request = Number(input[i]);
            let allPositions = this.compareRequestToServers(serverPositions, request);
            if (serverPositions.length === allPositions.length) {
                history.set(Number(i + 1), serverPositions.slice());
                continue;
            }
            for (let j = 0; j < allPositions.length; j++) {
                let currentElement = allPositions[j];
                if (currentElement === request) {
                    if (currentElement === allPositions[0]) {
                        let nextElement = allPositions[j + 1];
                        cost += this.distance(request, nextElement);
                        this.moveServer(serverPositions, nextElement, request);
                        history.set(Number(i + 1), serverPositions.slice());
                        break;
                    }
                    else if (currentElement === allPositions[allPositions.length - 1]) {
                        let prevElement = allPositions[j - 1];
                        cost += this.distance(request, prevElement);
                        this.moveServer(serverPositions, prevElement, request);
                        history.set(Number(i + 1), serverPositions.slice());
                        break;
                    }
                    else {
                        let prevElement = allPositions[j - 1];
                        let nextElement = allPositions[j + 1];
                        let distanceRequestPrevElement = this.distance(request, prevElement);
                        let distanceRequestNextElement = this.distance(request, nextElement);
                        if (distanceRequestPrevElement <= distanceRequestNextElement) {
                            cost += distanceRequestPrevElement;
                            this.moveServer(serverPositions, prevElement, request);
                            history.set(Number(i + 1), serverPositions.slice());
                        } else {
                            cost += distanceRequestNextElement;
                            this.moveServer(serverPositions, nextElement, request);
                            history.set(Number(i + 1), serverPositions.slice());
                        }
                        break;
                    }
                }
            }
        }
        return { cost, history };
    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment>Select an algorithm!</React.Fragment>;

        let startConfigString = this.props.startConfig.toString();
        let startConfigStringForRender = startConfigString.replace(/,/g, ", ");

        let inputString = this.props.input.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let servers = [];
        if (this.state.cost >= 0) servers = this.state.history.get(this.state.currentStep);

        return (
            <div>
                <p>You selected {this.props.selectedAlgorithm} with &#123; {startConfigStringForRender} &#125; starting configuration
                    and &#123; {inputStringForRender} &#125; input. Press Run to see the result!
                </p>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.input, this.props.startConfig)}>
                    Run
                </button>
                <br />
                <KServerVisualization
                    cost={this.state.cost}
                    servers={servers}
                    selectedAlgorithm={this.props.selectedAlgorithm}
                    range={this.state.range}
                    currentStep={this.state.currentStep}
                    input={this.props.input}>
                </KServerVisualization>
                <br />
                <div>
                    <div>
                        <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                        <Button variant="light" onClick={this.nextStep}>&gt;</Button>
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}

export default KServerAlgorithm;