// ============================================================================
// EX Code Choropleth Map - assigned to Syed 
// Use either CSV files or Flask queries from app.py file 
// ==========================================================================
d3.csv("NationalScores.csv", function(err, data) {

    var config = { "color1": "#d3e5ff", "color2": "#08306B", "stateDataColumn": "state_or_territory", "defaultValue": "census_population_april_1_2010_number", "state": "state_or_territory" };

    var WIDTH = 800,
        HEIGHT = 500;

    var COLOR_COUNTS = 9;

    var SCALE = 0.7;

    function Interpolate(start_year, end_year, gender, avg_2009_math, avg_2017_math, avg_2009_read, avg_2017_read) {
        var s = start_year,
            e = end_year,

            return
    }

    function Color(_r, _g, _b) {
        var r, g, b;
        var setColors = function(_r, _g, _b) {
            r = _r;
            g = _g;
            b = _b;
        };

        setColors(_r, _g, _b);
        this.getColors = function() {
            var colors = {
                r: r,
                g: g,
                b: b
            };
            return colors;
        };
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function valueFormat(d) {
        if (d > 1000000000) {
            return Math.round(d / 1000000000 * 10) / 10 + "B";
        } else if (d > 1000000) {
            return Math.round(d / 1000000 * 10) / 10 + "M";
        } else if (d > 1000) {
            return Math.round(d / 1000 * 10) / 10 + "K";
        } else {
            return d;
        }
    }

    var fields = Object.keys(data[0]);
    var option_select = d3.select('#selectors').append("select")
        .attr("class", "option-select");
    for (var i = 0; i < fields.length; i++) {
        if (fields[i] !== config.state) {
            var opt = option_select.append("option")
                .attr("value", fields[i])
                .text(fields[i]);

            if (fields[i] === config.defaultValue) {
                opt.attr("selected", "true");
            }
        }
    }

    var COLOR_FIRST = config.color1,
        COLOR_LAST = config.color2;

    var rgb = hexToRgb(COLOR_FIRST);

    var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);

    rgb = hexToRgb(COLOR_LAST);
    var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);

    var width = WIDTH,
        height = HEIGHT;

    var startColors = COLOR_START.getColors(),
        endColors = COLOR_END.getColors();

    var colors = [];

    for (var i = 0; i < COLOR_COUNTS; i++) {
        var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
        var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
        var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
        colors.push(new Color(r, g, b));
    }

    var quantize = d3.scale.quantize()
        .domain([0, 1.0])
        .range(d3.range(COLOR_COUNTS).map(function(i) { return i }));

    var path = d3.geo.path();

    var svg = d3.select("#canvas-svg").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {
        d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(error, us) {

            var name_id_map = {};
            var id_name_map = {};

            for (var i = 0; i < names.length; i++) {
                name_id_map[names[i].name] = names[i].id;
                id_name_map[names[i].id] = names[i].name;
            }

            var dataMap = {};

            data.forEach(function(d) {
                if (!dataMap[d[config.state]]) {
                    dataMap[d[config.state]] = {};
                }

                for (var i = 0; i < Object.keys(data[0]).length; i++) {
                    if (Object.keys(data[0])[i] !== config.state) {
                        dataMap[d[config.state]][Object.keys(data[0])[i]] = +d[Object.keys(data[0])[i]];
                    }
                }
            });

            function drawMap(dataColumn) {
                var valueById = d3.map();

                data.forEach(function(d) {
                    var id = name_id_map[d[config.state]];
                    valueById.set(id, +d[dataColumn]);
                });

                quantize.domain([d3.min(data, function(d) { return +d[dataColumn] }),
                    d3.max(data, function(d) { return +d[dataColumn] })
                ]);

                svg.append("g")
                    .attr("class", "states-choropleth")
                    .selectAll("path")
                    .data(topojson.feature(us, us.objects.states).features)
                    .enter().append("path")
                    .attr("transform", "scale(" + SCALE + ")")
                    .style("fill", function(d) {
                        if (valueById.get(d.id)) {
                            var i = quantize(valueById.get(d.id));
                            var color = colors[i].getColors();
                            return "rgb(" + color.r + "," + color.g +
                                "," + color.b + ")";
                        } else {
                            return "";
                        }
                    })
                    .attr("d", path)
                    .on("mousemove", function(d) {
                        var html = "";

                        html += "<div class=\"tooltip_kv\">";
                        html += "<span class=\"tooltip_key\">";
                        html += id_name_map[d.id];
                        html += "</span>";
                        html += "</div>";

                        for (var i = 1; i < Object.keys(data[0]).length; i++) {
                            html += "<div class=\"tooltip_kv\">";
                            html += "<span class='tooltip_key'>";
                            html += Object.keys(data[0])[i];
                            html += "</span>";
                            html += "<span class=\"tooltip_value\">";
                            html += valueFormat(dataMap[id_name_map[d.id]][Object.keys(data[0])[i]]);
                            html += "";
                            html += "</span>";
                            html += "</div>";
                        }

                        $("#tooltip-container").html(html);
                        $(this).attr("fill-opacity", "0.7");
                        $("#tooltip-container").show();

                        var coordinates = d3.mouse(this);

                        var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;

                        if (d3.event.layerX < map_width / 2) {
                            d3.select("#tooltip-container")
                                .style("top", (d3.event.layerY + 15) + "px")
                                .style("left", (d3.event.layerX + 15) + "px");
                        } else {
                            var tooltip_width = $("#tooltip-container").width();
                            d3.select("#tooltip-container")
                                .style("top", (d3.event.layerY + 15) + "px")
                                .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
                        }
                    })
                    .on("mouseout", function() {
                        $(this).attr("fill-opacity", "1.0");
                        $("#tooltip-container").hide();
                    });

                svg.append("path")
                    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                    .attr("class", "states")
                    .attr("transform", "scale(" + SCALE + ")")
                    .attr("d", path);
            }

            drawMap(config.defaultValue);

            option_select.on("change", function() {
                drawMap($("#selectors").find(".option-select").val());
            });


        });
    });
});

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