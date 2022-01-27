import './PagingFIFO.css'
import { Component } from 'react';
import Button from 'react-bootstrap/Button';

class PagingFIFO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0
        }

        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }

    nextStep() {
        if (Number(this.state.currentStep) < Number(this.props.input.length)-1) {
            this.setState({
                currentStep: this.state.currentStep + 1
            });
        }
    }

    previousStep() {
        if (Number(this.state.currentStep) > 0) {
            this.setState({
                currentStep: this.state.currentStep - 1
            });
        }
    }

    solve(input, cache_size) {
        let cache = [];
        let cost = 0;
        let history = new Map();
        history.set(0, cache.slice());

        for (let i = 0; i < input.length; i++) {
            let currentElement =  input[i];
            if (cache.length < cache_size) {
                if (!cache.includes(currentElement)) {
                    cache.push(currentElement);
                    cost++;
                }
            }
            else {
                if (!cache.includes(currentElement)) {
                    cache.shift()
                    cache.push(currentElement);
                    cost++;
                }
            }
            history.set(Number(i+1), cache.slice());
        }
        console.log(cost);
        return {cost, history};
    }

    render() {
        let {cost, history} = this.solve(this.props.input, this.props.cache_size);
        let cacheFromHistory = history.get(this.state.currentStep);

        const elements = cacheFromHistory.map((e) =>
            <div key={e} className='cache-items'>{e}</div>
        );

        return (
            <div>
                <div>
                    Cache:
                </div>
                {elements}
                <div>
                <div>
                    <Button variant="light" onClick={this.nextStep}>Next step</Button>
                    <Button variant="light" onClick={this.previousStep}>Previous step</Button>
                </div>                
                    The cost of running FIFO on this input: {cost}
                </div>
            </div>
        )
    }
}

export default PagingFIFO;