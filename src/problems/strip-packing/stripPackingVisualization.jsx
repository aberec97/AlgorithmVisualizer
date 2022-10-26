import React, { Component } from 'react';
import './strip-packing.css'

class StripPackingVisualization extends Component {
    state = {}
    render() {
        if (!this.props.visualize) return <React.Fragment><br /></React.Fragment>;

        let history = this.props.history;
        let shelvesForRender = [];

        if (!history) return <React.Fragment>Something went wrong! <br /></React.Fragment>;

        if (!this.props.inputArray) return <React.Fragment>Provide an input! <br /></React.Fragment>;

        const heightMultiplier = 15;
        const widthMultiplier = 20;

        let itemsToShelves = [];

        for (let i = 1; i <= this.props.currentStep; i++) {
            let currentHistory = history.get(i);

            let index = currentHistory['shelfIndex'];
            let itemWidth = currentHistory['item'][0];
            let itemHeight = currentHistory['item'][1];
            let shelfHeightValue = currentHistory['shelfHeight'];
            let shelfHeight = shelfHeightValue * heightMultiplier + "em";
            let width = itemWidth * widthMultiplier + "em";
            let height = itemHeight * heightMultiplier + "em";

            if (itemsToShelves[index] === undefined) {
                itemsToShelves[index] = [<div key={i} style={{ width: width, height: height }} className="item">{itemWidth}, {itemHeight}</div>];
            } else {
                itemsToShelves[index].push(<div key={i} style={{ width: width, height: height }} className="item">{itemWidth}, {itemHeight}</div>);
            }

            shelvesForRender[index] = <div key={i}><label>{shelfHeightValue}</label><div key={i} style={{ height: shelfHeight }} className="shelf">{itemsToShelves[index]}</div></div>;
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