import React, { Component } from 'react';
import BinPackingContainer from '../problems/bin-packing/binPackingContainer';
import KServerContainer from '../problems/k-server/kServerContainer';
import ListAccessContainer from '../problems/list-access/listAccessContainer';
import PagingContainer from "../problems/paging/pagingContainer";
import SchedulingContainer from '../problems/scheduling/schedulingContainer';
import StripPackingContainer from '../problems/strip-packing/stripPackingContainer';

class ProblemSelector extends Component {
    render() {
        let selectedProblem = this.props.selectedProblem;
        let renderedProblem = <p>Select a problem to continue...</p>;

        switch (selectedProblem) {
            case "Paging": renderedProblem = <PagingContainer></PagingContainer>; break;
            case "Scheduling": renderedProblem = <SchedulingContainer></SchedulingContainer>; break;
            case "List Access": renderedProblem = <ListAccessContainer></ListAccessContainer>; break;
            case "Bin Packing": renderedProblem = <BinPackingContainer></BinPackingContainer>; break;
            case "Strip Packing": renderedProblem = <StripPackingContainer></StripPackingContainer>; break;
            case "K-server Problem": renderedProblem = <KServerContainer></KServerContainer>; break;
            default:
        }

        return (
            <React.Fragment>
                {renderedProblem}
            </React.Fragment>);
    }
}

export default ProblemSelector;