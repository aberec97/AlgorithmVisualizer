import React, { Component } from 'react';
import Description from '../../common/description';
import KServerInput from './kServerInput';
import ButtonHolder from '../../common/buttonHolder';
import KServerAlgorithm from './kServerAlgorithm';

class KServerContainer extends Component {
    state = {
        inputArray: '',
        startConfig: '',
        selectedAlgorithm: '',
        renderSolution: false
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    }

    handleSetStartConfig = (startConfig) => {
        this.setState({ startConfig });
    }

    handleAlgSelect = (selected) => {
        this.setState({ selectedAlgorithm: selected });
        if (this.state.inputArray !== '' && this.state.cacheSize !== '') {
            this.changeRenderSolution();
        }
    };

    changeRenderSolution() {
        this.setState({ renderSolution: !this.state.renderSolution });
    }

    render() {
        const algorithms = [
            { id: 1, name: "DC" },
            { id: 2, name: "Lazy DC" }
        ];

        return (
            <React.Fragment>
                <h3>K-server</h3>
                <Description>
                    <p className="description">
                        In this problem we have a number of servers, a starting configuration and a metric field, in our case a straight line.
                        The servers are put on this line according to the starting configuration. The input consists of requests, which can be
                        represented as points on the line. If we have a server on the point of a request, we can handle it right away for 0 cost,
                        but if there is no server, we have to move one to the requested location. The cost of moving a server is the distance between
                        it's current location and the request's location. This distance can be measured as d(x, y) = |x - y|. Our goal is to handle
                        all requests with the least possible server movements.
                        <br />
                        The DC (Double Coverage) algorithm moves 2 servers in the direction of the request if the request is between 2 servers. Otherwise it
                        moves only one.
                        <br />
                        The Lazy DC runs DC on the next request and checks which server would end up in the end at the request's location and moves only that
                        server. This usually reduces the cost because we move only 1 server instead of 2.
                    </p>
                </Description>
                <KServerInput
                    onSetInputArray={this.handleSetInputArray}
                    onSetStartConfig={this.handleSetStartConfig}>
                </KServerInput>
                <div className='algorithm-chooser'>
                    <h5>Choose an algorithm:</h5>
                    <ButtonHolder buttons={algorithms} onSelect={this.handleAlgSelect}></ButtonHolder>
                </div>
                <KServerAlgorithm
                    input={this.state.inputArray}
                    startConfig={this.state.startConfig}
                    selectedAlgorithm={this.state.selectedAlgorithm}></KServerAlgorithm>
            </React.Fragment>
        );
    }
}

export default KServerContainer;