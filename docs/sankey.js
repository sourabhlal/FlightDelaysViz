function green2red(percentage) {
  var r, g, b = 0;
  if(percentage < 50) {
    r = 255;
    g = Math.round(5.1 * percentage);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * percentage);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}

function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

var svg = d3.select("svg").attr("style", "outline: thin solid grey;"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " TWh"; },
    color = d3.scaleOrdinal(d3.schemeCategory10);

var cities = 
{"nodes": [
  {"name":"Chicago"}, // 0
  {"name":"New York"}, // 1
  {"name":"Toronto"}, // 2
  {"name":"San Francisco"}, // 3
  {"name":"Las Vegas"}, // 4    
  {"name":"Los Angeles"}, // 5

  {"name":"Florida"}, // 6

  {"name":"Florida"}, // 7
  {"name":"New York"}, // 8
  {"name":"Toronto"}, // 9
  {"name":"San Francisco"}, // 10
  {"name":"Las Vegas"}, // 11
  {"name":"Los Angeles"}, // 12
  ],
"links":[
    {"source":1,"target":0,"value":20},
    {"source":2,"target":0,"value":21},
    {"source":3,"target":0,"value":7},
    {"source":4,"target":0,"value":1},
    {"source":5,"target":0,"value":2},
    {"source":6,"target":0,"value":32},
    
    {"source":0,"target":7,"value":4},
    {"source":0,"target":8,"value":12},
    {"source":0,"target":9,"value":19},
    {"source":0,"target":10,"value":45},
    {"source":0,"target":11,"value":8},
    {"source":0,"target":12,"value":4},
]};

var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
.nodeAlign(d3.sankeyCenter)
    .extent([[1, 1], [width - 1, height - 6]]);

var link = svg.append("g")
    .attr("class", "links")
    .attr("fill", "none")    
.attr("stroke-opacity", 0.2)
  .selectAll("path");

var node = svg.append("g")
    .attr("class", "nodes")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
  .selectAll("g");
              
sankey(cities);

link = link
    .data(cities.links)
    .enter().append("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", function(d) { // if changed to red, Changes fill of all the nodes to red.
        var maxDelay = getMax(cities.links, "value").value;
        percentage = 100*(1 - d.value/maxDelay)
        return green2red(percentage)
        })
      .attr("stroke-width", function(d) { return Math.max(1, d.width); });

// link hover values
link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

node = node
    .data(cities.nodes)
    .enter().append("g");

node.append("rect")
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000");

node.append("text")
      .attr("x", function(d) { return d.x0 - 6; })
      .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x0 < width / 2; })
      .attr("x", function(d) { return d.x1 + 6; })
      .attr("text-anchor", "start");