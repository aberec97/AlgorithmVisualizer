import React, { Component } from 'react';
import Arrows from '../../common/arrows';
import KServerVisualization from './kServerVisualization';

class KServerAlgorithm extends Component {
    state = {
        currentStep: 0,
        cost: -1,
        history: new Map(),
        range: [],
        inputForVisualization: '',
        startConfigForVisualization: '',
        selectedAlgorithm: '',
        visualize: false
    }

    setCurrentStep = (value) => {
        this.setState({ currentStep: value });
    }

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
        this.setState({
            cost: result['cost'], history: result['history'], range, visualize: true,
            currentStep: 0, selectedAlgorithm: selectedAlg, inputForVisualization: input, startConfigForVisualization: startConfig
        });
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
        let explanation = "";
        history.set(Number(0), { serverPositions: serverPositions.slice(), explanation });

        for (let i = 0; i < input.length; i++) {
            let request = Number(input[i]);
            let allPositions = this.compareRequestToServers(serverPositions, request);
            if (serverPositions.length === allPositions.length) {
                explanation = "The previous request asked for location " + request +
                    ". We already had a server there so we didn't have to do anything.";
                history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
                continue;
            }
            for (let j = 0; j < allPositions.length; j++) {
                let currentElement = allPositions[j];
                if (currentElement === request) {
                    if (currentElement === allPositions[0]) {
                        let nextServer = allPositions[j + 1];
                        let distance = this.distance(request, nextServer);
                        cost += distance;
                        this.moveServer(serverPositions, nextServer, request);
                        explanation = "The previous request asked for location " + request +
                            ". We moved a server there from " + nextServer + ", the distance was " + distance + ". (+" + distance + ")";
                        history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
                        break;
                    }
                    else if (currentElement === allPositions[allPositions.length - 1]) {
                        let prevServer = allPositions[j - 1];
                        let distance = this.distance(request, prevServer);
                        cost += distance;
                        this.moveServer(serverPositions, prevServer, request);
                        explanation = "The previous request asked for location " + request +
                            ". We moved a server there from " + prevServer + ", the distance was " + distance + ". (+" + distance + ")";
                        history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
                        break;
                    }
                    else {
                        let prevServer = allPositions[j - 1];
                        let nextServer = allPositions[j + 1];
                        let distanceRequestPrevServer = this.distance(request, prevServer);
                        let distanceRequestNextServer = this.distance(request, nextServer);
                        if (distanceRequestPrevServer <= distanceRequestNextServer) {
                            cost += 2 * distanceRequestPrevServer;
                            this.moveServer(serverPositions, prevServer, request);
                            this.moveServer(serverPositions, nextServer, nextServer - distanceRequestPrevServer);
                            explanation = "The previous request asked for location " + request +
                                ", it was between two servers so we moved the server at " + prevServer + " and the server at " + nextServer +
                                " towards the requested location. This means we covered the distance of " + distanceRequestPrevServer + " twice. (+" + 2 * distanceRequestPrevServer + ")";
                            history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
                        } else {
                            cost += 2 * distanceRequestNextServer;
                            this.moveServer(serverPositions, nextServer, request);
                            this.moveServer(serverPositions, prevServer, prevServer + distanceRequestNextServer);
                            explanation = "The previous request asked for location " + request +
                                ", it was between two servers so we moved the server at " + prevServer + " and the server at " + nextServer +
                                " towards the requested location. This means we covered the distance of " + distanceRequestNextServer + " twice. (+" + 2 * distanceRequestNextServer + ")";
                            history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
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
        let explanation = "";
        history.set(Number(0), { serverPositions: serverPositions.slice(), explanation });

        for (let i = 0; i < input.length; i++) {
            let request = Number(input[i]);
            let allPositions = this.compareRequestToServers(serverPositions, request);
            if (serverPositions.length === allPositions.length) {
                explanation = "The previous request asked for location " + request +
                    ". We already had a server there so we didn't have to do anything.";
                history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
                continue;
            }
            for (let j = 0; j < allPositions.length; j++) {
                let currentElement = allPositions[j];
                if (currentElement === request) {
                    if (currentElement === allPositions[0]) {
                        let nextElement = allPositions[j + 1];
                        let distance = this.distance(request, nextElement);
                        cost += distance;
                        this.moveServer(serverPositions, nextElement, request);
                        explanation = "The previous request asked for location " + request +
                            ". We moved a server there from " + nextElement + ", the distance was " + distance + ". (+" + distance + ")";
                        history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
                        break;
                    }
                    else if (currentElement === allPositions[allPositions.length - 1]) {
                        let prevElement = allPositions[j - 1];
                        let distance = this.distance(request, prevElement);
                        cost += distance;
                        this.moveServer(serverPositions, prevElement, request);
                        explanation = "The previous request asked for location " + request +
                            ". We moved a server there from " + prevElement + ", the distance was " + distance + ". (+" + distance + ")";
                        history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
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
                            explanation = "The previous request asked for location " + request +
                                ", it was between two servers, but the server at " + prevElement +
                                " was closer so we moved it towards the requested location. (+" + distanceRequestPrevElement + ")";
                            history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
                        } else {
                            cost += distanceRequestNextElement;
                            this.moveServer(serverPositions, nextElement, request);
                            explanation = "The previous request asked for location " + request +
                                ", it was between two servers, but the server at " + nextElement +
                                " was closer so we moved it towards the requested location. (+" + distanceRequestNextElement + ")";
                            history.set(Number(i + 1), { serverPositions: serverPositions.slice(), explanation });
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

        let startConfigString = this.state.startConfigForVisualization.toString();
        let startConfigStringForRender = startConfigString.replace(/,/g, ", ");

        let inputString = this.state.inputForVisualization.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let currentHistory = [];
        if (this.state.cost >= 0) currentHistory = this.state.history.get(this.state.currentStep);

        let visualization = this.state.visualize ?
            <React.Fragment>
                <p style={{ marginTop: "1em" }}>
                    You selected {this.state.selectedAlgorithm} with ( {startConfigStringForRender} ) starting configuration
                    and the following requests: &#123; {inputStringForRender} &#125;
                </p>
                <KServerVisualization
                    cost={this.state.cost}
                    currentHistory={currentHistory}
                    selectedAlgorithm={this.state.selectedAlgorithm}
                    range={this.state.range}
                    currentStep={this.state.currentStep}
                    input={this.state.inputForVisualization}>
                </KServerVisualization>
                <br />
                <div>
                    <Arrows
                        input={this.props.input.length}
                        history={this.state.history}
                        cost={this.state.cost}
                        currentStep={this.state.currentStep}
                        setCurrentStep={this.setCurrentStep}
                    ></Arrows>
                    <br />
                </div>
            </React.Fragment> : <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.input, this.props.startConfig)}>
                    Run
                </button>
                {visualization}
            </React.Fragment>
        );
    }
}

export default KServerAlgorithm;