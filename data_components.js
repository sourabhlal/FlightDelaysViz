
class DataSource {
    constructor(timeComponent) {
        this.timeComponent = timeComponent;
        timeComponent.timeEventEmitter.addListener('timeChange', () => this.handleTimeChange());
        this.startDate = this.timeComponent.startDate;
        this.endDate = this.timeComponent.endDate;

        // TODO Create these events
        // this.dataEventEmitter = new EventEmitter();
        // this.dataEventEmitter.defineEvents(['sankeyDataAvailable', 'causesDataAvailable']);

        this.aggregationBy = null;
    }

    handleAggregationChange() {
        // TODO: make the timeslider emit an event when the aggregation changed
    }

    handleTimeChange() {
        this.startDate = this.timeComponent.selectedStartDate;
        this.endDate = this.timeComponent.selectedEndDate;

        this.retrieveData(this.startDate, this.endDate, this.aggregationBy);
    }


    retrieveData(from, to, aggregation) {
        // TODO
    }
}
