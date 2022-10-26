import React, { Component } from 'react';
import TitleAndButtons from './titleAndButtons';
import './common-styles/mainContainer.css'
import ProblemSelector from './problemSelector';

class MainContainer extends Component {
    state = { selectedProblem: null };

    handleProblemSelect = (selected) => {
        this.setState({ selectedProblem: selected });
    }

    render() {
        const onlineAlgs = [
            { id: 1, name: "Paging" },
            { id: 2, name: "Scheduling" },
            { id: 3, name: "List Access" },
            { id: 4, name: "Bin Packing" },
            { id: 5, name: "Strip Packing" },
            { id: 6, name: "K-server Problem" },
        ];

        return (<React.Fragment>
            <h1>Online Algorithm Visualizer</h1>
            <p>
                Welcome! Start by selecting a problem, then choose an algorithm to solve
                it!
            </p>
            <div className="problem-select">
                <TitleAndButtons
                    title="Common Problems:"
                    buttons={onlineAlgs}
                    onSelect={this.handleProblemSelect}
                ></TitleAndButtons>
            </div>

            <div className="problems">
                <ProblemSelector selectedProblem={this.state.selectedProblem}></ProblemSelector>
            </div>
        </React.Fragment>);
    }
}

export default MainContainer;