import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ListAccessVisualization from './listAccesVisualization';

class ListAccessAlgorithm extends Component {
    state = {
        currentStep: 0,
        cost: 0,
        history: new Map()
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
        this.setState({ cost: result['cost'], history: result['history'] });
        return result;
    }

    createLinkedList(length) {
        let linkedList = [];
        for (let i = 0; i < length; i++) {
            linkedList.push(Number(i + 1));
        }
        return linkedList;
    }

    moveToFront(array, index, elment) {
        array.splice(index, 1);
        array.splice(0, 0, elment);
    }

    solveWithMTF(length, queries) {
        let linkedList = this.createLinkedList(length);
        let cost = Number(0);
        let history = new Map();
        history.set(0, linkedList.slice());

        for (let i = 0; i < queries.length; i++) {
            let queriedElement = Number(queries[i]);
            let queriedElementIndex = linkedList.indexOf(queriedElement);
            cost += Number(queriedElementIndex) + 1;
            this.moveToFront(linkedList, queriedElementIndex, queriedElement);
            history.set(Number(i + 1), linkedList.slice());
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
        history.set(0, linkedList.slice());

        for (let i = 0; i < queries.length; i++) {
            let queriedElement = Number(queries[i]);
            let queriedElementIndex = linkedList.indexOf(queriedElement);
            let bitOfQueriedElement = bits[Number(queriedElement) - 1];
            if (bitOfQueriedElement > 0) {
                this.moveToFront(linkedList, queriedElementIndex, queriedElement);
                bitOfQueriedElement = 0;
            } else {
                bitOfQueriedElement = 1;
            }
            cost += Number(queriedElementIndex) + 1;
            history.set(Number(i + 1), linkedList.slice());
        }

        return { cost, history };
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    render() {
        if (!this.props.selectedAlgorithm) return <React.Fragment></React.Fragment>;
        let inputString = this.props.queries.toString();
        let inputStringForRender = inputString.replace(/,/g, ", ");

        let linkedList = <React.Fragment></React.Fragment>;

        if (!this.state.history) {
            return (<p>Provide an input!</p>);
        }

        if (this.state.cost > 0) {
            linkedList = this.state.history.get(this.state.currentStep);
            console.log("linked list: ", linkedList);
        }

        return (
            <div>
                <p>You selected {this.props.selectedAlgorithm} with &#123; {inputStringForRender} &#125; input and linked list length of {this.props.length}.
                    Press the Run button to see the result!</p>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.queries, this.props.length)}>
                    Run
                </button>
                <br />
                <ListAccessVisualization
                    linkedList={linkedList}>
                </ListAccessVisualization>
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
        )
    }
}

export default ListAccessAlgorithm;