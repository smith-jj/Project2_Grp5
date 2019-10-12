// Build functions to collect Metedata from app.py scrape of data for Math Scores 
// function buildMetadatamMath(states) {
// Function that Builds the Metadata Panel
var PANEL = d3.select("#math-scores");
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
});
}
// Build functions to collect Metedata from app.py scrape of data for Math Scores 
function buildMetadatamRead(states) {
    // Following Function that Builds the Metadata Panel
    var PANEL = d3.select("#read-scores");
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
    });
}

function init() {
    // Grab a Reference to the Dropdown Select Element
    var selector = d3.select("#selDataset");
    // Use the List of Sample Names to Populate the Select Options
    d3.json("/states").then((stateNames) => {
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
// Create Dynamic Scatter 
function makeResponsive() {
    var chartGroup = resizeCanvas();

    d3.csv(".data/nationalScores.csv").then(function(data) {

        // transform the datatype
        data.forEach(function(d) {

            d.avg_2009_math = +d.avg_2009_math;
            d.avg_2017_math = +d.avg_2017_math;
            d.avg_2009_read = +d.avg_2009_read;
            d.avg_2017_read = +d.avg_2017_read;

        })
        makeScatter(data, chartGroup);
    })
}
var circles;

function crGet() {
    if (width <= 530) {
        circles = 5;
    } else {
        circles = 10;
    }
}
// function make responsieve to window size
function resizeCanvas() {

    // clear original chart in case window size update
    var svg = d3.select("#scatter").select("svg")

    if (!svg.empty()) { svg.remove(); };

    svgHeight = window.innerHeight * 0.65;
    svgWidth = window.innerWidth * 0.8;
    margin = {

        left: 100,
        top: 100,
        right: 150,
        bottom: 100
    };

    chartHeight = svgHeight - margin.top - margin.bottom
    chartWidth = svgWidth - margin.left - margin.right

    svg = d3.select("#scatter").append("svg")

    .attr("height", svgHeight)
        .attr("width", svgWidth)

    // create new canvas, shifting the origin to center canvas
    var chartGroup = svg.append("g")

    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    return chartGroup;

}
// MAIN FUNCTION to make plot
function makeScatter(data, chartGroup) {

    // defalt chosenX,Y value 
    var chosenX = "avg_2009_math";
    var chosenY = "avg_2017_math"
    var xScale = make_xScale(data, chosenX, chartWidth);
    var yScale = make_yScale(data, chosenY, chartHeight);
    var BottomAxis = d3.axisBottom(xScale)
    var LeftAxis = d3.axisLeft(yScale)

    // create the actual axis & ticks
    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(BottomAxis)

    var yAxis = chartGroup.append("g")
        .call(LeftAxis)

    // add circle-text Group
    var elementGroup = chartGroup.selectAll("#circleTextGroup")

    if (!elementGroup.empty) { elementGroup.remove() }

    elementGroup = chartGroup.selectAll("#circleTextGroup")

    .data(data)
        .enter()
        .append("g")
        .attr("id", "circleTextGroup")


    var circles = elementGroup
        .append("circle")
        .attr("cx", d => xScale(d[chosenX]))
        .attr("cy", d => yScale(d[chosenY]))
        .attr("r", 15)
        .attr("fill", "powderblue")
        .attr("opacity", "0.5");

    var texts = elementGroup

        .append("text")
        .text(d => d.state)
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${xScale(d[chosenX])} , ${yScale(d[chosenY])})`)
        .attr("font-size", "11")
        .attr("font-weight", "bold")
        .attr("dy", "3");

    // add labels
    var xlabelGroup = chartGroup.append("g")
    var ylabelGroup = chartGroup.append("g")

    // xlabels

    var mathLabel09 = xlabelGroup.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 50)
        .attr("class", "active")
        .attr("value", "avg_2009_math")
        .text("avg_2009_math")


    // ylables
    var mathLabel17 = ylabelGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -40)
        .attr("class", "active")
        .attr("value", "avg_2017_math")
        .text("avg_2017_math")



    var circles = updateToolTip(chosenX, chosenY, circles);

    var title = chartGroup.append("text")
        .attr("id", "plot-title")
        .attr("transform", `translate(${chartWidth / 2}, -20)`)
        .attr("font-size", 36)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text(`${chosenX.replace(chosenX[0], chosenX[0].toUpperCase())} vs. ${chosenY.replace(chosenY[0], chosenY[0].toUpperCase())}`)

    // add text
    var key = chosenX.concat("-", chosenY)

    d3.select("#article")

    .html(`<br><hr><h4>Correlation between <em><b>${chosenX}</b></em> and <em><b>${chosenY}</b></em></h4>` +
        `<br>A <em><b>${p_desc[key]["pm"]}</b></em> correlation is found between ${p_desc[key]["text"]}<br><br><br><br>`)



    // create on-click listening events function
    xlabelGroup.selectAll("text").on("click", function() {

        // get current label
        var value = d3.select(this).attr("value")

        if (value != `${chosenX}_label`) {

            // console.log(value.slice(0, -6), `${chosenX}_label`)
            chosenX = value.slice(0, -6);

            // update x,y Scales
            xScale = make_xScale(data, chosenX, chartWidth);
            xAxis = renderXAxis(xScale, xAxis);

            // update circle location and text 
            renderCircles(circles, texts, xScale, chosenX, yScale, chosenY)

            // update toolTip
            circles = updateToolTip(chosenX, chosenY, circles);

            // update labels' active & inactive class
            xlabelGroup.selectAll("text")
                .classed("active", false)
                .classed("inactive", true)
            d3.select(this).classed("inactive", false)
                .classed("active", true)

            // update title
            d3.select("#plot-title").text(`${chosenX.replace(chosenX[0], chosenX[0].toUpperCase())} vs. ${chosenY.replace(chosenY[0], chosenY[0].toUpperCase())}`)

            // update text description
            var key = chosenX.concat("-", chosenY)

            d3.select("#article")
                .html(`<br><hr><h4>Correlation between <em><b>${chosenX}</b></em> and <em><b>${chosenY}</b></em></h4>` +
                    `<br>A <em><b>${p_desc[key]["pm"]}</b></em> correlation is found between ${p_desc[key]["text"]}<br><br><br><br>`)
        }
    })

    ylabelGroup.selectAll("text").on("click", function() {

        // get current y-label
        var value = d3.select(this).attr("value");

        if (value != `${chosenY}_label`) {

            // console.log(value.slice(0, -6), `${chosenY}_label`)
            chosenY = value.slice(0, -6);

            // update x,y Scales
            yScale = make_yScale(data, chosenY, chartHeight);
            yAxis = renderYAxis(yScale, yAxis);

            // update circle location and text 
            renderCircles(circles, texts, xScale, chosenX, yScale, chosenY)

            // update toolTip
            circles = updateToolTip(chosenX, chosenY, circles);

            // update labels' active & inactive class
            ylabelGroup.selectAll("text")
                .classed("active", false)
                .classed("inactive", true)

            d3.select(this).classed("inactive", false)
                .classed("active", true)

            // update title
            d3.select("#plot-title")
                .html(`${chosenX.replace(chosenX[0], chosenX[0].toUpperCase())} vs. ${chosenY.replace(chosenY[0], chosenY[0].toUpperCase())}`)

            // update text description
            var key = chosenX.concat("-", chosenY)

            d3.select("#article")
                .html(`<br><hr><h4>Correlation between <em><b>${chosenX}</b></em> and <em><b>${chosenY}</b></em></h4>` +
                    `<br>A <em><b>${p_desc[key]["pm"]}</b></em> correlation is found between ${p_desc[key]["text"]}`)

        }
    })
}
// add toolTip
var toolTip = d3.selectAll(".tooltip")

if (!toolTip.empty()) { toolTip.remove() }

var toolTip = d3.select("#scatter")
    .append("div")
    .classed("tooltip", true)



// function to update xScale
function make_xScale(data, chosenX, chartWidth) {

    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenX]) * 0.9, d3.max(data, d => d[chosenX]) * 1.05])
        .range([0, +chartWidth]);

    return xScale;
}

// function to update yScale
function make_yScale(data, chosenY, chartHeight) {

    var yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenY]) * 0.75, d3.max(data, d => d[chosenY]) * 1.05])
        .range([chartHeight, 0]);
    return yScale;
}

// function to render Axis transition
function renderXAxis(newScale, xAxis) {

    var BottomAxis = d3.axisBottom(newScale);
    xAxis.transition().duration(1000).call(BottomAxis);
    return xAxis;
}

function renderYAxis(newScale, yAxis) {

    var LeftAxis = d3.axisLeft(newScale);
    yAxis.transition().duration(1000).call(LeftAxis);
    return yAxis;
}

// functino to render the circles
function renderCircles(circles, texts, XScale, ChosenX, YScale, ChosenY) {

    circles.transition()
        .duration(1000)
        .attr("cx", d => XScale(d[ChosenX]))
        .attr("cy", d => YScale(d[ChosenY]))

    texts.transition()
        .duration(1000)
        .attr("transform", d => `translate(${XScale(d[ChosenX])}, ${YScale(d[ChosenY])})`)
    return circles;
}
// MAIN DRIVING COMMANDS

makeResponsive()

d3.select(window).on("resize", makeResponsive);