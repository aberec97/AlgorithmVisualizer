import React, { Component } from 'react';
import './listAccess.css';
import { visualizeInput } from '../../common/utilities';

class ListAccessVisualization extends Component {
    state = {}
    render() {
        let input = visualizeInput(this.props.input, this.props.currentStep);
        let elements = [];
        let linkedList = this.props.currentHistory['linkedList'];
        for (let i = 0; i < linkedList.length; i++) {
            i === linkedList.length - 1 ?
                elements.push(<span className='list-item' key={i}>{linkedList[i]}</span>) :
                elements.push(<span key={i}><span className='list-item'>{linkedList[i]}</span><i style={{ margin: '0.4em' }} className="fa-solid fa-arrow-right"></i></span>);
        }

        return (
            <React.Fragment>
                <div className='input-holder'>
                    {input}
                </div>
                <br />
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