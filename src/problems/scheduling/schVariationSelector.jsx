import React, { Component } from 'react';
import DependentScheduling from './dependent/dependentScheduling';
import IndependentScheduling from './independent/independentScheduling';
import SchTimeModel from './time-model/schTimeModel';
import StandardScheduling from './standard/standardScheduling';

class SchVariationSelector extends Component {
    state = {}
    render() {
        let variation = <div></div>;
        switch (this.props.selectedVariation) {
            case "Standard": variation = <StandardScheduling></StandardScheduling>; break;
            case "Unrelated machines": variation = <IndependentScheduling></IndependentScheduling>; break;
            case "Related machines": variation = <DependentScheduling></DependentScheduling>; break;
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