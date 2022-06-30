import React, { Component } from 'react';
import './bin-packing.css'

class BinPackingVisualization extends Component {
    state = {}
    render() {
        let bins = [];
        for (let i = 0; i < this.props.bins.length; i++) {
            let fullness = this.props.bins[i]['fullness'] + "em";
            bins.push(
                this.props.bins[i]['fullness'] === 10 ?
                    <div className="bin"><div key={i} style={{ height: fullness }} className="bin-item">{this.props.bins[i]['fullness'] / 10}</div></div> :
                    <div className="bin"><div key={i} style={{ height: fullness }} className="bin-item">0.{this.props.bins[i]['fullness']}</div></div>);
        }

        return (
            <React.Fragment>
                <div className='bin-container'>
                    {bins}
                </div>
                Current step = {this.props.currentStep} / {this.props.input.length}
            </React.Fragment>
        );
    }
}

export default BinPackingVisualization;