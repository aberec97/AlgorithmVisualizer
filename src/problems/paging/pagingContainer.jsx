import React, { Component } from 'react';
import Description from '../../common/description';
import ButtonHolder from '../../common/buttonHolder';
import './paging.css'
import PagingAlgorithm from './algorithms/pagingAlgorithm';
import SimpleInputController from '../../common/simpleInputController';

class PagingContainer extends Component {
    state = {
        inputArray: '',
        cacheSize: '',
        selectedAlgorithm: '',
        renderSolution: false,
        algorithms: [
            { id: 1, name: "FIFO" },
            { id: 2, name: "LRU" },
            { id: 3, name: "LFD" }
        ]
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    };

    handleSetCacheSize = (cacheSize) => {
        this.setState({ cacheSize });
    };

    handleSetSelectedAlgorithm = (selectedAlgorithm) => {
        this.setState({ selectedAlgorithm });
    };

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
        return (
            <div>
                <h3>Paging</h3>
                <Description >
                    <p className="description">
                        In this problem we start off with an empty cache that has limited size. The input consists of a list of
                        elements, in our case numbers. Each element has to be put in the cache, if it fills up, we need to remove
                        an element to make room for the next one. Inserting into the cache costs resources. Our goal is to minimize the
                        number of insertions by efficiently freeing up space.
                        <br />
                        The FIFO (First In First Out) algorithm always removes the first element when the cache is full.
                        <br />
                        LRU (Least Recently Used) looks for the cache element that was not queried for the longest time.
                        <br />
                        LFD (Latest Forward Distance) is an Offline algorithm that looks into the input and checks which cache element
                        will be needed latest.
                    </p>
                </Description>
                <SimpleInputController
                    onSetInputArray={this.handleSetInputArray}
                    onSetCacheSize={this.handleSetCacheSize}
                    inputLabel={"Input:"}
                    cacheLabel={"Cache size:"}
                    inputDescription={"Provide an input with whole numbers, for separation use commas (\",\") or spaces (\" \")!"}
                    randomGenDescription={"You can also generate a random input."}
                    acceptedCharacters={[',', ' ']}>
                </SimpleInputController>
                <div className='algorithm-chooser'>
                    <h5>Choose an algorithm:</h5>
                    <ButtonHolder buttons={this.state.algorithms} onSelect={this.handleAlgSelect}></ButtonHolder>
                </div>
                <PagingAlgorithm
                    selectedAlgorithm={this.state.selectedAlgorithm}
                    inputArray={this.state.inputArray}
                    cacheSize={this.state.cacheSize}>
                </PagingAlgorithm>
            </div>
        );
    }
}

export default PagingContainer;