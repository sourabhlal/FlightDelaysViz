
class DataSource {
    constructor(timeComponent) {
        this.timeComponent = timeComponent;
        timeComponent.timeEventEmitter.addListener('timeChange', () => this.handleTimeChange());
        this.startDate = this.timeComponent.startDate;
        this.endDate = this.timeComponent.endDate;

        this.sankeyData = {};
        this.sankeyDataFull = {};
        this.targetCity = null;
        // TODO Create these events
        this.dataEventEmitter = new EventEmitter();
        this.dataEventEmitter.defineEvents(['sankeyDataAvailable', 'causesDataAvailable', 'airportChanged']);

        this.aggregationBy = null;
        this.retrieveData(this.startDate, this.endDate, undefined);
    }

    __setAirport(dataSrc, newAirport) {
        dataSrc.airport = newAirport;
        dataSrc.airportTimer = null;

        dataSrc.dataEventEmitter.emit('airportChanged');

        dataSrc.getSankey(newAirport);
    }

    setAirport(newAirport) {
        if (this.airportTimer !== null) {
            clearTimeout(this.airportTimer);
        }

        this.airportTimer = setTimeout(() => this.__setAirport(this, newAirport), 10);
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
        this.sankeyData = this.sankeyDataFull[airport];
        this.dataEventEmitter.emit('sankeyDataAvailable');
    }

    retrieveData(from, to, aggregation) {
        // TODO Aggregation of sankey data
        let month = from.getMonth() + 1;
        let monthStr = "";
        if (month < 10) {
            monthStr += "0";
        }
        monthStr += month;

        const jsonFile = "sankey_data/data_" + from.getFullYear() + "_" + monthStr + ".json";

        d3.json(jsonFile, (js) => {
            this.sankeyDataFull = js;
            for (let airport in js) {
                js[airport].links.forEach((l) => {
                    l.source = +l.source;
                    l.target = +l.target;
                    l.value = +l.value;
                });

            }
            this.sankeyData = this.sankeyDataFull[this.airport];
            this.dataEventEmitter.emit('sankeyDataAvailable');
        });
    }
}
