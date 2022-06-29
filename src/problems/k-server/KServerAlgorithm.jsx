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

    solveWithSelectedAlgorithm(selectedAlg, input, startConfig) {
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "DC": result = this.solveWithDC(input, startConfig); break;
            case "Lazy DC": result = this.solveWithLazyDC(input, startConfig); break;
            default: result = null;
        }
        this.setState({ cost: result['cost'], history: result['history'] });
        return result;
    }

    distance(x, y) {
        return Math.abs(x - y);
    }

    compareRequestToServers(serverPositions, request) {
        let allPositions = [...serverPositions];
        let requestPosition = -1;
        for (let i = 0; i < serverPositions.length; i++) {
            let currentServer = Number(serverPositions[i]);
            if (request === currentServer) {
                break;
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
        serverPositions.sort();
    }

    solveWithDC(input, startConfig) {
        let start = [...startConfig];
        let serverPositions = start.map(s => Number(s));
        serverPositions.sort();
        let cost = 0;

        for (let i = 0; i < input.length; i++) {
            let request = Number(input[i]);
            let allPositions = this.compareRequestToServers(serverPositions, request);
            if (serverPositions.length === allPositions.length) {
                continue;
            }
            for (let j = 0; j < allPositions.length; j++) {
                let currentElement = allPositions[j];
                if (currentElement === request) {
                    if (currentElement === 0) {
                        let nextElement = allPositions[j + 1];
                        cost += this.distance(request, nextElement);
                        this.moveServer(serverPositions, nextElement, request);
                        break;
                    }
                    else if (currentElement === allPositions[allPositions.length - 1]) {
                        let prevElement = allPositions[j - 1];
                        cost += this.distance(request, prevElement);
                        this.moveServer(serverPositions, prevElement, request);
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
                        } else {
                            cost += 2 * distanceRequestNextElement;
                            this.moveServer(serverPositions, nextElement, request);
                            this.moveServer(serverPositions, prevElement, prevElement + distanceRequestNextElement);
                        }
                        break;
                    }
                }
            }
        }
        console.log(cost);
        return cost;
    }

    solveWithLazyDC(input, startConfig) {
        let start = [...startConfig];
        let serverPositions = start.map(s => Number(s));
        serverPositions.sort();
        let cost = 0;

        for (let i = 0; i < input.length; i++) {
            let request = Number(input[i]);
            let allPositions = this.compareRequestToServers(serverPositions, request);
            if (serverPositions.length === allPositions.length) {
                continue;
            }
            for (let j = 0; j < allPositions.length; j++) {
                let currentElement = allPositions[j];
                if (currentElement === request) {
                    if (currentElement === 0) {
                        let nextElement = allPositions[j + 1];
                        cost += this.distance(request, nextElement);
                        this.moveServer(serverPositions, nextElement, request);
                        break;
                    }
                    else if (currentElement === allPositions[allPositions.length - 1]) {
                        let prevElement = allPositions[j - 1];
                        cost += this.distance(request, prevElement);
                        this.moveServer(serverPositions, prevElement, request);
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
                        } else {
                            cost += distanceRequestNextElement;
                            this.moveServer(serverPositions, nextElement, request);
                        }
                        break;
                    }
                }
            }
        }
        console.log(cost);
        return cost;
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
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.input, this.props.startConfig)}>
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