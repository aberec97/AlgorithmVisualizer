import React, { Component } from 'react';
import './kServer.css';

class KServerVisualization extends Component {
    state = {}
    render() {
        let locations = [];

        for (let i = this.props.range[0]; i <= this.props.range[1]; i++) {
            this.props.currentHistory['serverPositions'].includes(i) ?
                locations.push(<div key={i} className='location'><div className='server'></div><p className='loc-label'>{i}</p></div>) :
                locations.push(<div key={i} className='location'><p className='loc-label'>{i}</p></div>);
        }

        let cost = this.props.currentStep === this.props.input.length ?
            <p>The cost of running {this.props.selectedAlgorithm} on this input is {this.props.cost}</p> : <p><br /></p>

        return (
            <React.Fragment>
                <div className="wrap">
                    <div className="links">
                        {locations}
                    </div>
                </div>
                <p className='explanation'>{this.props.currentHistory['explanation']}</p>
                {cost}
                <p>Current step: {this.props.currentStep} / {this.props.input.length}</p>
            </React.Fragment>
        );
    }
}

export default KServerVisualization;