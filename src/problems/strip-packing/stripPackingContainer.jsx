import React, { Component } from 'react';
import Description from '../../common/description';
import StripPackingInput from './stripPackingInput';
import StripPackingVisualization from './stripPackingVisualization';

class StripPackingContainer extends Component {
    state = {
        inputArray: '',
        rValue: '',
        currentStep: 0,
        cost: 0,
        history: new Map(),
        visualize: false,
        inputForVisualization: '',
        rValueForVisualization: ''
    }

    setCurrentStep = (value) => {
        this.setState({ currentStep: value });
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    }

    handleSetRValue = (rValue) => {
        this.setState({ rValue });
    }

    solveWithNextFitShelf(input, rValue) {
        let shelves = [];
        let cost = 0;
        let history = new Map();
        let explanation = "";
        history.set(0, {});

        for (let i = 0; i < input.length; i++) {
            let power = Number(0);
            let higherNumber = Number(0);
            let item = input[i];
            let itemWidth = Number(item[0]);
            let itemHeight = Number(item[1]);
            while (Math.pow(rValue, power) >= itemHeight) {
                power += 1;
            }
            let powerToRaiseOn = power === 0 ? 0 : power - 1;
            higherNumber = Math.pow(rValue, powerToRaiseOn);
            if (shelves.length === 0) {
                shelves.push({
                    fullness: itemWidth,
                    height: higherNumber,
                    items: [
                        item
                    ],
                    open: true
                });
                cost += higherNumber;
                explanation = "The previous item was (" + item +
                    "), we didn't have a shelf yet so we opened a new one with " + higherNumber + " height.";
                history.set(i + 1, {
                    item: item, shelfIndex: shelves.length - 1, shelfHeight: higherNumber,
                    newShelf: true, explanation: explanation
                });
            }
            else {
                for (let j = 0; j < shelves.length; j++) {
                    let shelf = shelves[j];
                    let lastShelfIndex = shelves.length - 1;
                    if (!shelf.open && j < lastShelfIndex) {
                        continue;
                    }
                    else if (shelf.open && shelf.height > higherNumber && j < lastShelfIndex) {
                        continue;
                    }
                    else if (shelf.open && shelf.height < higherNumber && j < lastShelfIndex) {
                        continue;
                    }
                    else if (shelf.open && shelf.height === higherNumber && Number(shelf.fullness + itemWidth) <= 1) {
                        shelf.items.push(item);
                        shelf.fullness += itemWidth;
                        explanation = "The previous item was (" + item +
                            "), we put it on the " + j + ". shelf.";
                        history.set(i + 1, { item: item, shelfIndex: j, shelfHeight: higherNumber, newShelf: false, explanation: explanation });
                        break;
                    }
                    else {
                        if (shelf.open && shelf.height === higherNumber) shelf.open = false;
                        shelves.push({
                            fullness: itemWidth,
                            height: higherNumber,
                            items: [
                                item
                            ],
                            open: true
                        });
                        cost += higherNumber;
                        explanation = "The previous item was (" + item +
                            "), we needed to open a new shelf with a height of " + higherNumber + ".";
                        history.set(i + 1, { item: item, shelfIndex: shelves.length - 1, shelfHeight: higherNumber, newShelf: true, explanation: explanation });
                        break;
                    }
                }
            }
        }
        this.setState({ history, cost, inputForVisualization: input, rValueForVisualization: rValue, currentStep: 0, visualize: true });
    }

    render() {

        return (
            <React.Fragment>
                <h3>Strip packing</h3>
                <Description>
                    <p className="description">
                        In this problem we have a shelf with a width of 1 and unlimited height. Our task is to place boxes
                        on this shelf while trying to use as little space as possible. Each box has it's own width and height,
                        the overall cost is the total height taken up by these boxes.
                        <br />
                        The Next Fit Shelf (r) algorithm opens shelves with different heights. The heights are determined by the different
                        powers of this  r value which is between 0 and 1. It uses the smallest power that is higher than the next box's height.
                        A shelf gets closed if it becomes full or the next box in line cannot fit in it. The cost of the algorithm is the total height
                        the shelves take up.
                    </p>
                </Description>
                <StripPackingInput
                    onSetInputArray={this.handleSetInputArray}
                    onSetRValue={this.handleSetRValue}
                ></StripPackingInput>
                <br />
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithNextFitShelf(this.state.inputArray, this.state.rValue)}>
                    Run Next Fit Shelf
                </button>
                <br />
                <br />
                <StripPackingVisualization
                    inputArray={this.state.inputForVisualization}
                    rValue={this.state.rValueForVisualization}
                    currentStep={this.state.currentStep}
                    history={this.state.history}
                    cost={this.state.cost}
                    visualize={this.state.visualize}
                    setCurrentStep={this.setCurrentStep}
                >
                </StripPackingVisualization>
            </React.Fragment>
        );
    }
}

export default StripPackingContainer;