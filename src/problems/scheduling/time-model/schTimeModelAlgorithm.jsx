import React, { Component } from 'react';
import SchTimeModelVisualization from './schTimeModelVisualization';
import Arrows from '../../../common/arrows';

class SchTimeModelAlgorithm extends Component {
    state = {
        currentStep: 0,
        makeSpan: 0,
        history: new Map(),
        visualize: false,
        input: '',
        numOfMachines: '',
        counter: 0
    }

    setCurrentStep = (value) => {
        this.setState({ currentStep: value });
    }

    solveWithSelectedAlgorithm(selectedAlg, input, numOfMachines) {
        if (!selectedAlg) return null;
        let normalInput = [];
        for (let i = 0; i < input.length; i++) {
            normalInput.push({ job: Number(input[i][0]), time: Number(input[i][1]) });
        }
        let result = { makeSpan: 0, history: null };
        switch (selectedAlg) {
            case "INTV": result = this.solveWithINTV(normalInput, numOfMachines); break;
            case "Online LPT": result = this.solveWithOnlineLPT(normalInput, numOfMachines); break;
            default: result = null;
        }
        this.setState({
            makeSpan: result['makeSpan'], history: result['history'], counter: result['counter'],
            selectedAlgorithm: selectedAlg, input: input,
            numOfMachines: numOfMachines, currentStep: 0, visualize: true
        });
        return result;
    }

    sortJobsByTime(items) {
        return items.sort((a, b) => {
            return a['time'] > b['time'] ? 1 : a['time'] < b['time'] ? -1 : 0;
        });
    }

    scheduleJobs(items, machines) {
        items.sort((a, b) => b['job'] - a['job']);
        let maxLoadSum = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < items.length; i++) {
            let minMachineLoad = Number.MAX_SAFE_INTEGER;
            let minLoadIndex = 0;
            for (let j = 0; j < machines.length; j++) {
                let currMachineLoad = machines[j]['load'];
                if (currMachineLoad < minMachineLoad) {
                    minMachineLoad = currMachineLoad;
                    minLoadIndex = j;
                }
            }
            let loadSum = Number(machines[minLoadIndex]['load'] + items[i]['job']);
            if (loadSum > maxLoadSum) {
                maxLoadSum = loadSum;
            }
            machines[minLoadIndex]['load'] = loadSum;
            machines[minLoadIndex]['items'].push(items[i]);
        }
        return { machines: machines, maxLoad: maxLoadSum };
    }

    //Adott időpillanatig beérkezett jobokra ad egy optimális ütemezést, majd addig vár, amíg az összes gép felszabadul. Ebben a pillanatban az
    //eddig megérkezett jobokat ütemezi, ismét egy optimális ütemezést felhasználva.
    solveWithINTV(input, numOfMachines) {
        let sortedInput = this.sortJobsByTime(input);
        let makeSpan = 0;

        let machines = [];
        for (let j = 0; j < numOfMachines; j++) {
            machines.push({ load: 0, items: [] });
        }

        let history = new Map();
        let explanation = "";

        let startTime = sortedInput[0]['time'];
        let jobsForScheduling = [];
        let counter = 0;

        for (let i = 0; i < sortedInput.length; i++) {
            if (sortedInput[i]['time'] <= startTime) {
                jobsForScheduling.push(sortedInput[i]);
            } else {
                const machinesForSchedule = JSON.parse(JSON.stringify(machines));
                let currentResult = this.scheduleJobs(jobsForScheduling, machinesForSchedule);
                explanation = "We scheduled the jobs that came in the " + startTime + ". minute.";
                let maxLoad = currentResult['maxLoad'];
                let startTime1 = startTime;
                //a következő ütemezésbe azokat az elemeket vesszük be, melyek az előző ütemezés végén vagy azelőtt érkeztek meg.
                (maxLoad + startTime) > sortedInput[i]['time'] ? startTime += maxLoad : startTime = sortedInput[i]['time'];
                let startTime2 = startTime;
                if (startTime > maxLoad) maxLoad = startTime2 - startTime1;
                makeSpan += maxLoad;
                history.set(counter++, { machines: currentResult['machines'].slice(), maxLoad: maxLoad, explanation: explanation });
                jobsForScheduling = [];
                jobsForScheduling.push(sortedInput[i]);
            }
        }
        if (jobsForScheduling.length > 0) {
            const machinesForSchedule = JSON.parse(JSON.stringify(machines));
            let currentResult = this.scheduleJobs(jobsForScheduling, machinesForSchedule);
            makeSpan += currentResult['maxLoad'];
            explanation = "We scheduled the remaining jobs.";
            history.set(counter++, { machines: currentResult['machines'].slice(), maxLoad: currentResult['maxLoad'], explanation: explanation });
        }
        return { makeSpan, history, counter };
    }

    getMinLoad(machines) {
        let minLoad = Number.MAX_SAFE_INTEGER;
        let minLoadIndex = 0;
        for (let i = 0; i < machines.length; i++) {
            if (machines[i]['load'] < minLoad) {
                minLoad = machines[i]['load'];
                minLoadIndex = i;
            }
        }
        return { minLoad: minLoad, minLoadIndex: minLoadIndex };
    }

    sortJobsByTimeAndSize(items) {
        return items.sort((a, b) => {
            return a['time'] > b['time'] ? 1 : a['time'] < b['time'] ? -1 : a['job'] < b['job'] ? 1 : a['job'] > b['job'] ? -1 : 0;
        });
    }

    scheduleAvailableJobs(items, machines) {
        items.sort((a, b) => b['job'] - a['job']);
        let originalStartTime = this.getMinLoad(machines)['minLoad'];
        let remainingJobs = [];

        for (let i = 0; i < items.length; i++) {
            let minLoad = this.getMinLoad(machines);
            let item = items[i];
            if (originalStartTime < minLoad['minLoad']) {
                remainingJobs.push(items[i]);
            } else {
                let chosenMachine = machines[minLoad['minLoadIndex']];
                chosenMachine['items'].push(item);
                chosenMachine['load'] += item['job'];
            }
        }
        let newStartTime = this.getMinLoad(machines)['minLoad'];
        return { remainingJobs, newStartTime };
    }

    //Azt a jobot ütemezi először, amelyik a legnehezebb. Amint felszabadul egy gép, megnézi az addig érkezett jobokat és a leghosszabbat rárakja.
    solveWithOnlineLPT(input, numOfMachines) {
        let sortedInput = this.sortJobsByTimeAndSize(input);
        let machines = [];
        for (let j = 0; j < numOfMachines; j++) {
            machines.push({ load: 0, items: [] });
        }
        let makeSpan = 0;
        let history = new Map();
        let explanation = "";
        let counter = 0;

        let availableJobs = [];
        let remainingJobs = [];
        let startTime = sortedInput[0]['time'];
        for (let i = 0; i < sortedInput.length; i++) {
            let item = sortedInput[i];
            if (item['time'] <= startTime) {
                availableJobs.push(item);
            } else {
                let schResult = this.scheduleAvailableJobs(availableJobs, machines);
                remainingJobs = schResult['remainingJobs'];
                explanation = "We scheduled the jobs that came in the " + startTime + ". minute.";
                history.set(counter++, { machines: JSON.parse(JSON.stringify(machines)), prevJobs: availableJobs, explanation: explanation });
                while (startTime < item['time']) {
                    if (remainingJobs.length > 0) {
                        let schResult = this.scheduleAvailableJobs(remainingJobs, machines);
                        remainingJobs = schResult['remainingJobs'];
                        startTime = schResult['newStartTime'];
                        history.set(counter++, { machines: JSON.parse(JSON.stringify(machines)), prevJobs: availableJobs, explanation: explanation });
                    } else {
                        break;
                    }
                }
                if (startTime < item['time']) startTime = item['time'];
                for (let j = 0; j < machines.length; j++) {
                    if (machines[j]['load'] < startTime) {
                        machines[j]['items'].push({ space: 2 * (startTime - machines[j]['load']) + "em" });
                        machines[j]['load'] = startTime;
                    }
                }
                availableJobs = [];
                availableJobs.push(item);
                if (remainingJobs.length > 0) availableJobs.concat(remainingJobs);
            }
        }
        if (availableJobs.length > 0) {
            this.scheduleAvailableJobs(availableJobs, machines);
            explanation = "We scheduled the remaining jobs.";
            let currMachines = JSON.parse(JSON.stringify(machines));
            history.set(counter++, { machines: currMachines, prevJobs: availableJobs, explanation: explanation });
        }
        let machineLoads = machines.map(e => e.load);
        makeSpan = Math.max(...machineLoads);
        return { makeSpan, history, counter };
    }

    render() {
        let history;

        if (this.state.makeSpan > 0) {
            history = this.state.history;
        }

        let visualization = this.state.visualize ?
            <React.Fragment>
                <SchTimeModelVisualization
                    inputArray={this.state.input}
                    numOfMachines={this.state.numOfMachines}
                    currentStep={this.state.currentStep}
                    history={history}
                    makeSpan={this.state.makeSpan}
                    selectedAlgorithm={this.state.selectedAlgorithm}
                    counter={this.state.counter}
                ></SchTimeModelVisualization>
                <Arrows
                    input={this.state.counter}
                    history={this.state.history}
                    cost={this.state.makeSpan}
                    currentStep={this.state.currentStep}
                    setCurrentStep={this.setCurrentStep}
                ></Arrows>
            </React.Fragment> : <React.Fragment></React.Fragment>;

        return (
            <React.Fragment>
                <button
                    className='btn btn-success'
                    onClick={() => this.solveWithSelectedAlgorithm(this.props.selectedAlgorithm, this.props.inputArray, this.props.numOfMachines)}>
                    Run
                </button>
                {visualization}
            </React.Fragment>
        );
    }
}

export default SchTimeModelAlgorithm;