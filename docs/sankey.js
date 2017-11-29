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
//
// var x = null;
//
// d3.csv("../docs/July17.csv", function(d) {
//       return {
//         origin : d.ORIGIN,
//         destin : d.DEST,
//         dep_delay : d.DEP_DELAY,
//         arr_delay : d.ARR_DELAY,
//       };
//     }, function(data) {
//       x = data;
//     });
//
// function getCityData(city, dataset){
//   var n = [city];
//   for (var i in dataset){
//     if (dataset[i].origin == city){
//       n.push(dataset[i].destin);
//     }
//     var nodes = new Set(n);
//   }
//   return nodes;
// }

var cities ={
  "nodes": [{"name": "JFK"}, {"name": "BUF"}, {"name": "HNL"}, {"name": "SAN"}, {"name": "DTW"}, {"name": "PBI"}, {"name": "LAS"}, {"name": "RDU"}, {"name": "HOU"}, {"name": "BUR"}, {"name": "DAB"}, {"name": "ORD"}, {"name": "RNO"}, {"name": "DFW"}, {"name": "SYR"}, {"name": "ROC"}, {"name": "SMF"}, {"name": "DCA"}, {"name": "MSY"}, {"name": "HYA"}, {"name": "LGB"}, {"name": "PDX"}, {"name": "MVY"}, {"name": "MCO"}, {"name": "BGR"}, {"name": "OAK"}, {"name": "RSW"}, {"name": "DEN"}, {"name": "PWM"}, {"name": "SAV"}, {"name": "SJU"}, {"name": "PHX"}, {"name": "SJC"}, {"name": "SRQ"}, {"name": "CLT"}, {"name": "ACK"}, {"name": "PHL"}, {"name": "BTV"}, {"name": "JAX"}, {"name": "BQN"}, {"name": "CVG"}, {"name": "FLL"}, {"name": "ATL"}, {"name": "ABQ"}, {"name": "IAD"}, {"name": "AUS"}, {"name": "STT"}, {"name": "CHS"}, {"name": "SLC"}, {"name": "TPA"}, {"name": "SEA"}, {"name": "PSE"}, {"name": "LAX"}, {"name": "SFO"}, {"name": "BOS"}, {"name": "SAT"}, {"name": "MIA"}, {"name": "MSP"}, {"name": "BUF"}, {"name": "HNL"}, {"name": "SAN"}, {"name": "DTW"}, {"name": "PBI"}, {"name": "LAS"}, {"name": "RDU"}, {"name": "HOU"}, {"name": "BUR"}, {"name": "DAB"}, {"name": "ORD"}, {"name": "RNO"}, {"name": "DFW"}, {"name": "SYR"}, {"name": "ROC"}, {"name": "SMF"}, {"name": "DCA"}, {"name": "MSY"}, {"name": "HYA"}, {"name": "LGB"}, {"name": "PDX"}, {"name": "MVY"}, {"name": "MCO"}, {"name": "BGR"}, {"name": "OAK"}, {"name": "RSW"}, {"name": "DEN"}, {"name": "PWM"}, {"name": "SAV"}, {"name": "SJU"}, {"name": "PHX"}, {"name": "SJC"}, {"name": "SRQ"}, {"name": "CLT"}, {"name": "ACK"}, {"name": "PHL"}, {"name": "BTV"}, {"name": "JAX"}, {"name": "BQN"}, {"name": "CVG"}, {"name": "FLL"}, {"name": "ATL"}, {"name": "ABQ"}, {"name": "IAD"}, {"name": "AUS"}, {"name": "STT"}, {"name": "CHS"}, {"name": "SLC"}, {"name": "TPA"}, {"name": "SEA"}, {"name": "PSE"}, {"name": "LAX"}, {"name": "SFO"}, {"name": "BOS"}, {"name": "SAT"}, {"name": "MIA"}, {"name": "MSP"}], "links": [{"source": 43, "target": 0, "value": 19.612903225806452}, {"source": 35, "target": 0, "value": 27.77777777777778}, {"source": 42, "target": 0, "value": 21.826291079812208}, {"source": 45, "target": 0, "value": 17.30635838150289}, {"source": 24, "target": 0, "value": 22.727272727272727}, {"source": 54, "target": 0, "value": 19.26843657817109}, {"source": 39, "target": 0, "value": 13.189655172413794}, {"source": 37, "target": 0, "value": 8.047058823529412}, {"source": 1, "target": 0, "value": 27.663366336633665}, {"source": 9, "target": 0, "value": 20.774193548387096}, {"source": 47, "target": 0, "value": 16.0}, {"source": 34, "target": 0, "value": 29.91891891891892}, {"source": 40, "target": 0, "value": -15.0}, {"source": 10, "target": 0, "value": -1.7419354838709677}, {"source": 17, "target": 0, "value": 50.516129032258064}, {"source": 27, "target": 0, "value": 14.912751677852349}, {"source": 13, "target": 0, "value": -1.8870967741935485}, {"source": 4, "target": 0, "value": 15.892857142857142}, {"source": 41, "target": 0, "value": 39.91694352159468}, {"source": 2, "target": 0, "value": -14.096774193548388}, {"source": 8, "target": 0, "value": 37.357142857142854}, {"source": 19, "target": 0, "value": 13.193548387096774}, {"source": 44, "target": 0, "value": 17.8625}, {"source": 38, "target": 0, "value": 26.65909090909091}, {"source": 6, "target": 0, "value": 17.885416666666668}, {"source": 52, "target": 0, "value": 14.174311926605505}, {"source": 20, "target": 0, "value": 22.666666666666668}, {"source": 23, "target": 0, "value": 32.174107142857146}, {"source": 56, "target": 0, "value": 29.924342105263158}, {"source": 57, "target": 0, "value": 8.008771929824562}, {"source": 18, "target": 0, "value": 16.891304347826086}, {"source": 22, "target": 0, "value": 25.63157894736842}, {"source": 25, "target": 0, "value": 4.774193548387097}, {"source": 11, "target": 0, "value": 38.89041095890411}, {"source": 5, "target": 0, "value": 28.5}, {"source": 21, "target": 0, "value": -3.9130434782608696}, {"source": 36, "target": 0, "value": 50.193548387096776}, {"source": 31, "target": 0, "value": 15.875}, {"source": 51, "target": 0, "value": 30.0}, {"source": 28, "target": 0, "value": 19.36521739130435}, {"source": 7, "target": 0, "value": 38.63793103448276}, {"source": 12, "target": 0, "value": 6.857142857142857}, {"source": 15, "target": 0, "value": 21.261904761904763}, {"source": 26, "target": 0, "value": 44.18032786885246}, {"source": 3, "target": 0, "value": 12.115942028985508}, {"source": 55, "target": 0, "value": -6.67741935483871}, {"source": 29, "target": 0, "value": 25.17543859649123}, {"source": 50, "target": 0, "value": 15.566433566433567}, {"source": 53, "target": 0, "value": 16.989583333333332}, {"source": 32, "target": 0, "value": 73.48387096774194}, {"source": 30, "target": 0, "value": 19.13372093023256}, {"source": 48, "target": 0, "value": 12.174157303370787}, {"source": 16, "target": 0, "value": 58.241379310344826}, {"source": 33, "target": 0, "value": 1.9}, {"source": 46, "target": 0, "value": 2.918032786885246}, {"source": 14, "target": 0, "value": 9.460674157303371}, {"source": 49, "target": 0, "value": 19.085106382978722}, {"source": 0, "target": 100, "value": 27.0}, {"source": 0, "target": 92, "value": 18.581818181818182}, {"source": 0, "target": 99, "value": 24.350467289719628}, {"source": 0, "target": 102, "value": 25.511363636363637}, {"source": 0, "target": 81, "value": 4.545454545454546}, {"source": 0, "target": 111, "value": 29.183431952662723}, {"source": 0, "target": 96, "value": 17.152542372881356}, {"source": 0, "target": 94, "value": 23.023255813953487}, {"source": 0, "target": 58, "value": 27.202970297029704}, {"source": 0, "target": 66, "value": 13.0}, {"source": 0, "target": 104, "value": 14.258620689655173}, {"source": 0, "target": 91, "value": 14.558035714285714}, {"source": 0, "target": 67, "value": 1.7096774193548387}, {"source": 0, "target": 74, "value": 21.93548387096774}, {"source": 0, "target": 84, "value": 18.16}, {"source": 0, "target": 70, "value": 21.306451612903224}, {"source": 0, "target": 61, "value": 30.688524590163933}, {"source": 0, "target": 98, "value": 29.42904290429043}, {"source": 0, "target": 59, "value": -4.290322580645161}, {"source": 0, "target": 65, "value": 24.612903225806452}, {"source": 0, "target": 76, "value": 4.096774193548387}, {"source": 0, "target": 101, "value": 36.025}, {"source": 0, "target": 95, "value": 35.20224719101124}, {"source": 0, "target": 63, "value": 23.54639175257732}, {"source": 0, "target": 109, "value": 15.920909090909092}, {"source": 0, "target": 77, "value": 42.87719298245614}, {"source": 0, "target": 80, "value": 38.40481400437637}, {"source": 0, "target": 113, "value": 16.34426229508197}, {"source": 0, "target": 114, "value": 15.547826086956523}, {"source": 0, "target": 75, "value": 34.43478260869565}, {"source": 0, "target": 79, "value": 5.615384615384615}, {"source": 0, "target": 82, "value": 50.903225806451616}, {"source": 0, "target": 68, "value": 22.789115646258505}, {"source": 0, "target": 62, "value": 23.06382978723404}, {"source": 0, "target": 78, "value": 8.904347826086957}, {"source": 0, "target": 93, "value": 32.29032258064516}, {"source": 0, "target": 88, "value": 11.832618025751072}, {"source": 0, "target": 108, "value": 42.51851851851852}, {"source": 0, "target": 85, "value": 30.191304347826087}, {"source": 0, "target": 64, "value": 25.203389830508474}, {"source": 0, "target": 69, "value": 27.3}, {"source": 0, "target": 72, "value": 27.188235294117646}, {"source": 0, "target": 83, "value": 12.065573770491802}, {"source": 0, "target": 60, "value": 18.307692307692307}, {"source": 0, "target": 112, "value": 77.35483870967742}, {"source": 0, "target": 86, "value": 8.948275862068966}, {"source": 0, "target": 107, "value": 21.75862068965517}, {"source": 0, "target": 110, "value": 11.838757396449704}, {"source": 0, "target": 89, "value": 36.483870967741936}, {"source": 0, "target": 87, "value": 34.08670520231214}, {"source": 0, "target": 105, "value": 15.47191011235955}, {"source": 0, "target": 73, "value": 73.96666666666667}, {"source": 0, "target": 90, "value": 5.387096774193548}, {"source": 0, "target": 103, "value": 11.53225806451613}, {"source": 0, "target": 71, "value": 22.9438202247191}, {"source": 0, "target": 106, "value": 18.84375}]
};

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
