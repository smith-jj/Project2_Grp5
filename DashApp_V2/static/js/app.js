// Create Functions to build visuals using data calls app.py
// Build Function to show state data for Boys and Girls Math and Reading Scores 

// Boy's Math Scores 
function buildBoysmath(state) {
    d3.json(`/boymath/${state}`).then((bmData) => {
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#boymath-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(bmData).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Girl's Math Scores 
function buildGirlsmath(state) {
    d3.json(`/girlmath/${state}`).then((gmData) => {
        // Use d3 to select the panel with id of `#girlmath-metadata`
        var PANEL = d3.select("#girlmath-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(gmData).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Boy's Reading Scores
function buildBoysreading(state) {
    d3.json(`/boyreading/${state}`).then((brData) => {
        // Use d3 to select the panel with id of `#boyreading-metadata`
        var PANEL = d3.select("#boyreading-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(brData).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

//Girl's Reading Scores 
function buildGirlsreading(state) {
    d3.json(`/girlreading/${state}`).then((grData) => {
        // Use d3 to select the panel with id of `#girlreading-metadata`
        var PANEL = d3.select("#girlreading-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(grData).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Build Dynamic Scatter plots for each Metadata scetion 
function buildCharts(state) {
    d3.json(`/samples/${state}`).then((data) => {
                const otu_ids = data.avg_2009_mathScores;
                const otu_labels = data.oavg_2017_mathScores;
                const sample_values = data.sample_values;

                // Build a Bubble Chart
                var bubbleLayout = {
                    margin: { t: 0 },
                    hovermode: "closest",
                    xaxis: { title: "OTU ID" }
                };
                var bubbleData = [{
                    x: otu_ids,
                    y: sample_values,
                    text: otu_labels,
                    mode: "markers",
                    marker: {
                        size: sample_values,
                        color: otu_ids,
                        colorscale: "Earth"
                    }
                }];

                Plotly.plot("bubble", bubbleData, bubbleLayout);

                function init() {
                    // Grab a Reference to the Dropdown Select Element
                    var selector = d3.select("#selDataset");

                    // Use the List of Sample Names to Populate the Select Options
                    d3.json("/states").then((statesAbv) => {
                        statesAbv.forEach((state) => {
                            selector
                                .append("option")
                                .text(state)
                                .property("value", state);
                        });

                        // Use the First Sample from the List to Build Initial Plots
                        const firstState = statesAbv[0];
                        buildBoysmath(firstState);
                        buildGirlsmath(firstState);
                        buildBoysreading(firstState);
                        buildGirlsreading(firstState);
                    });
                }

                function optionChanged(newState) {
                    // Fetch New Data Each Time a New Sample is Selected
                    buildBoysmath(newState);
                    buildGirlsmath(newState);
                    buildBoysreading(newState);
                    buildGirlsreading(newState);
                }

                // Initialize the Dashboard
                init();