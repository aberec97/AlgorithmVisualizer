import React, { Component } from 'react';
import './pagingAlg.css'

class PagingVisualization extends Component {
    state = {
        currentElement: 0,
        elementToBeRemoved: 0,
        helperArrayElement: 0
    }
    render() {
        const input = this.props.inputArray;
        let elements = [];
        if (input.length > 0) {
            for (let i = 0; i < input.length; i++) {
                if (i < this.props.currentStep) {
                    continue;
                } else if (i === this.props.currentStep) {
                    elements.push(<div className='highlighted m-2' key={i}>{input[i]}</div>);
                } else {
                    elements.push(<div className='m-2' key={i}>{input[i]}</div>);
                }
            }
        }
        let cache = [];
        if (this.props.cacheSize > 0) {
            for (let i = 0; i < this.props.cacheSize; i++) {
                cache.push(
                    i === this.props.removedElementIndex ?
                        <span className='centered toBeRemoved' key={i}>{this.props.cacheElements[i]}</span> :
                        <span className='centered' key={i}>{this.props.cacheElements[i]}</span>)
            }
        }
        let inputStringForRender = this.props.inputArray.toString().replace(/,/g, ", ");

        return (
            <React.Fragment>
                <br />
                <p>You selected {this.props.selectedAlgorithm} with &#123; {inputStringForRender} &#125; input and cache size of {this.props.cacheSize}.</p>
                <div className='input-holder'>
                    {elements}
                </div>
                <br />
                <div className='cache-items'>
                    {cache}
                </div>
            </React.Fragment>
        );
    }
}

export default PagingVisualization;