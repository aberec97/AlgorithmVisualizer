import React, { Component } from 'react';

class SchTimeModelAlgorithm extends Component {
    state = {}

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
        let result = [];

        let machines = [];
        for (let j = 0; j < numOfMachines; j++) {
            machines.push({ load: 0, items: [] });
        }

        let startTime = sortedInput[0]['time'];
        let jobsForScheduling = [];
        for (let i = 0; i < sortedInput.length; i++) {
            if (sortedInput[i]['time'] <= startTime) {
                jobsForScheduling.push(sortedInput[i]);
            } else {
                const machinesForSchedule = JSON.parse(JSON.stringify(machines));
                let currentResult = this.scheduleJobs(jobsForScheduling, machinesForSchedule);
                result.push(currentResult);
                jobsForScheduling = [];
                //a következő ütemezésbe azokat az elemeket vesszük be, melyek az előző ütemezés végén vagy azelőtt érkeztek meg.
                (currentResult['maxLoad'] + startTime) > sortedInput[i]['time'] ? startTime += currentResult['maxLoad'] : startTime = sortedInput[i]['time'];
                jobsForScheduling.push(sortedInput[i]);
            }
        }
        if (jobsForScheduling.length > 0) {
            const machinesForSchedule = JSON.parse(JSON.stringify(machines));
            let currentResult = this.scheduleJobs(jobsForScheduling, machinesForSchedule);
            result.push(currentResult);
        }
        console.log("result:", result);
        return result;
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

    //Ezt lehetne optimalizalni ha marad ido
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

    //TODO: ezt alaposabban tesztelni!
    //Azt a jobot ütemezi először, amelyik a legnehezebb. Amint felszabadul egy gép, megnézi az addig érkezett jobokat és a leghosszabbat rárakja.
    solveWithOnlineLPT(input, numOfMachines) {
        let sortedInput = this.sortJobsByTimeAndSize(input);
        let machines = [];
        for (let j = 0; j < numOfMachines; j++) {
            machines.push({ load: 0, items: [] });
        }

        let availableJobs = [];
        let startTime = sortedInput[0]['time'];
        for (let i = 0; i < sortedInput.length; i++) {
            let item = sortedInput[i];
            if (item['time'] <= startTime) {
                availableJobs.push(item);
            } else {
                let currScheduleResult = this.scheduleAvailableJobs(availableJobs, machines);
                availableJobs = JSON.parse(JSON.stringify(currScheduleResult['remainingJobs']));
                availableJobs.push(item);
                startTime = currScheduleResult['newStartTime'];
            }
        }
        if (availableJobs.length > 0) {
            this.scheduleAvailableJobs(availableJobs, machines);
        }

        console.log("result:", machines);
        return machines;
    }

    render() {
        return (
            <button
                className='btn btn-success'
                onClick={() => this.solveWithOnlineLPT([{ job: 1, time: 0 }, { job: 1, time: 0 }, { job: 2, time: 0 }, { job: 3, time: 0 },
                { job: 2, time: 1 }, { job: 2, time: 2 }, { job: 3, time: 2 }, { job: 1, time: 3 }, { job: 2, time: 4 }, { job: 1, time: 5 }], 3)}>
                Run
            </button>);
    }
}

export default SchTimeModelAlgorithm;