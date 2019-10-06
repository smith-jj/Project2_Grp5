// ============================================================================
// EX Code Choropleth Map - assigned to Syed 
// Use either CSV files or Flask queries from app.py file 
// ==========================================================================
// populate drop-down for Map
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


// ============================================================================
// Metricsgraphic.js Line Graph EX CODE - Sarah assisgned to visual
// use queries data from flask (app.py) S
// ===========================================================================
function buildLine(dataname) {
    console.log(dataname);
    d3.json('/ROUTE', function(data) {

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
            title: "Percent Change in Math Test Scores (2009 vs 2017)",
            description: "This is a line chart having a flipped area under a Y value baseline",
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

    // =================================================================================
    // Scatter plot EX Code - Not assisgned 
    // ==================================================================================
    function buildScatter(dataname) {

        // @TODO: Use `d3.json` to Fetch the Route Data for the plot
        d3.json(`/ROUTE/${dataname}`).then((data) => {
                    // @TODO: Build a Bubble Chart Using the Sample Data
                    let bubbleLayout = {
                        margin: { t: 0 },
                        hovermode: "closests",
                        xaxis: { title: "XAXIS" }
                    }

                    let bubbleData = [{
                        x: data.ROUTEDATA,
                        y: data.ROUTEDATA,
                        text: data.ROUTEDATA,
                        mode: "markers",
                        marker: {
                            size: data.ROUTEDATA,
                            color: data.ROUTEDATA,
                            colorscale: "Earth"
                        }
                    }]

                    Plotly.plot("bubble", bubbleData, bubbleLayout);

                    //==============================================================================
                    // Code to initialize - EX Code from Belly Button HW - using select data to update the Metadata, pie chart and scatter
                    // We could use the Select function for scater plot
                    // ============================================================================
                    function init() {
                        // Grab a Reference to the Dropdown Select Element
                        var selector = d3.select("#selDataset");

                        // Use the List of Sample Names to Populate the Select Options
                        d3.json("/years").then((sampleNames) => {
                            sampleNames.forEach((sample) => {
                                selector
                                    .append("option")
                                    .text(sample)
                                    .property("value", sample);
                            });

                            // Use the First Sample from the List to Build Initial Plots
                            const firstSample = sampleNames[0];
                            buildCharts(firstSample);
                        });
                    }

                    function optionChanged(newSample) {
                        // Fetch New Data Each Time a New Sample is Selected
                        buildCharts(newSample);
                        buildMetadata(newSample);
                    }

                    // Initialize the Dashboard
                    init();