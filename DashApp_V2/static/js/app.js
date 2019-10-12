// Create Functions to build visuals using data calls app.py
// Build Function to show state data for Boys and Girls Math and Reading Scores 

// Boy's Math Scores 
function buildBoysmath(state) {
    d3.json(`/boymath/${state}`).then((mdata) => {
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#boymath-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(mdata).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Girl's Math Scores 
function buildGirlsmath(state) {
    d3.json(`/girlmath/${state}`).then((mdata) => {
        // Use d3 to select the panel with id of `#girlmath-metadata`
        var PANEL = d3.select("#girlmath-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(mdata).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Boy's Reading Scores
function buildBoysreading(state) {
    d3.json(`/boyreading/${state}`).then((rdata) => {
        // Use d3 to select the panel with id of `#boyreading-metadata`
        var PANEL = d3.select("#boyreading-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(rdata).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

//Girl's Reading Scores 
function buildGirlsreading(state) {
    d3.json(`/girlreading/${state}`).then((rdata) => {
        // Use d3 to select the panel with id of `#girlreading-metadata`
        var PANEL = d3.select("#girlreading-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(rdata).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
} // Build Dynamic Scatter plots for each Metadata scetion 
function buildMathChart(state) {
    d3.json(`/samples/${state}`).then((data) => {
            const year = data.avg_2009_mathScores;
            const gender = data.gender;
            const score_values = data.avg_2009_mathScores;

            // Build a Bubble Chart
            var bubbleLayout = {
                margin: { t: 0 },
                hovermode: "closest",
                xaxis: { title: "OTU ID" }
            };
            var bubbleData = [{
                x: year,
                y: score_values,
                text: gender,
                mode: "markers",
                marker: {
                    size: score_values,
                    color: gender,
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