import { Component } from 'react';

class PagingFIFO extends Component {

    solve(input, cache_size) {

        let cache = [];
        let cost = 0;
        const inputString = input;
        const numbers = inputString.split(" ");
        const input_array = Array.from(numbers); 
        
        for (let i = 0; i < input_array.length; i++) {
            let currentElement = input_array[i];
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
            console.log("CACHE: " + cache);
        }

        return cost;
    }

    render() {
        const inputString = this.props.input;
        const numbers = inputString.split(" ");
        const input_array = Array.from(numbers); 
        const listItems = input_array.map((number) =>
            <li>{number}</li>
        );

        return (
            <div>
                Input: {this.props.input} Cache size: {this.props.cache_size} Cost: {this.solve(this.props.input, this.props.cache_size)}
                <div>{listItems}</div>
            </div>
        )
    }
}

export default PagingFIFO;