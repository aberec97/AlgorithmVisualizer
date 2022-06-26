import React, { Component } from 'react';
import Description from '../../common/description';
import BinPackingAlgorithm from './binPackingAlgorithm';
import BinPackingInput from './binPackingInput';
import ButtonHolder from '../../common/buttonHolder';

class BinPackingContainer extends Component {
    state = {
        inputArray: '',
        selectedAlgorithm: ''
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
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
            { id: 1, name: "Next Fit" },
            { id: 2, name: "First Fit" }
        ];

        return (
            <React.Fragment>
                <h3>Bin Packing</h3>
                <Description>
                    <p className="description">
                        In this problem need to store all input elements in bins. Every bin has a capacity of 1, each input element has a size
                        between 0 and 1.
                    </p>
                </Description>
                <BinPackingInput
                    onSetInputArray={this.handleSetInputArray}>
                </BinPackingInput>
                <div className='algorithm-chooser'>
                    <h5>Choose an algorithm:</h5>
                    <ButtonHolder buttons={algorithms} onSelect={this.handleAlgSelect}></ButtonHolder>
                </div>
                <BinPackingAlgorithm
                    input={this.state.inputArray}
                    selectedAlgorithm={this.state.selectedAlgorithm}>
                </BinPackingAlgorithm>
            </React.Fragment>
        );
    }
}

export default BinPackingContainer;