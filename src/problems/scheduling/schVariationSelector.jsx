import React, { Component } from 'react';
import DependentScheduling from './dependentScheduling';
import IndependentScheduling from './independentScheduling';
import SchTimeModel from './schTimeModel';
import StandardScheduling from './standardScheduling';

class SchVariationSelector extends Component {
    state = {}
    render() {
        let variation = <div></div>;
        switch (this.props.selectedVariation) {
            case "Standard": variation = <StandardScheduling></StandardScheduling>; break;
            case "Independent machines": variation = <IndependentScheduling></IndependentScheduling>; break;
            case "Dependent machines": variation = <DependentScheduling></DependentScheduling>; break;
            case "Time model": variation = <SchTimeModel></SchTimeModel>; break;
            default:
        }

        return (
            <React.Fragment>
                {variation}
            </React.Fragment>
        );
    }
}

export default SchVariationSelector;