function green2red(percentage) {
  var r, g, b = 0;
  if(percentage < 50) {
    r = 255;
    g = Math.round(3.5 * percentage);
    b = Math.round(3.5 * percentage);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * percentage);
    b = Math.round(510 - 5.10 * percentage);
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


var formatNumber = d3.format(",.0f");
var format = function(d) { return formatNumber(d) + " mins"; };
var units = "Widgets";
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

acceptable_mins = 15;

class SankeyDiagram {
    constructor(dataSrc, container) {
        this.dataSrc = dataSrc;
        dataSrc.dataEventEmitter.addListener('sankeyDataAvailable', () => this.handleData());
        this.data = null;
        this.airportsData = null;
        this.svg = d3.select(container);
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        this.sankey = d3.sankey()
            .nodeWidth(40)
            .nodePadding(7)
            .size([this.width, this.height]);
        this.link = this.svg.append("g")
            .attr("class", "links")
            .attr("fill", "none");
        this.node = this.svg.append("g")
            .attr("class", "nodes")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);
    }

  airportColor(airport){
    let scale = d3.interpolateMagma
    let as = this.airportsData.filter(a => a.Origin == airport)

    return scale(d3.min([as[0].DepDelayMinutes / d3.max(this.airportsData, a => a.DepDelayMinutes), 1.0]))
  }

  setAirportsData(na) {
    this.airportsData = na
  }

    handleData() {
        this.data = this.dataSrc.sankeyData;
        const graph = this.data;
        console.log('handle data for sankey for airport', this.dataSrc.airport);

        this.sankey
            .nodes(graph.nodes)
            .links(graph.links)
            .layout(1024);

        var path = this.sankey.link();

        const svg = this.svg;
        let link = this.link.selectAll("path");
        let node  = this.node.selectAll('g');

      const that = this
        const lnk = link
                  .data(graph.links);
        // TODO: this is the declaration of the key function for each link (so we can do transitions) but for now it is messy and doesn't bring much visually.. We would need to look at with a better idea of what it should look like
                        // (l) => {
                        //     const isLeft = l.target.name == this.dataSrc.targetCity;
                        //     if (isLeft) {
                        //         return l.source.name;
                        //     } else {
                        //         return l.target.name;
                        //     }
                        // });
        var maxDelay = getMaxDelay(graph.links, "value").value;
        var maxEarly = getMaxEarly(graph.links, "value").value;

        const that = this;

        function linkedAirport(lnk) {
            let focusAirport = that.dataSrc.airport;
            if (lnk.source.name === focusAirport) {
                return lnk.target;
            } else {
                return lnk.source;
            }
        }

        lnk.enter().append("path")
            .attr("id", function(d) {
                return linkedAirport(d).name;
            })
            .attr("class", function(d) {
                return "link "+d.source.name+" "+d.target.name;
            })
            .attr("d", path)
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
            .style("stroke-width", function(d) { return Math.max(10, Math.abs(d.dy)); })
            .sort(function(a, b) { return b.dy - a.dy; })
            .append("title")
            .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

        lnk.exit().remove();
        lnk.transition().duration(2000)
            .attr("id", function(d) {
                return linkedAirport(d).name;
            })
            .attr("class", function(d) {
                return "link "+d.source.name+" "+d.target.name;
            })
            .attr("d", path)
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
            .style("stroke-width", function(d) { return Math.max(10, Math.abs(d.dy)); });

        const nd = node.data(graph.nodes, (n) => n.name + "," + n.x + "," + n.y);
        const g = nd.enter().append("g")
                  .attr("class", "node")
                  .attr('transform', function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        const rect = g.append("rect")
            .attr("height", function(d) { return Math.max(10, Math.abs(d.dy)); })
            .attr("width", this.sankey.nodeWidth())
            .attr("fill", function(d) { return that.airportColor(d.name); })
            .attr("stroke", function(d) { return that.airportColor(d.name); });

        g.append("text")
          .attr("x", this.sankey.nodeWidth() / 2)
          .attr("y", function(d) { return d.dy / 2; })
          .attr('fill', '#cecece')
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .attr("transform", null)
          .text(function(d) { return d.name; })

        node.exit().remove();
        nd.exit().remove();
        // g.transition().duration(2000)
        //     .select('text')
        //     .attr("x", -6)
        //     .attr("y", function(d) { return d.dy / 2; })
        //     .text(function(d) { return d.name; })
        //     .filter((d) => d.x < this.width / 2)
        //     .attr("x", 6 + this.sankey.nodeWidth());
        // g.transition().duration(2000)
        //     .select('rect')
        //     .attr("height", function(d) { return d.dy; })
        //     .attr("fill", function(d) { return airportColor(d.name); })
        //     .attr("stroke", "#000");

        // g.transition().duration(1000)
        //     .attr('transform', function(d) { console.log('g transform'); return "translate(" + d.x + "," + d.y + ")"; });
        // rect.transition().duration(1000)
        //     .attr("height", function(d) { console.log('rect transform'); return d.dy; })
        //     .attr("width", this.sankey.nodeWidth())
        //     .attr("fill", function(d) { return airportColor(d.name); })
        //     .attr("stroke", "#000");
        // text.transition().duration(1000)
        //     .attr("x", -6)
        //     .attr("y", function(d) { console.log('text transform'); return d.dy / 2; })
        //     .attr("dy", "0.35em")
        //     .attr("text-anchor", "end")
        //     .attr("transform", null)
        //     .text(function(d) { return d.name; })
        //     .filter((d) => d.x < this.width / 2)
        //     .attr("x", 6 + this.sankey.nodeWidth())
        //     .attr("text-anchor", "start");

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

        links.click(function(e) {
            that.dataSrc.setAirport(e.currentTarget.id);
        });

        // add handlers for entering and exiting any of the links
        links.hover(function(){
            findPartner($(this)).addClass('highlight');
        }, function(){
            findPartner($(this)).removeClass('highlight');
        });

        var searchCity = function(code){
          return partners.filter('.' + code)
        }

        $( "#search" ).click(function() {
          searchCity( $( "#city" ).val() ).addClass('highlight');
        });

        $( "#clear" ).click(function() {
          searchCity( $( "#city" ).val() ).removeClass('highlight');
          $( "#city" ).val( "" );
        });

    }
}
