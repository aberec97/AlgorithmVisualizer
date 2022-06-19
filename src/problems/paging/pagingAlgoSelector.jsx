import React, { Component } from 'react';
import ButtonHolder from '../../common/buttonHolder';

class PagingAlgoSelector extends Component {
    state = {}
    render() {
        const algorithms = [
            { id: 1, name: "FIFO" },
            { id: 2, name: "LRU" },
            { id: 3, name: "LFD" }
        ];

        return (
            <React.Fragment>
                <div className='algorithm-chooser'>
                    <h5>Choose algorithm:</h5>
                    <ButtonHolder buttons={algorithms} onSelect={this.handleAlgSelect}></ButtonHolder>
                </div>
            </React.Fragment>
        );
    }
}

export default PagingAlgoSelector;