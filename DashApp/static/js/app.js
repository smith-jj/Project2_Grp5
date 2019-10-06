//Create charts for HTML Page using the Flask App scraped data 
function buildCharts(national)

//======================================================================
// Create line graph using MetricsGraphics.js library 
// EX CODE for line graph showing neg and pos changes by state
// Would create dropdown tool to change graph by reaing and math, or create second line graph for reading or math
//======================================================================
d3.json('/national', function(data) {

    var max = d3.max(data, function(d) {
        return d.value;
    });
    var min = d3.min(data, function(d) {
        return d.value;
    });

    var offsetForNegativeValues = ((max - min) / 1.75);

    for (var i = 0; i < data.length; i++) {
        data[i].value = (data[i].value - offsetForNegativeValues) / 1000000;
    }

    data = MG.convert.date(data, 'date');
    MG.data_graphic({
        title: "Percent Change in Test Scores",
        description: "This is a line chart shows the postive or negative change in the test scores from 2009 vs 2017",
        data: data,
        width: 600,
        height: 200,
        right: 40,
        area: true,
        flip_area_under_y_value: 0,
        target: document.getElementById('area_flipped_users_gain_loss'),
        x_accessor: 'date',
        y_accessor: 'value'
    });
});

// =========================================================== // 
// Choropleth Map EX CODE 
// ==========================================================// 
// populate drop-down
d3.select("#dropdown")
    .selectAll("option")
    .data(dropdown_options)
    .enter()
    .append("option")
    .attr("value", function(option) { return option.value; })
    .text(function(option) { return option.text; });

// initial dataset on load
var selected_dataset = "empl13";

var w = 700,
    h = 650;

var svg = d3.select("#block")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

var projection = d3.geo.mercator()
    .center([-76.6180827, 39.323953])
    .scale([140000])
    .translate([270, 165]);

var path = d3.geo.path()
    .projection(projection);

// first of two scales for linear fill; ref [1]
var fill_viridis = d3.scale.linear()
    .domain(d3.range(0, 1, 1.0 / (viridis_colors.length - 1)))
    .range(viridis_colors);

// second of two scales for linear fill 
var norm_fill = d3.scale.linear()
    .range([0, 1]);

var geojson = "https://feyderm.github.io/data/Workforce and Economic Development (2010-2013) - Shape.geojson";

d3.json(geojson, function(json) {

    plot = svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "#808080")
        .attr("fill", "#b3b3b3")
        .call(updateFill, selected_dataset)
        .on("mouseover", function(d) { displayData(d); })
        .on("mouseout", hideData);
});

// dropdown dataset selection
var dropDown = d3.select("#dropdown");

dropDown.on("change", function() {

    // newly selected dataset includes downtown
    d3.select("#downtown")
        .property("checked", true);

    checked = true;

    selected_dataset = d3.event.target.value;

    plot.call(updateFill, selected_dataset)

});

// checkbox to include/exclude downtown
var checkbox = d3.select("#downtown");

checkbox.on("change", function() {

    checked = !checked;

    if (checked == false) {
        plot.call(updateFillxDt, selected_dataset);
    } else {
        plot.call(updateFill, selected_dataset);
    }
});

function displayData(d) {

    d3.select("#neighborhood")
        .text(d.properties.csa2010)

    d3.select("#datum")
        .text(parseFloat(d.properties[selected_dataset]).toFixed(2));
}

function hideData() {

    d3.select("#neighborhood")
        .text("\u00A0");

    d3.select("#datum")
        .text("\u00A0");
}

function updateFill(selection, selected_dataset) {

    var d_extent = d3.extent(selection.data(), function(d) {
        return parseFloat(d.properties[selected_dataset]);
    });

    rescaleFill(selection, d_extent);
}

function updateFillxDt(selection, selected_dataset) {

    var d_wo_downtown = selection.data()
        .filter(function(d) {
            return d.properties.csa2010 != "Downtown/Seton Hill";
        });

    d_extent_wo_downtown = d3.extent(d_wo_downtown, function(d) {
        return parseFloat(d.properties[selected_dataset]);
    });

    rescaleFill(selection, d_extent_wo_downtown)
}

function rescaleFill(selection, d_extent) {

    norm_fill.domain(d_extent)

    selection.transition()
        .duration(700)
        .attr("fill", function(d) {
            var datum = parseFloat(d.properties[selected_dataset]);
            return fill_viridis(norm_fill(datum));
        });
}
// Choropleth Map - Need to toggle between Reading and Math & 2009 vs 2017
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv', function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'code'),
        z: unpack(rows, 'AvgMath2009'),
        text: unpack(rows, 'state'),
        zmin: 0,
        zmax: 17000,
        colorscale: [
            [0, 'rgb(242,240,247)'],
            [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'],
            [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'],
            [1, 'rgb(84,39,143)']
        ],
        colorbar: {
            title: 'Average Math Scores by State',
            thickness: 0.2
        },
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];


    var layout = {
        title: '2009 Average Math Scores for 4th Graders',
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
        }
    };

    Plotly.plot(myDiv, data, layout, { showLink: false });
});

// ======================================== //
// ======================================= //

// Use chart building example from BellyButton HW 
// Build function to collect Metedata from app.py scrape of data 
function buildMetadata(sample) {
    console.log(sample);

    // @TODO: Complete the Following Function that Builds the Metadata Panel
    var PANEL = d3.select("#sample-metadata");
    // Use `d3.json` to Fetch the Metadata for a Sample
    d3.json(`/metadata/${sample}`).then((data) => {
        // Use d3 to Select the Panel with id of `#sample-metadata`

        // Use `.html("") to Clear any Existing Metadata
        PANEL.html(" ");
        // Use `Object.entries` to Add Each Key & Value Pair to the Panel
        // Hint: Inside the Loop, Use d3 to Append New Tags for Each Key-Value in the Metadata
        Object.entries(data).forEach(([key, value]) => {
                PANEL.append("h6").text(`${key}:${value}`);
            })
            // BONUS: Build the Gauge Chart
            // buildGauge(data.wfreq);
    });
}

// =================================================================================
// Scatter plot EX Code
// ==================================================================================
function buildCharts(sample) {

    // @TODO: Use `d3.json` to Fetch the Sample Data for the Plots
    d3.json(`/samples/${sample}`).then((data) => {
                // @TODO: Build a Bubble Chart Using the Sample Data
                // @TODO: Build a Pie Chart
                let bubbleLayout = {
                    margin: { t: 0 },
                    hovermode: "closests",
                    xaxis: { title: "OTU ID" }
                }

                let bubbleData = [{
                    x: data.otu_ids,
                    y: data.sample_values,
                    text: data.otu_labels,
                    mode: "markers",
                    marker: {
                        size: data.sample_values,
                        color: data.otu_ids,
                        colorscale: "Earth"
                    }
                }]

                Plotly.plot("bubble", bubbleData, bubbleLayout);

                //==============================================================================
                // Code to initialize browser
                // ============================================================================
                function init() {
                    // Grab a Reference to the Dropdown Select Element
                    var selector = d3.select("#selDataset");

                    // Use the List of Sample Names to Populate the Select Options
                    d3.json("/names").then((sampleNames) => {
                        sampleNames.forEach((sample) => {
                            selector
                                .append("option")
                                .text(sample)
                                .property("value", sample);
                        });

                        // Use the First Sample from the List to Build Initial Plots
                        const firstSample = sampleNames[0];
                        buildCharts(firstSample);
                        buildMetadata(firstSample);
                    });
                }

                function optionChanged(newSample) {
                    // Fetch New Data Each Time a New Sample is Selected
                    buildCharts(newSample);
                    buildMetadata(newSample);
                }

                // Initialize the Dashboard
                init();