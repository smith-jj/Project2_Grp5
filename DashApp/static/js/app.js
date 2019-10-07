// ============================================================================
// Metricsgraphic.js Line Graph EX CODE @ Sarah assisgned to visual
// Use National Gap data - query from flask app
// Need two Charts Math & Reading 
// ===========================================================================
function buildLine(dataname) {
    console.log(dataname);
    d3.json('/gap/<states>', function(data) {
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
            title: "Percent Change of Scores ",
            description: "Gap of score changes by state from 2009 to 2017",
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
                        d3.json("/years").then((stateAbv) => {
                            stateAbv.forEach((state) => {
                                selector
                                    .append("option")
                                    .text(state)
                                    .property("value", state);
                            });

                            // Use the First Sample from the List to Build Initial Plots
                            const firstAbv = stateAbv[0];
                            buildCharts(firstAbv);
                        });
                    }

                    function optionChanged(newSample) {
                        // Fetch New Data Each Time a New Sample is Selected
                        buildCharts(newSample);
                        buildMetadata(newSample);
                    }

                    // Initialize the Dashboard
                    init();