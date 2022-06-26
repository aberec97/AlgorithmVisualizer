import React, { Component } from 'react';
import './scheduling.css'
import Description from '../../common/description';
import ButtonHolder from '../../common/buttonHolder';
import SchVariationSelector from './schVariationSelector';

class SchedulingContainer extends Component {
    state = {
        selectedVariation: '',
        renderSolution: false
    }

    handleVarSelect = (selected) => {
        this.setState({ selectedVariation: selected });
        if (this.state.inputArray !== '' && this.state.cacheSize !== '') {
            this.changeRenderSolution();
        }
    };

    changeRenderSolution() {
        this.setState({ renderSolution: !this.state.renderSolution });
    }

    render() {

        const variations = [
            { id: 1, name: "Standard" },
            { id: 2, name: "Related machines" },
            { id: 3, name: "Unrelated machines" },
            { id: 4, name: "Time model" }
        ];

        return (
            <div>
                <h3>Scheduling</h3>
                <Description >
                    <p className="description">
                        This problem's input consists of two things, the number of machines and the jobs. All the jobs have to be completed.
                        We need to determine which machine should work on the next job in line. Each machine will have it's own load,
                        the time it takes for it to finish working on all the jobs assigned to it. The maximum load is called
                        makespan, our goal is to minimize it.
                    </p>
                </Description>
                <div className='algorithm-chooser'>
                    <h5>Choose a variation:</h5>
                    <ButtonHolder buttons={variations} onSelect={this.handleVarSelect}></ButtonHolder>
                </div>
                <SchVariationSelector selectedVariation={this.state.selectedVariation} />
            </div>);
    }
}

export default SchedulingContainer;