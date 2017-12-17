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

function getMaxDelay(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function getMaxEarly(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || -1*parseInt(arr[i][prop]) > -1* parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

function airportColor(airport){
  console.log("choose colour based on volume of flights from this airport");
  return "#000";
}

var units = "Widgets";

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f");
var format = function(d) { return formatNumber(d) + " mins"; };

// append the svg canvas to the page
var svg = d3.select("#chart"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// load the data (using the timelyportfolio csv method)
d3.csv("sankey.csv", function(error, data) {

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};

    data.forEach(function (d) {
      graph.nodes.push({ "name": d.source });
      graph.nodes.push({ "name": d.target });
      graph.links.push({ "source": d.source,
                         "target": d.target,
                         "value": +d.value });
     });

     // return only the distinct / unique nodes
     graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
     });

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d };
     });


graph = {"nodes": [{"name": "JFK"}, {"name": "SJC"}, {"name": "SMF"}, {"name": "DCA"}, {"name": "PHL"}, {"name": "RSW"}, {"name": "FLL"}, {"name": "ORD"}, {"name": "RDU"}, {"name": "HOU"}, {"name": "MCO"}, {"name": "PSE"}, {"name": "MIA"}, {"name": "CLT"}, {"name": "PBI"}, {"name": "ACK"}, {"name": "BUF"}, {"name": "JAX"}, {"name": "MVY"}, {"name": "SAV"}, {"name": "BGR"}, {"name": "LGB"}, {"name": "ATL"}, {"name": "ROC"}, {"name": "BUR"}, {"name": "ABQ"}, {"name": "PWM"}, {"name": "BOS"}, {"name": "SJU"}, {"name": "TPA"}, {"name": "LAS"}, {"name": "IAD"}, {"name": "AUS"}, {"name": "SFO"}, {"name": "MSY"}, {"name": "CHS"}, {"name": "DTW"}, {"name": "PHX"}, {"name": "SEA"}, {"name": "DEN"}, {"name": "LAX"}, {"name": "HYA"}, {"name": "BQN"}, {"name": "SLC"}, {"name": "SAN"}, {"name": "SYR"}, {"name": "BTV"}, {"name": "MSP"}, {"name": "RNO"}, {"name": "OAK"}, {"name": "STT"}, {"name": "SRQ"}, {"name": "DAB"}, {"name": "DFW"}, {"name": "PDX"}, {"name": "SAT"}, {"name": "HNL"}, {"name": "CVG"}, {"name": "SAT"}, {"name": "SMF"}, {"name": "OAK"}, {"name": "LGB"}, {"name": "PSE"}, {"name": "MCO"}, {"name": "SJC"}, {"name": "IAD"}, {"name": "JAX"}, {"name": "MSY"}, {"name": "SJU"}, {"name": "PHL"}, {"name": "DTW"}, {"name": "PWM"}, {"name": "FLL"}, {"name": "BOS"}, {"name": "RNO"}, {"name": "BUF"}, {"name": "ROC"}, {"name": "ABQ"}, {"name": "AUS"}, {"name": "RDU"}, {"name": "HOU"}, {"name": "ATL"}, {"name": "LAS"}, {"name": "PBI"}, {"name": "BTV"}, {"name": "SYR"}, {"name": "ORD"}, {"name": "DCA"}, {"name": "SEA"}, {"name": "DFW"}, {"name": "TPA"}, {"name": "ACK"}, {"name": "SAN"}, {"name": "DEN"}, {"name": "BQN"}, {"name": "MIA"}, {"name": "LAX"}, {"name": "MSP"}, {"name": "SLC"}, {"name": "CLT"}, {"name": "CHS"}, {"name": "BUR"}, {"name": "RSW"}, {"name": "SFO"}, {"name": "PHX"}, {"name": "STT"}, {"name": "SAV"}, {"name": "PDX"}, {"name": "MVY"}, {"name": "SRQ"}, {"name": "BGR"}, {"name": "HYA"}, {"name": "DAB"}, {"name": "HNL"}], "links": [{"source": 1, "target": 0, "value": 73.48387096774194}, {"source": 2, "target": 0, "value": 58.241379310344826}, {"source": 3, "target": 0, "value": 50.516129032258064}, {"source": 4, "target": 0, "value": 50.193548387096776}, {"source": 5, "target": 0, "value": 44.18032786885246}, {"source": 6, "target": 0, "value": 39.91694352159468}, {"source": 7, "target": 0, "value": 38.89041095890411}, {"source": 8, "target": 0, "value": 38.63793103448276}, {"source": 9, "target": 0, "value": 37.357142857142854}, {"source": 10, "target": 0, "value": 32.174107142857146}, {"source": 11, "target": 0, "value": 30.0}, {"source": 12, "target": 0, "value": 29.924342105263158}, {"source": 13, "target": 0, "value": 29.91891891891892}, {"source": 14, "target": 0, "value": 28.5}, {"source": 15, "target": 0, "value": 27.77777777777778}, {"source": 16, "target": 0, "value": 27.663366336633665}, {"source": 17, "target": 0, "value": 26.65909090909091}, {"source": 18, "target": 0, "value": 25.63157894736842}, {"source": 19, "target": 0, "value": 25.17543859649123}, {"source": 20, "target": 0, "value": 22.727272727272727}, {"source": 21, "target": 0, "value": 22.666666666666668}, {"source": 22, "target": 0, "value": 21.826291079812208}, {"source": 23, "target": 0, "value": 21.261904761904763}, {"source": 24, "target": 0, "value": 20.774193548387096}, {"source": 25, "target": 0, "value": 19.612903225806452}, {"source": 26, "target": 0, "value": 19.36521739130435}, {"source": 27, "target": 0, "value": 19.26843657817109}, {"source": 28, "target": 0, "value": 19.13372093023256}, {"source": 29, "target": 0, "value": 19.085106382978722}, {"source": 30, "target": 0, "value": 17.885416666666668}, {"source": 31, "target": 0, "value": 17.8625}, {"source": 32, "target": 0, "value": 17.30635838150289}, {"source": 33, "target": 0, "value": 16.989583333333332}, {"source": 34, "target": 0, "value": 16.891304347826086}, {"source": 35, "target": 0, "value": 16.0}, {"source": 36, "target": 0, "value": 15.892857142857142}, {"source": 37, "target": 0, "value": 15.875}, {"source": 38, "target": 0, "value": 15.566433566433567}, {"source": 39, "target": 0, "value": 14.912751677852349}, {"source": 40, "target": 0, "value": 14.174311926605505}, {"source": 41, "target": 0, "value": 13.193548387096774}, {"source": 42, "target": 0, "value": 13.189655172413794}, {"source": 43, "target": 0, "value": 12.174157303370787}, {"source": 44, "target": 0, "value": 12.115942028985508}, {"source": 45, "target": 0, "value": 9.460674157303371}, {"source": 46, "target": 0, "value": 8.047058823529412}, {"source": 47, "target": 0, "value": 8.008771929824562}, {"source": 48, "target": 0, "value": 6.857142857142857}, {"source": 49, "target": 0, "value": 4.774193548387097}, {"source": 50, "target": 0, "value": 2.918032786885246}, {"source": 51, "target": 0, "value": 1.9}, {"source": 52, "target": 0, "value": -1.7419354838709677}, {"source": 53, "target": 0, "value": -1.8870967741935485}, {"source": 54, "target": 0, "value": -3.9130434782608696}, {"source": 55, "target": 0, "value": -6.67741935483871}, {"source": 56, "target": 0, "value": -14.096774193548388}, {"source": 57, "target": 0, "value": -15.0}, {"source": 0, "target": 58, "value": 77.35483870967742}, {"source": 0, "target": 59, "value": 73.96666666666667}, {"source": 0, "target": 60, "value": 50.903225806451616}, {"source": 0, "target": 61, "value": 42.87719298245614}, {"source": 0, "target": 62, "value": 42.51851851851852}, {"source": 0, "target": 63, "value": 38.40481400437637}, {"source": 0, "target": 64, "value": 36.483870967741936}, {"source": 0, "target": 65, "value": 36.025}, {"source": 0, "target": 66, "value": 35.20224719101124}, {"source": 0, "target": 67, "value": 34.43478260869565}, {"source": 0, "target": 68, "value": 34.08670520231214}, {"source": 0, "target": 69, "value": 32.29032258064516}, {"source": 0, "target": 70, "value": 30.688524590163933}, {"source": 0, "target": 71, "value": 30.191304347826087}, {"source": 0, "target": 72, "value": 29.42904290429043}, {"source": 0, "target": 73, "value": 29.183431952662723}, {"source": 0, "target": 74, "value": 27.3}, {"source": 0, "target": 75, "value": 27.202970297029704}, {"source": 0, "target": 76, "value": 27.188235294117646}, {"source": 0, "target": 77, "value": 27.0}, {"source": 0, "target": 78, "value": 25.511363636363637}, {"source": 0, "target": 79, "value": 25.203389830508474}, {"source": 0, "target": 80, "value": 24.612903225806452}, {"source": 0, "target": 81, "value": 24.350467289719628}, {"source": 0, "target": 82, "value": 23.54639175257732}, {"source": 0, "target": 83, "value": 23.06382978723404}, {"source": 0, "target": 84, "value": 23.023255813953487}, {"source": 0, "target": 85, "value": 22.9438202247191}, {"source": 0, "target": 86, "value": 22.789115646258505}, {"source": 0, "target": 87, "value": 21.93548387096774}, {"source": 0, "target": 88, "value": 21.75862068965517}, {"source": 0, "target": 89, "value": 21.306451612903224}, {"source": 0, "target": 90, "value": 18.84375}, {"source": 0, "target": 91, "value": 18.581818181818182}, {"source": 0, "target": 92, "value": 18.307692307692307}, {"source": 0, "target": 93, "value": 18.16}, {"source": 0, "target": 94, "value": 17.152542372881356}, {"source": 0, "target": 95, "value": 16.34426229508197}, {"source": 0, "target": 96, "value": 15.920909090909092}, {"source": 0, "target": 97, "value": 15.547826086956523}, {"source": 0, "target": 98, "value": 15.47191011235955}, {"source": 0, "target": 99, "value": 14.558035714285714}, {"source": 0, "target": 100, "value": 14.258620689655173}, {"source": 0, "target": 101, "value": 13.0}, {"source": 0, "target": 102, "value": 12.065573770491802}, {"source": 0, "target": 103, "value": 11.838757396449704}, {"source": 0, "target": 104, "value": 11.832618025751072}, {"source": 0, "target": 105, "value": 11.53225806451613}, {"source": 0, "target": 106, "value": 8.948275862068966}, {"source": 0, "target": 107, "value": 8.904347826086957}, {"source": 0, "target": 108, "value": 5.615384615384615}, {"source": 0, "target": 109, "value": 5.387096774193548}, {"source": 0, "target": 110, "value": 4.545454545454546}, {"source": 0, "target": 111, "value": 4.096774193548387}, {"source": 0, "target": 112, "value": 1.7096774193548387}, {"source": 0, "target": 113, "value": -4.290322580645161}]};

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .size([width, height]);

var link = svg.append("g")
    .attr("class", "links")
    .attr("fill", "none")
    .selectAll("path");

var node = svg.append("g")
    .attr("class", "nodes")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("g");

var path = sankey.link();

  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

acceptable_mins = 15;


// add in the links
  link = link
      .data(graph.links)
    .enter().append("path")
      .attr("class", function(d) { 
        return "link "+d.source.name+" "+d.target.name;
      })
      .attr("d", path)
            .attr("stroke-opacity", 0.3)
      .attr("stroke", function(d) { // if changed to red, Changes fill of all the nodes to red.
        var maxDelay = getMaxDelay(graph.links, "value").value;
        var maxEarly = getMaxEarly(graph.links, "value").value;
        // console.log(maxDelay)
        // console.log(maxEarly)
        if (d.value > acceptable_mins){
          percentage = 100 - (50+(50*((d.value-acceptable_mins)/(maxDelay-acceptable_mins))))
        }
        else{
          percentage = 100 - (50*(1-((-1*(d.value-acceptable_mins)/(acceptable_mins+(-1*maxEarly))))))
        }

        return green2red(percentage)
        })
      .style("stroke-width", function(d) { return Math.max(1, Math.abs(d.dy)); })
      .sort(function(a, b) { return b.dy - a.dy; });

// link hover values
link.append("title")
      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = node
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
      return "translate(" + d.x + "," + d.y + ")"; })
    
// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return airportColor(d.name); })
      .style("stroke", "#000");

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

  // find all links and partners on the page
  var linkClass = 'link';
  var links = $('path.'+linkClass);
  var partners = $('path.'+linkClass);
  
  // a function that finds a partner for a given a link
  var findPartner = function(link){
  
    // find all the classes of the link, with the exception of the link class
    var classes = link.attr('class').split(' ').filter(function(e){return e != linkClass; });
    
    // build a jQuery selector for the corresponding element
    var classSelector = classes.map(function(e){return '.' + e}).join('');
    
    // and return all jquery elements matching this selector
    return partners.filter(classSelector);
  }
  
  // add handlers for entering and exiting any of the links
  links.hover(function(){
    findPartner($(this)).addClass('hover');
  }, function(){
    findPartner($(this)).removeClass('hover');
  })


});
