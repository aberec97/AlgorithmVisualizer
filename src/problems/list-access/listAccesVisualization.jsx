import React, { Component } from 'react';

class ListAccessVisualization extends Component {
    state = {}
    render() {

        let elements = [];
        for (let i = 0; i < this.props.linkedList.length; i++) {
            i === this.props.linkedList.length - 1 ?
                elements.push(<span key={i}>{this.props.linkedList[i]}</span>) :
                elements.push(<span key={i}>{this.props.linkedList[i]} -&gt;</span>);
        }

        return (
            <React.Fragment>
                {elements}
                <br />
                Current Step = {this.props.currentStep} / {this.props.input.length}
            </React.Fragment>
        );
    }
}

export default ListAccessVisualization;