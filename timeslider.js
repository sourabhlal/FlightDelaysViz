class TimeSlider {
    constructor(options) {
        this.containerDiv = options.containerDiv;
        this.startDate = options.startDate;
        this.endDate = options.endDate;
        this.triggerBrush = false;
        if (options.selectedStartDate !== undefined) {
            this.selectedStartDate = options.selectedStartDate;
            this.triggerBrush = true;
        } else {
            this.selectedStartDate = this.startDate;
        }
        if (options.selectedEndDate !== undefined) {
            this.selectedEndDate = options.selectedEndDate;
            this.triggerBrush = true;
        } else {
            this.selectedEndDate = this.endDate;
        }

        this.timeEventEmitter = new EventEmitter();
        this.timeEventEmitter.defineEvents(['timeChange']);
    }

    draw() {
        const startDate = this.startDate;
        const endDate = this.endDate;
        const width = this.containerDiv.clientWidth;
        const height = this.containerDiv.clientHeight;
        const contextHeight = height;
        const contextWidth = width;

        const svg = d3.select(this.containerDiv).append('svg')
                  .attr("width", (width))
                  .attr("height", (height));

        this.xScale = d3.scaleTime()
                .range([0, width])
                .domain([startDate, endDate]);

        // Create a context for a brush
        this.contextXScale = d3.scaleTime()
                .range([0, contextWidth])
                .domain(this.xScale.domain());

        this.contextAxis = d3.axisBottom(this.contextXScale)
                .tickSize(contextHeight)
                .tickPadding(-10);

        this.contextArea = d3.area()
                .x(function(d) {
                    return this.contextXScale(d.date);
                })
                .y0(contextHeight)
                .y1(0)
                .curve(d3.curveLinear);

        var brush = d3.brushX()
                .extent([
                    [this.contextXScale.range()[0], 0],
                    [this.contextXScale.range()[1], contextHeight]
                ])
                .on("brush", this.onBrush(this));

        let context = svg.append("g")
                .attr("class", "context")
                .attr("transform", "translate(0,0)");

        context.append("g")
            .attr("class", "x axis top")
            .attr("transform", "translate(0,0)")
            .call(this.contextAxis);

        context.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", 0)
            .attr("height", contextHeight);

        if (this.triggerBrush) {
            // console.log("trying to trigger");
            // d3.select(brush).call(d3.event.target.move, [this.selectedStartDate, this.selectedEndDate].map(this.contextXScale));
        }

    }

    // Brush handler. Get time-range startDate a brush and pass it to the charts.
    // Could do snaping with https://gist.github.com/mbostock/6232620
    onBrush(timeslider) {
        return function() {
            // Don't trigger on self change
            if (d3.event.sourceEvent.type === "brush") {
                return;
            }

            const that = timeslider;

            const d0 = d3.event.selection === null ? that.contextXScale.domain() : d3.event.selection.map(that.contextXScale.invert);
            const d1 = d0.map(d3.timeMonth.round);

            if (d1[0] >= d1[1]) {
                d1[0] = d3.timeMonth.floor(d0[0]);
                d1[1] = d3.timeMonth.offset(d1[0]);
            }
            d3.select(this).call(d3.event.target.move, d1.map(that.contextXScale));

            let shouldEmit = false;
            if (that.selectedStartDate.getTime() != d1[0].getTime()) {
              that.selectedStartDate = d1[0];
              shouldEmit = true;
            }
            if (that.selectedEndDate.getTime() != d1[1].getTime()) {
              that.selectedEndDate = d1[1];
              shouldEmit = true;
            }

            if (shouldEmit) {
              that.timeEventEmitter.emit("timeChange");
            }
        };
    }
}
