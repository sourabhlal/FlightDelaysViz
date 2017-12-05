// new Date(year, month, day, hours, minutes, seconds, milliseconds);
let min_date = new Date(1999, 1, 1);
let max_date = new Date(2017, 8, 1);

const chartDiv = document.getElementById("timeslider");
const width = chartDiv.clientWidth * 0.95,
      height = 50,
      contextHeight = height,
      contextWidth = width;

const svg = d3.select("#timeslider").append('svg')
          .attr("width", (width))
          .attr("height", (height));

svg.data([{}], createChart);

function createChart(data) {
  let startYear = min_date;
  let endYear = max_date;

  var xScale = d3.scaleTime()
          .range([0, width])
          .domain([min_date, max_date]);

  // Create a context for a brush
  var contextXScale = d3.scaleTime()
    .range([0, contextWidth])
    .domain(xScale.domain());

  var contextAxis = d3.axisBottom(contextXScale)
    .tickSize(contextHeight)
    .tickPadding(-10);

  var contextArea = d3.area()
    .x(function(d) {
      return contextXScale(d.date);
    })
    .y0(contextHeight)
    .y1(0)
    .curve(d3.curveLinear);

  var brush = d3.brushX()
    .extent([
      [contextXScale.range()[0], 0],
      [contextXScale.range()[1], contextHeight]
    ])
    .on("brush", onBrush);

  let context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(0,0)");

  context.append("g")
    .attr("class", "x axis top")
    .attr("transform", "translate(0,0)")
    .call(contextAxis);

  context.append("g")
    .attr("class", "x brush")
    .call(brush)
    .selectAll("rect")
    .attr("y", 0)
    .attr("height", contextHeight);

  // Brush handler. Get time-range from a brush and pass it to the charts.
  // Could do snaping with https://gist.github.com/mbostock/6232620
  function onBrush() {
    var b = d3.event.selection === null ? contextXScale.domain() : d3.event.selection.map(contextXScale.invert);
      console.log("From: " + b[0] + " to: " + b[1]);
  }
}
