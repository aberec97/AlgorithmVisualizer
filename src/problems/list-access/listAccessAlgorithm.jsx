import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ListAccessVisualization from './listAccesVisualization';

class ListAccessAlgorithm extends Component {
    state = {
        currentStep: 0,
        cost: 0,
        history: new Map(),
        selectedAlgorithm: '',
        input: '',
        length: '',
        visualize: false
    }

    nextStep = () => {
        if (!this.props.queries || this.props.queries.length === 0 || !this.state.history || this.state.cost === 0) return;
        const currentStep = this.state.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(this.props.queries.length)) {
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

    solveWithSelectedAlgorithm(selectedAlg, queries, length) {
        if (!selectedAlg) return null;
        let result = { cost: 0, history: null };
        switch (selectedAlg) {
            case "MTF": result = this.solveWithMTF(length, queries); break;
            case "BIT": result = this.solveWithBIT(length, queries); break;
            default: result = null;
        }
        this.setState({
            cost: result['cost'], history: result['history'],
            selectedAlgorithm: selectedAlg, input: queries, length: length, currentStep: 0, visualize: true
        });
        return result;
    }

    createLinkedList(length) {
        let linkedList = [];
        for (let i = 0; i < length; i++) {
            linkedList.push(Number(i + 1));
        }
        return linkedList;
    }

    moveToFront(array, index, element) {
        array.splice(index, 1);
        array.splice(0, 0, element);
    }

    solveWithMTF(length, queries) {
        let linkedList = this.createLinkedList(length);
        let cost = Number(0);
        let history = new Map();
        let explanation = "";
        history.set(0, { linkedList: linkedList.slice(), explanation: explanation });

        for (let i = 0; i < queries.length; i++) {
            let queriedElement = Number(queries[i]);
            let queriedElementIndex = linkedList.indexOf(queriedElement);
            let currentCost = Number(queriedElementIndex) + 1;
            cost += currentCost;
            this.moveToFront(linkedList, queriedElementIndex, queriedElement);
            explanation = "The previous query asked for " + queriedElement + ", it was in the " +
                (queriedElementIndex + 1) + ". position. The cost of this query is " + currentCost + ".";
            history.set(Number(i + 1), { linkedList: linkedList.slice(), explanation: explanation });
        }

        return { cost, history };
    }

    solveWithBIT(length, queries) {
        let linkedList = this.createLinkedList(length);
        let bits = [];
        for (let i = 0; i < length; i++) {
            bits.push(Number(this.getRndInteger(0, 1)));
        }
        let cost = Number(0);
        let history = new Map();
        let explanation = "";
        history.set(0, { linkedList: linkedList.slice(), explanation: explanation });

        for (let i = 0; i < queries.length; i++) {
            let queriedElement = Number(queries[i]);
            let queriedElementIndex = linkedList.indexOf(queriedElement);
            let bitOfQueriedElement = bits[Number(queriedElement) - 1];
            let bitExplanation = "";
            if (bitOfQueriedElement > 0) {
                this.moveToFront(linkedList, queriedElementIndex, queriedElement);
                bitOfQueriedElement = 0;
                bitExplanation = "It's bit was 1 so we moved it to the front of the list and set the bit to 0."
            } else {
                bitOfQueriedElement = 1;
                bitExplanation = "It's bit was 0 so we did not move it to the front of the list and set the bit to 1."
            }
            let currentCost = Number(queriedElementIndex) + 1;
            cost += currentCost;
            explanation = "The previous query asked for " + queriedElement + ", it was in the " +
                (queriedElementIndex + 1) + ". position. " + bitExplanation + " The cost of this query is " + currentCost + ".";
            history.set(Number(i + 1), { linkedList: linkedList.slice(), explanation: explanation });
        }

        return { cost, history };
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment></React.Fragment>;
        let inputString = this.state.input.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let currentHistory = <React.Fragment></React.Fragment>;

        if (!this.state.history) {
            return (<p>Provide an input!</p>);
        }

        if (this.state.cost > 0) {
            currentHistory = this.state.history.get(this.state.currentStep);
        }

        let cost = this.state.currentStep === this.state.input.length ?
            <p>The cost of running {this.state.selectedAlgorithm} on this input is {this.state.cost}</p> : <p><br /></p>;

        let visualization = this.state.visualize ?
            <React.Fragment>
                <br />
                <p>You selected {this.state.selectedAlgorithm} with the following queries: &#123; {inputStringForRender} &#125; and linked list length of {this.state.length}.</p>
                <ListAccessVisualization
                    currentHistory={currentHistory}
                    input={this.props.queries}
                    currentStep={this.state.currentStep}>
                </ListAccessVisualization>
                {cost}
                <div>
                    <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                    <Button variant="light" onClick={this.nextStep}>&gt;</Button>
                </div>
            </React.Fragment> : <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.queries, this.props.length)}>
                    Run
                </button>
                <br />
                {visualization}
            </React.Fragment>
        )
    }
}

export default ListAccessAlgorithm;