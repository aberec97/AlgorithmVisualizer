import React, { Component } from 'react';
import PagingContainer from "../problems/paging/pagingContainer";

class ProblemSelector extends Component {
    render() {
        let selectedProblem = this.props.selectedProblem;
        let renderedProblem = <p>Select a problem to continue...</p>;

        switch (selectedProblem) {
            case "Paging": renderedProblem = <PagingContainer></PagingContainer>; break;
            case "Scheduling": renderedProblem = <PagingContainer></PagingContainer>; break;
            default:
        }

        return (
            <React.Fragment>
                {renderedProblem}
            </React.Fragment>);
    }
}

export default ProblemSelector;