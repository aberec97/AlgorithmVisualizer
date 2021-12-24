import './App.css';
import Button from 'react-bootstrap/Button';

import Paging from './problem_pages/Paging'

function App() {
  return (
      <div className="main-container">
        <h1>AlgorithmVisualizer</h1>
        <p>Welcome! Start by selecting a problem, then choose an alogrithm to solve it!</p>
        <div className="problem-select">
          <h5>Online Algorithm Problems</h5>
          <Button>Paging</Button>
          <Button disabled>Scheduling</Button>
          <Button disabled>Bin Packing</Button>

          <h5>Sorting</h5>
          <Button disabled>Bubble sort</Button>
          <Button disabled>Insertion sort</Button>
        </div>
        
        <div className="problems">
          <Paging />
        </div>
        
      </div>
  );
}

export default App;
