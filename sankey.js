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

function color(airport){
  // console.log("choose colour based on volume of flights from this airport");
  return "#000";
}


var formatNumber = d3.format(",.0f");
var format = function(d) { return formatNumber(d) + " mins"; };

acceptable_mins = 15;

class SankeyDiagram {
    constructor(dataSrc) {
        this.dataSrc = dataSrc;
        dataSrc.dataEventEmitter.addListener('sankeyDataAvailable', () => this.handleData());
        this.data = null;
        this.svg = d3.select("#sankey svg").attr("style", "outline: thin solid grey;");
        this.width = +this.svg.attr("width");
        this.height = +this.svg.attr("height");
        this.sankey = d3.sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .nodeAlign(d3.sankeyCenter)
            .extent([[1, 1], [this.width - 1, this.height - 6]]);
        this.link = this.svg.append("g")
            .attr("class", "links")
            .attr("fill", "none");
        this.node = this.svg.append("g")
            .attr("class", "nodes")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);
    }

    handleData() {
        this.data = this.dataSrc.sankeyData;
        this.sankey(this.data);

        const svg = this.svg;
        let link = this.link.selectAll("path");
        let node  = this.node.selectAll('g');
        const cities = this.data;
        const centerCity = this.dataSrc.targetCity;

        const lnk = link
                  .data(cities.links);
        // TODO: this is the declaration of the key function for each link (so we can do transitions) but for now it is messy and doesn't bring much visually.. We would need to look at with a better idea of what it should look like
                        // (l) => {
                        //     const isLeft = l.target.name == this.dataSrc.targetCity;
                        //     if (isLeft) {
                        //         return l.source.name;
                        //     } else {
                        //         return l.target.name;
                        //     }
                        // });
        var maxDelay = getMaxDelay(cities.links, "value").value;
        var maxEarly = getMaxEarly(cities.links, "value").value;

        lnk.enter().append("path")
            .attr("class", function(d) {
                return "link "+d.source.name+" "+d.target.name;
            })
            .attr("d", d3.sankeyLinkHorizontal())
            .attr("stroke-opacity", 0.3)
            .attr("stroke", function(d) { // if changed to red, Changes fill of all the nodes to red.
                // console.log(maxDelay)
                // console.log(maxEarly)
                let percentage = 0;
                if (d.value > acceptable_mins){
                    percentage = 100 - (50+(50*((d.value-acceptable_mins)/(maxDelay-acceptable_mins))));
                }
                else{
                    percentage = 100 - (50*(1-((-1*(d.value-acceptable_mins)/(acceptable_mins+(-1*maxEarly))))));
                }

                return green2red(percentage);
            })
            .attr("stroke-width", function(d) { return Math.max(1, Math.abs(d.width)); })
            .append("title")
            .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

        lnk.exit().remove();
        lnk.transition().duration(1000)
            .attr("class", function(d) {
                return "link "+d.source.name+" "+d.target.name;
            })
            .attr("d", d3.sankeyLinkHorizontal())
            .attr("stroke-opacity", 0.3)
            .attr("stroke", function(d) { // if changed to red, Changes fill of all the nodes to red.
                var maxDelay = getMaxDelay(cities.links, "value").value;
                var maxEarly = getMaxEarly(cities.links, "value").value;
                // console.log(maxDelay)
                // console.log(maxEarly)
                let percentage = 0;
                if (d.value > acceptable_mins){
                    percentage = 100 - (50+(50*((d.value-acceptable_mins)/(maxDelay-acceptable_mins))));
                }
                else{
                    percentage = 100 - (50*(1-((-1*(d.value-acceptable_mins)/(acceptable_mins+(-1*maxEarly))))));
                }

                return green2red(percentage);
            })
            .attr("stroke-width", function(d) { return Math.max(1, Math.abs(d.width)); });

        const nd = node.data(cities.nodes);
        const g = nd.enter().append("g");
        g.append("rect")
            .attr("x", function(d) { return d.x0; })
            .attr("y", function(d) { return d.y0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("width", function(d) { return d.x1 - d.x0; })
            .attr("fill", function(d) { return color(d.name); })
            .attr("stroke", "#000");
        g.append("text")
            .attr("x", function(d) { return d.x0 - 6; })
            .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .text(function(d) { return d.name; })
            .filter((d) => d.x0 < this.width / 2)
            .attr("x", function(d) { return d.x1 + 6; })
            .attr("text-anchor", "start");

        nd.exit().remove();
        nd.transition().duration(1000)
            .select('rect')
                .attr("x", function(d) { return d.x0; })
                .attr("y", function(d) { return d.y0; })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("width", function(d) { return d.x1 - d.x0; })
                .attr("fill", function(d) { return color(d.name); })
            .attr("stroke", "#000");
        nd.transition().duration(1000)
            .select('text')
                .attr("x", function(d) { return d.x0 - 6; })
                .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
                .attr("dy", "0.35em")
                .attr("text-anchor", "end")
                .text(function(d) { return d.name; })
                .filter((d) => d.x0 < this.width / 2)
                .attr("x", function(d) { return d.x1 + 6; })
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
        };

        // add handlers for entering and exiting any of the links
        links.hover(function(){
            findPartner($(this)).addClass('hover');
        }, function(){
            findPartner($(this)).removeClass('hover');
        });
    }
}
