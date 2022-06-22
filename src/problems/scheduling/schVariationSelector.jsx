import React, { Component } from 'react';
import StandardScheduling from './standardScheduling';

class SchVariationSelector extends Component {
    state = {}
    render() {
        let variation = <div></div>;
        switch (this.props.selectedVariation) {
            case "Standard": variation = <StandardScheduling></StandardScheduling>; break;
            case "Independent machines": variation = <StandardScheduling></StandardScheduling>; break;
            case "Dependent machines": variation = <StandardScheduling></StandardScheduling>; break;
            case "Time model": variation = <StandardScheduling></StandardScheduling>; break;
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