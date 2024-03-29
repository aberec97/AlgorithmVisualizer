import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class RangeSizeRandomGenerator extends Component {
    state = {
        from: '',
        to: '',
        number: ''
    };

    changeFrom = (event) => {
        this.setState({
            from: event.target.value
        });
    }

    changeTo = (event) => {
        this.setState({
            to: event.target.value
        });
    }

    changeNumber = (event) => {
        this.setState({
            number: event.target.value
        });
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomInput = () => {
        let input = [];
        for (let i = 0; i < this.state.number; i++) {
            let rnd = this.getRndInteger(parseInt(this.state.from, 10), parseInt(this.state.to, 10));
            input.push(rnd);
        }
        if (this.state.number > 0) {
            this.props.changeInput(input);
            this.props.changeInputValidity(true);
        }
    }

    render() {
        return (
            <div>
                <h6>
                    {this.props.randomGenDescription}
                </h6>
                <div>
                    <label>{this.props.label1} [</label>
                    <input type="number" value={this.state.from} onChange={this.changeFrom} className='cache' />
                    <label>;</label>
                    <input type="number" value={this.state.to} onChange={this.changeTo} className='cache' />
                    <label>]</label>
                    <label>{this.props.label2}</label>
                    <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
                    <Button variant="secondary" className='random-gen'
                        onClick={this.generateRandomInput}>Generate</Button>
                </div>
            </div>
        );
    }
}

export default RangeSizeRandomGenerator;