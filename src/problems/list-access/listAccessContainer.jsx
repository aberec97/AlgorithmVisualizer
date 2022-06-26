import React, { Component } from 'react';
import ListAccessInput from './listAccessInput';
import ButtonHolder from '../../common/buttonHolder';
import Description from '../../common/description';
import ListAccessAlgorithm from './listAccessAlgorithm';

class ListAccessContainer extends Component {
    state = {
        inputArray: '',
        length: '',
        selectedAlgorithm: '',
        renderSolution: false
    }

    handleSetInput = (inputArray) => {
        this.setState({ inputArray })
    }

    handleSetLength = (length) => {
        this.setState({ length });
    }

    handleAlgSelect = (selected) => {
        this.setState({ selectedAlgorithm: selected });
        if (this.state.inputArray !== '' && this.state.length !== '') {
            this.changeRenderSolution();
        }
    };

    changeRenderSolution() {
        this.setState({ renderSolution: !this.state.renderSolution });
    }

    render() {
        const algorithms = [
            { id: 1, name: "MTF" },
            { id: 2, name: "BIT" }
        ];

        return (
            <React.Fragment>
                <h3>List Access</h3>
                <Description>
                    <p className="description">
                        In this problem we have a linked list and would like to access certain elemets of it. Accessing an element means
                        iterating through all of the list items until we find the one we are looking for. Hopping from one item to the next
                        costs 1 resource. After finding the desired element we can take it to the beggining of the list - this is a free action,
                        we can also swap neighbors for the cost of 1.
                        <br />
                        The MTF algorithm always moves the queried element to the beggining to the list.
                        <br />
                        The BIT algorithm assigns a bit to each linked list element and if the queried element's bit is 1 it will move it to
                        the front and flip its bit to 0. If the bit was 0 it will only flip the bit to 1.
                    </p>
                </Description>
                <ListAccessInput
                    label={"Length:"}
                    onSetInputArray={this.handleSetInput}
                    onSetCacheSize={this.handleSetLength}>
                </ListAccessInput>
                <div className='algorithm-chooser'>
                    <h5>Choose an algorithm:</h5>
                    <ButtonHolder buttons={algorithms} onSelect={this.handleAlgSelect}></ButtonHolder>
                </div>
                <ListAccessAlgorithm
                    selectedAlgorithm={this.state.selectedAlgorithm}
                    queries={this.state.inputArray}
                    length={this.state.length}>
                </ListAccessAlgorithm>
            </React.Fragment>
        );
    }
}

export default ListAccessContainer;