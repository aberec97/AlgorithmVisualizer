import React, { Component } from 'react';
import './strip-packing.css'

class StripPackingVisualization extends Component {
    state = {}
    render() {
        if (!this.props.visualize) return <React.Fragment>Run the algorithm! <br /></React.Fragment>;

        let shelves = this.props.currentHistory;
        let shelvesForRender = [];

        if (!shelves) return <React.Fragment>Something went wrong! <br /></React.Fragment>;

        for (let i = 0; i < shelves.length; i++) {
            let shelf = shelves[i];
            let shelfHeight = shelf['height'] * 10 + "em";

            let items = [];
            for (let j = 0; j < shelf['items'].length; j++) {
                let item = shelf['items'][j];
                let widthValue = item[0];
                let heightValue = item[1];
                let width = widthValue * 10 + "em";
                let height = heightValue * 10 + "em";
                items.push(<div style={{ width: width, height: height }} className="item">{widthValue}, {heightValue}</div>)
            }

            shelvesForRender.push(<div style={{ height: shelfHeight }} className="shelf">{items}</div>)
        }

        return (
            <React.Fragment>
                Your input was {this.props.inputArray} with an R value of {this.props.rValue}.
                <div className="bay-container">
                    <div className='loading-bay'>
                        {shelvesForRender}
                    </div>
                </div>
                current step = {this.props.currentStep}
                <br />
                The cost of running Next Fit Shelf on this input is {this.props.cost}.
            </React.Fragment>
        );
    }
}

export default StripPackingVisualization;