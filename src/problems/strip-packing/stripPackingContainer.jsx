import React, { Component } from 'react';
import Description from '../../common/description';
import StripPackingInput from './stripPackingInput';
import Button from 'react-bootstrap/Button';
import StripPackingVisualization from './stripPackingVisualization';

class StripPackingContainer extends Component {
    state = {
        inputArray: '',
        rValue: '',
        currentStep: 0,
        cost: 0,
        history: new Map(),
        visualize: false
    }

    handleSetInputArray = (inputArray) => {
        this.setState({ inputArray });
    }

    handleSetRValue = (rValue) => {
        this.setState({ rValue });
    }

    changeVisualize() {
        this.setState({ visualize: !this.state.visualize });
    }

    nextStep = () => {
        if (this.state.inputArray.length === 0 || !this.state.history || this.state.cost === 0) return;
        const currentStep = this.state.currentStep;
        const nextStep = currentStep + 1;
        if (Number(currentStep) < Number(this.state.inputArray.length)) {
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

    solveWithNextFitShelf(input, rValue) {
        let shelves = [];
        shelves.push({
            fullness: 0,
            height: 1,
            items: [],
            open: true
        });

        let cost = 1;
        let history = new Map();
        history.set(0, shelves.slice());

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
                    history.set(i + 1, shelves.slice());
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
                    history.set(i + 1, shelves.slice());
                    break;
                }
            }
        }
        this.setState({ history, cost });
        this.changeVisualize();
    }

    render() {
        let currentHistory;

        if (this.state.cost > 0) {
            currentHistory = this.state.history.get(this.state.currentStep);
        }

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
                    inputArray={this.state.inputArray}
                    rValue={this.state.rValue}
                    currentStep={this.state.currentStep}
                    currentHistory={currentHistory}
                    cost={this.state.cost}
                    visualize={this.state.visualize}
                >
                </StripPackingVisualization>
                <Button variant="light" onClick={this.previousStep}>&lt;</Button>
                <Button variant="light" onClick={this.nextStep}>&gt;</Button>
            </React.Fragment>
        );
    }
}

export default StripPackingContainer;