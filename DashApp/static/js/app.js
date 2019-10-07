    // =================================================================================
    // Bar graphs 
    // ==================================================================================
    function buildBar(dataname) {

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