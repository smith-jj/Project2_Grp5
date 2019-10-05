// EX CODE for Line Graph showing positive and negavtive 
d3.json('GAPDATA.json', function(data) {

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
        title: "Flipped area under Y value baseline",
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

// MATTS API call code CODE //
// API URLs 
var url_math_nat = “https: //www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=mathematics&grade=4&subscale=MRPCM&variable=GENDER&jurisdiction=NT,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009”


    // Create Call for National Math data 
    d3.json(url_math_nat).then(function(data) {
        stateResult = [];
        yearResult = [];
        for (var i = 0; i < data.result.length; i++) {
            var state = data.result[i].jurisdiction
            var year = data.result[i].focalYear
            stateResult.push(state);
            yearResult.push(year);
        };
        console.log(stateResult);
        console.log(yearResult);
    });

// =========================================================== // 
// ==========================================================// 
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

        // HINT: Use slice() to Grab the Top 10 sample_values,
        // otu_ids, and otu_labels (10 Each)
        let pieData = [{
            values: data.sample_values.slice(0, 10),
            labels: data.otu_ids.slice(0, 10),
            hovertext: data.otu_labels.slice(0, 10),
            hoverinfo: "hovertext",
            type: "pie"
        }];

        let pieLayout = {
            margin: { t: 0, l: 0 }
        };

        Plotly.plot("pie", pieData, pieLayout)
    })
}

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