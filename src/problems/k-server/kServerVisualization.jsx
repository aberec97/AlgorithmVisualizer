import React, { Component } from 'react';
import './kServer.css';

class KServerVisualization extends Component {
    state = {}
    render() {
        let locations = [];

        for (let i = this.props.range[0]; i <= this.props.range[1]; i++) {
            this.props.servers.includes(i) ?
                locations.push(<div key={i} className='location'><div className='server'></div><p className='loc-label'>{i}</p></div>) :
                locations.push(<div key={i} className='location'><p className='loc-label'>{i}</p></div>);
        }

        return (
            <React.Fragment>
                <div className="wrap">
                    <div className="links">
                        {locations}
                    </div>
                </div>
                The cost of running {this.props.selectedAlgorithm} on this input is {this.props.cost}
                <br />
                Current step: {this.props.currentStep} / {this.props.input.length}
            </React.Fragment>
        );
    }
}

export default KServerVisualization;