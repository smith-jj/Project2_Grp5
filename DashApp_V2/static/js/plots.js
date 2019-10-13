// Build Chart Function
var boys = d3.csv.parse("rawData/male_math_data.csv");

var girls = d3.csv.parse("rawData/female_math_data.csv");

// Trace1 for the Student Data
var trace1 = {
    x: boys.map(row => row.state),
    y: boys.map(row => row.avg_2017_mathScores),
    text: boys.map(row => row.state),
    name: "Boy Math",
    type: "bar"
};

// Trace 2 for the Roman Data
var trace2 = {
    x: girls.map(row => row.state),
    y: girls.map(row => row.avg_2017_mathScores),
    text: girls.map(row => row.state),
    name: "Girl Math",
    type: "bar"
};

// Combining both traces
var data = [trace1, trace2];

// Apply the group barmode to the layout
var layout = {
    title: "TEST",
    barmode: "group"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);