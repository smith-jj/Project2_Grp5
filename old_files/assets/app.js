function buildCharts(state) {

     // Define SVG area dimensions
var svgWidth = 200;
var svgHeight = 200;

// Define the chart's margins as an object
var chartMargin = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#bar1")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv(`/combine/${state}`, function(error, stateData) {
  if (error) throw error;

  //set up x and y list
  var yearSubject = ["2009 Math", "2017 Math", "2009 Reading", "2017 Reading"]
  var scores = [stateData.avg_2009_math, stateData.avg_2017_math, stateData.avg_2009_read, stateData.avg_2017_read] 

  // Cast the hours value to a number for each piece of tvData
  scores.forEach(function(d) {
    d.avg_2009_math = +d.avg_2009_math,
    d.avg_2017_math = +d.avg_2017_math,
    d.avg_2009_read = +d.avg_2009_read,
    d.avg_2017_read = +d.avg_2017_read
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(yearSubject.length)
    .range([0, chartWidth])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(scores)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
    .data(stateData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.yearSubject))
    .attr("y", d => yLinearScale(d.scores))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.scores));
  });
};
