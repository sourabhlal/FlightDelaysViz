# Project for EPFL course: Data Visualization

## Flight Delays

**By Romain Gehrig, Sourabh Lal and Thierry Treyer**

### Installation

Try it [there](https://sourabhlal.github.io/FlightDelaysViz/)!

There is no dependencies to install for seeing this visualisation.
You just need to serve content of the directory using an HTTP server.
To do so, you may simply type the following command:

    python2 -m SimpleHTTPServer

You can use Google Chrome and reach the visualisation there http://localhost:8000.

You can find the original dataset [here](https://www.transtats.bts.gov/DL_SelectFields.asp?Table_ID=236&DB_Short_Name=On-Time).
If you want to use our pipeline to process the data by yourself, you will need to download extra data through Git LFS.

### Usage

Once you've reached the visualisation you will have a map on the left of your screen, a graph on the right and a timeline in the bottom.
You may at any time change the displayed month by sliding the time window.

Start exploring by hovering your mouse on airports and see the graph on the right panel change as you move around.
This graph shows you the summed delay for each day of the month on the top, and the repartition of the reasons behind those delays on the bottom.

  * *Late Aircraft*: A flight had to wait for a connexion to arrive before departure.
  * *Security*: Issue related to security occurred and introduced delay.
  * *NAS*: The airport required the departure to be delayed.
  * *Weather*: The weather conditions prevented a departure on time.
  * *Carrier*: The airline had issues that lead to delayed departure.

By actually clicking on an airport, the right panel will slide over the map and reveal the Sankey graph.
This graph display each connection of this airport and show their delay.
On the left of the graph you can see the arrivals and on the right there is the departures.
The thicker the link, the bigger the traffic is between those airports.
Hover on a link to see more detail about it.

You may come back to the map at any time by clicking on the arrow at the top left of the screen.

Try exploring the evolution of the Christmas' jam or the passage of hurricane Irma!
