

function getJson(filename, target) {
    d3.json(filename, (json) => {
        target.data = json;
        target.data.links.forEach((l) => {
            l.source = +l.source;
            l.target = +l.target;
            l.value = +l.value;
        });
        target.ready = true;
        console.log('Loaded', filename);});
}

// TODO Test data: remove
const data1 = {data: null, ready: false, targetCity: 'JFK'};
const data2 = {data: null, ready: false, targetCity: "SFO"};
getJson("data/sankey/data_JFK.json", data1);
getJson("data/sankey/data_SFO.json", data2);

class DataSource {
    constructor(timeComponent) {
        this.timeComponent = timeComponent;
        timeComponent.timeEventEmitter.addListener('timeChange', () => this.handleTimeChange());
        this.startDate = this.timeComponent.startDate;
        this.endDate = this.timeComponent.endDate;

        this.sankeyData = {};
        this.targetCity = null;
        // TODO Create these events
        this.dataEventEmitter = new EventEmitter();
        this.dataEventEmitter.defineEvents(['sankeyDataAvailable', 'causesDataAvailable']);

        this.aggregationBy = null;
    }

    airportChange(newAirport) {
        this.airport = newAirport;

        this.getSankey(newAirport);
    }

    handleAggregationChange() {
        // TODO: make the timeslider emit an event when the aggregation changes
    }

    handleTimeChange() {
        this.startDate = this.timeComponent.selectedStartDate;
        this.endDate = this.timeComponent.selectedEndDate;

        this.retrieveData(this.startDate, this.endDate, this.aggregationBy);
    }

    getSankey(airport) {
        const jsonFile = "data/sankey/data_" + airport + ".json";
        d3.json(jsonFile, (json) => {
            this.sankeyData = json;
            this.sankeyData.links.forEach((l) => {
                l.source = +l.source;
                l.target = +l.target;
                l.value = +l.value;
            });

            this.dataEventEmitter.emit('sankeyDataAvailable');
        });
    }

    retrieveData(from, to, aggregation) {
        if (from.getFullYear() < 2008) {
            this.sankeyData = data1.data;
            this.targetCity = data1.targetCity;
        } else {
            this.sankeyData = data2.data;
            this.targetCity = data2.targetCity;
        }

        this.dataEventEmitter.emit('sankeyDataAvailable');
    }
}
