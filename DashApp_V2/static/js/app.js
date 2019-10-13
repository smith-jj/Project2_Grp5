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
// Call Boy's Math Chart  
chartMM();
// Call Girl's Math Chart
chartFM();
// Call Boy's Reading Chart
chartMR();
// Call Girl's Reading Chart
chartFR();


//Chart.js script
// Global X and y variables for Boy's Math Chart
const xmmlabels = [];
const ymmgap = [];
// Global x and y variables for Girl's Math chart 
const xfmlabels = [];
const yfmgap = [];
// Global x and y variables for Boy's Reading Chart 
const xmrlabels = [];
const ymrgap = [];
// Global x nad y variables for Girl's Reading Chart 
const xfrlabels = [];
const yfrgap = [];

// Function to create Boy's Math Chart from CSV
async function chartMM() {
    await getMMdata();
    const ctx = document.getElementById('mmChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xmmlabels,
            datasets: [{
                label: "Percent Change",
                data: ymmgap,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getMMdata() {
    const response = await fetch('male_math_data.csv');
    const data = await response.text();

    const mmTable = data.split('\n').slice(1);
    mmTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xmmlabels.push(state);
        const mmgap = columns[5];
        ymmgap.push(parseFloat(mmgap));
        console.log(state, mmgap);
    });
}

// Function to create Girls's Math Chart from CSV
async function chartFM() {
    await getFMdata();
    const ctx = document.getElementById('fmChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xfmlabels,
            datasets: [{
                label: "Percent Change",
                data: yfmgap,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getFMdata() {
    const response = await fetch('female_math_data.csv');
    const data = await response.text();

    const fmTable = data.split('\n').slice(1);
    fmTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xfmlabels.push(state);
        const fmgap = columns[5];
        yfmgap.push(parseFloat(fmgap));
        console.log(state, fmgap);
    });
}

// Function to create Boy's Reading Chart from CSV
async function chartMR() {
    await getMRdata();
    const ctx = document.getElementById('mrChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xmrlabels,
            datasets: [{
                label: "Percent Change",
                data: ymrgap,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getMRdata() {
    const response = await fetch('male_reading_data.csv');
    const data = await response.text();

    const mrTable = data.split('\n').slice(1);
    mrTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xmrlabels.push(state);
        const mrgap = columns[5];
        ymrgap.push(parseFloat(mrgap));
        console.log(state, mrgap);
    });
}

// Function to create Girl's Reading Chart from CSV
async function chartFR() {
    await getFRdata();
    const ctx = document.getElementById('frChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xfrlabels,
            datasets: [{
                label: "Percent Change",
                data: yfrgap,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getFRdata() {
    const response = await fetch('female_reading_data.csv');
    const data = await response.text();

    const frTable = data.split('\n').slice(1);
    frTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xfrlabels.push(state);
        const frgap = columns[5];
        yfrgap.push(parseFloat(frgap));
        console.log(state, frgap);
    });
}

const response = await fetch('static/csv/male_math_data.csv');
const response = await fetch('static/csv/male_reading_data.csv');
const response = await fetch('static/csv/female_math_data.csv');
const response = await fetch('static/csv/female_reading_data.csv');
const response = await fetch('static/csv/national_math_data.csv');
const response = await fetch('static/csv/national_reading_data.csv');