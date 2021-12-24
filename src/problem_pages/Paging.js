import './Paging.css'
import { Component } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Collapse = ({ collapsed, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(!collapsed);
  
    return (
      <>
        <Button variant="secondary"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 'Show' : 'Hide'} description
        </Button>
        <div
          className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
          aria-expanded={isCollapsed}
        >
          {children}
        </div>
      </>
    );
};

class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      cache: '',
      from: '',
      to: '',
      number: ''
    }

    this.changeInput = this.changeInput.bind(this);
    this.changeCache = this.changeCache.bind(this);
    this.changeFrom = this.changeFrom.bind(this);
    this.changeTo = this.changeTo.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.generateRandomInput = this.generateRandomInput.bind(this);
  }

  changeInput(event) {
    this.setState({
      input: event.target.value
    });
  }
  
  changeCache(event) {
    this.setState({
      cache: event.target.value
    });
  }

  changeFrom(event) {
    this.setState({
      from: event.target.value
    });
  }

  changeTo(event) {
    this.setState({
      to: event.target.value
    });
  }

  changeNumber(event) {
    this.setState({
      number: event.target.value
    });
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  generateRandomInput() {
    let input = [];
    for (let i = 0; i < this.state.number; i++) {
      let rnd = this.getRndInteger(parseInt(this.state.from,10) , parseInt(this.state.to,10));
      input.push(rnd);
    }
    this.setState({input: input})
  }

  render() {
      return (
          <div>
              <h3>Paging</h3>
              <Collapse>
                  <p className="description">
                  In this problem we start off with an empty cache that has limited size. The input consists of a list of
                  elements, in our case numbers. Each element has to be put in the cache, if it fills up, we need to remove
                  an element to make room for the next one. Inserting into the cache costs resources. Our goal is to minimize the
                  number of insertions by efficiently freeing up space. 
                  </p>
              </Collapse>
              <h6>
                Provide an input with whole numbers, for separation use commas (",") or spaces (" ")! Cache size should be small.
              </h6>
              <div className="input-manual">
                <label>
                  Input:
                </label>
                <input type="text" value={this.state.input} onChange={this.changeInput} />
                <label>
                  Cache size:
                </label>  
                <input type="number" value={this.state.cache} onChange={this.changeCache} className='cache' />
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
                onClick={this.generateRandomInput} >Generate random input</Button>
              </div>
              <div className='algorithm-chooser'>
              <h5>Choose algorithm:</h5>
              <Button>FIFO</Button>
              <Button>LRU</Button>
              <Button variant="danger">LFD</Button>
              </div>
              <Button variant="light">START</Button>
          </div>
      );
  }
}

export default Paging;