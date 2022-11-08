import React, { Component } from 'react';
import './listAccess.css';

class ListAccessVisualization extends Component {
    state = {}
    render() {
        let elements = [];
        for (let i = 0; i < this.props.currentHistory['linkedList'].length; i++) {
            i === this.props.currentHistory['linkedList'].length - 1 ?
                elements.push(<span className='list-item' key={i}>{this.props.currentHistory['linkedList'][i]}</span>) :
                elements.push(<span key={i}><span className='list-item'>{this.props.currentHistory['linkedList'][i]}</span><i style={{ margin: '0.4em' }} className="fa-solid fa-arrow-right"></i></span>);
        }

        return (
            <React.Fragment>
                {elements}
                <br />
                <div style={{ marginTop: '1em' }}>
                    Current Step: {this.props.currentStep} / {this.props.input.length}
                </div>
                <p className='explanation'>{this.props.currentHistory['explanation']}</p>
            </React.Fragment >
        );
    }
}

export default ListAccessVisualization;