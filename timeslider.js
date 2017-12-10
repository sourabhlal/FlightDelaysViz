class TimeSlider {
    constructor(options) {
        this.containerDiv = options.containerDiv;
        this.startDate = options.startDate;
        this.endDate = options.endDate;
        this.selectedStartDate = this.startDate;
        this.selectedEndDate = this.endDate;

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

        // Brush handler. Get time-range startDate a brush and pass it to the charts.
        // Could do snaping with https://gist.github.com/mbostock/6232620
    }

    onBrush(chart) {
        return () => {
            const that = chart;
            const b = d3.event.selection === null ? that.contextXScale.domain() : d3.event.selection.map(that.contextXScale.invert);

            that.selectedStartDate = b[0];
            that.selectedEndDate = b[1];

            that.timeEventEmitter.emit("timeChange");
        };
    }
}
