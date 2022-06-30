import React, { Component } from 'react';
import './strip-packing.css'

class StripPackingVisualization extends Component {
    state = {}
    render() {
        if (!this.props.visualize) return <React.Fragment><br /></React.Fragment>;

        let shelves = this.props.currentHistory;
        let shelvesForRender = [];

        if (!shelves) return <React.Fragment>Something went wrong! <br /></React.Fragment>;

        if (!this.props.inputArray) return <React.Fragment>Provide an input! <br /></React.Fragment>;

        const heightMultiplier = 15;
        const widthMultiplier = 20;

        for (let i = 0; i < shelves.length; i++) {
            let shelf = shelves[i];
            let shelfHeight = shelf['height'] * heightMultiplier + "em";

            let items = [];
            for (let j = 0; j < shelf['items'].length; j++) {
                let item = shelf['items'][j];
                let widthValue = item[0];
                let heightValue = item[1];
                let width = widthValue * widthMultiplier + "em";
                let height = heightValue * heightMultiplier + "em";
                items.push(<div key={j} style={{ width: width, height: height }} className="item">{widthValue}, {heightValue}</div>)
            }

            shelvesForRender.push(<div key={i} style={{ height: shelfHeight }} className="shelf">{items}</div>)
        }

        let inputString = this.props.inputArray.map(e => e + ";").toString();
        let inputStringForRender = inputString.replace(/,/g, " ");

        let totalHeight = this.props.cost * heightMultiplier + "em";

        return (
            <React.Fragment>
                Your input was {inputStringForRender} with an R value of {this.props.rValue}.
                <br />
                <div style={{ height: totalHeight }} className="bay-container">
                    <div style={{ height: totalHeight }} className='loading-bay'>
                        {shelvesForRender}
                    </div>
                </div>
                The cost of running Next Fit Shelf on this input is {this.props.cost}.
                <br />
                current step = {this.props.currentStep} / {this.props.inputArray.length}
                <br />
            </React.Fragment>
        );
    }
}

export default StripPackingVisualization;