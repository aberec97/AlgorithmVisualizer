import React, { Component } from 'react';
import './listAccess.css';

class ListAccessVisualization extends Component {
    state = {}
    render() {

        let elements = [];
        for (let i = 0; i < this.props.linkedList.length; i++) {
            i === this.props.linkedList.length - 1 ?
                elements.push(<span className='list-item' key={i}>{this.props.linkedList[i]}</span>) :
                elements.push(<span><span className='list-item' key={i}>{this.props.linkedList[i]}</span><i style={{ margin: '0.4em' }} className="fa-solid fa-arrow-right"></i></span>);
        }

        return (
            <React.Fragment>
                {elements}
                <br />
                <div style={{ marginTop: '1em' }}>
                    Current Step: {this.props.currentStep} / {this.props.input.length}
                </div>
            </React.Fragment >
        );
    }
}

export default ListAccessVisualization;