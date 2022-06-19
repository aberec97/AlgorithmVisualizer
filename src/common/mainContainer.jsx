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
            { id: 3, name: "Bin Packing" },
        ];

        const sortingAlgs = [
            { id: 1, name: "Bubble sort" },
            { id: 2, name: "Insertion sort" },
        ];

        return (<React.Fragment>
            <h1>AlgorithmVisualizer</h1>
            <p>
                Welcome! Start by selecting a problem, then choose an algorithm to solve
                it!
            </p>
            <div className="problem-select">
                <TitleAndButtons
                    title="Online Algorithm Problems"
                    buttons={onlineAlgs}
                    onSelect={this.handleProblemSelect}
                ></TitleAndButtons>
                <TitleAndButtons
                    title="Sorting Algorithms"
                    buttons={sortingAlgs}
                ></TitleAndButtons>
            </div>

            <div className="problems">
                <ProblemSelector selectedProblem={this.state.selectedProblem}></ProblemSelector>
            </div>
        </React.Fragment>);
    }
}

export default MainContainer;