import './paging.css'
import { Component } from 'react';
import Button from 'react-bootstrap/Button';

class PagingInputController extends Component {
  state = {
    input: '',
    cache: '',
    from: '',
    to: '',
    number: ''
  };

  changeInput = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  changeCache = (event) => {
    this.setState({
      cache: event.target.value
    });
  }

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
    this.setState({ input: input })
  }

  readInput = () => {
    const inputStr = this.state.input.toString();
    const withoutCommas = inputStr.replace(/,/g, " ");
    const inputArray = Array.from(withoutCommas.split(" "));
    const onlyNumbers = inputArray.filter(Number);
    this.props.onSetInputArray(onlyNumbers);
    this.props.onSetCacheSize(this.state.cache);
  };

  render() {
    return (
      <div>
        <h6>
          Provide an input with whole numbers, for separation use commas (",") or spaces (" ")!
        </h6>
        <div className="input-manual">
          <label>
            Queries:
          </label>
          <input type="text" value={this.state.input} onChange={this.changeInput} />
          <label>
            {this.props.label}
          </label>
          <input type="number" value={this.state.cache} onChange={this.changeCache} className='cache' />
          <button className='btn btn-success' onClick={this.readInput}>Save</button>
        </div>
        <h6>
          You can also generate a random input.
        </h6>
        <div className='input-random'>
          <label>
            Range: [
          </label>
          <input type="number" value={this.state.from} onChange={this.changeFrom} className='cache' />
          <label>;</label>
          <input type="number" value={this.state.to} onChange={this.changeTo} className='cache' />
          <label>]</label>
          <label>Size:</label>
          <input type="number" value={this.state.number} onChange={this.changeNumber} className='cache' />
          <Button variant="secondary" className='random-gen'
            onClick={this.generateRandomInput}>Generate random input</Button>
        </div>
      </div>
    );
  }
}

export default PagingInputController;