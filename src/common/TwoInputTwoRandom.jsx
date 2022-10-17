import { Component } from 'react';
import SimpleInput from './simpleInput';
import RangeSizeRandomGenerator from './rangeSizeRandomGenerator';

class TwoInputTwoRandom extends Component {
    state = {}
    render() {
        return (
            <div>
                <h6>
                    {this.props.inputDescription}
                </h6>
                <div className='input-manual'>
                    <SimpleInput
                        label={this.props.inputLabel}
                        input={this.state.input}
                        changeInput={this.changeInput}
                        changeInputValidity={this.changeInputValidity}
                        validity={this.state.isInputValid}>
                    </SimpleInput>
                    <SimpleInput
                        label={this.props.inputLabel}
                        input={this.state.input}
                        changeInput={this.changeInput}
                        changeInputValidity={this.changeInputValidity}
                        validity={this.state.isInputValid}>
                    </SimpleInput>
                    <button className='btn btn-success' onClick={this.readInput}>Save</button>
                </div>
                <RangeSizeRandomGenerator
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}
                    randomGenDescription={this.props.randomGenDescription}>
                </RangeSizeRandomGenerator>
                <RangeSizeRandomGenerator
                    changeInput={this.changeInput}
                    changeInputValidity={this.changeInputValidity}
                    randomGenDescription={this.props.randomGenDescription}>
                </RangeSizeRandomGenerator>
            </div>
        );
    }
}

export default TwoInputTwoRandom;