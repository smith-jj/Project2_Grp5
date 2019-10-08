// Build functions to collect Metedata from app.py scrape of data for Math Scores 
function buildMetadata(state) {
    console.log(state);

    // Function that Builds the Metadata Panel
    var PANEL = d3.select("#math_scores");
    // Use `d3.json` to Fetch the Metadata for a Sample
    d3.json(`/math/${states}`).then((data) => {
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

// Following Function that Builds the Metadata Panel
var PANEL = d3.select("#read_scores");
// Use `d3.json` to Fetch the Metadata for a Sample
d3.json(`/read/${states}`).then((data) => {
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

// Bar graphs 
function buildCharts(state) {

    // @TODO: Use `d3.json` to Fetch the Route Data for the plot
    d3.json(`/math/${state}`).then((data) => {
                // @TODO: Build a Bubble Chart Using the Sample Data
                let bubbleLayout = {
                    margin: { t: 0 },
                    hovermode: "closests",
                    xaxis: { title: "XAXIS" }
                }

                let bubbleData = [{
                    x: data.gender,
                    y: data.math_scores,
                    text: data.state,
                    mode: "markers",
                    marker: {
                        size: data.math_scores,
                        color: data.math_scores,
                        colorscale: "Earth"
                    }
                }]

                Plotly.plot("bubble", bubbleData, bubbleLayout);
                // @TODO: Use `d3.json` to Fetch the Route Data for the plot
                d3.json(`/math/${state}`).then((data) => {
                            // @TODO: Build a Bubble Chart Using the Sample Data
                            let bubbleLayout = {
                                margin: { t: 0 },
                                hovermode: "closests",
                                xaxis: { title: "XAXIS" }
                            }

                            let bubbleData = [{
                                x: data.gender,
                                y: data.read_scores,
                                text: data.state,
                                mode: "markers",
                                marker: {
                                    size: data.read_scores,
                                    color: data.read_scores,
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
                                d3.json("/state").then((stateNames) => {
                                    stateNames.forEach((state) => {
                                        selector
                                            .append("option")
                                            .text(state)
                                            .property("value", state);
                                    });

                                    // Use the First Sample from the List to Build Initial Plots
                                    const firstState = stateNames[0];
                                    buildCharts(firstState);
                                });
                            }

                            function optionChanged(newState) {
                                // Fetch New Data Each Time a New Sample is Selected
                                buildCharts(newState);
                                buildMetadata(newState);
                            }

                            // Initialize the Dashboard
                            init();