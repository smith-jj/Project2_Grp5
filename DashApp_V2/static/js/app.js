// Create Functions to build visuals using data calls app.py

// Build Function to show state data for Boys and Girls Math and Reading Scores 
// Boy's Math Scores 
function buildBoysmath(state) {
    d3.json(`/boymath/${state}`).then((data) => {
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#boymath-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(data).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Girl's Math Scores 
function buildGirlsmath(state) {
    d3.json(`/girlmath/${state}`).then((data) => {
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#girlmath-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(data).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Boy's Reading Scores
function buildBoysreading(state) {
    d3.json(`/boyreading/${state}`).then((data) => {
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#boyreading-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(data).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

//Girl's Reading Scores 
function buildGirlsreading(state) {
    d3.json(`/girlreading/${state}`).then((data) => {
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#girlreading-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(data).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    });
}

function init() {
    // Grab a Reference to the Dropdown Select Element
    var selector = d3.select("#selDataset");

    // Use the List of Sample Names to Populate the Select Options
    d3.json("/state").then((statesAbv) => {
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