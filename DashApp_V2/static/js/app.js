// Create Functions to build visuals using data calls app.py
// Build Function to show state data for Boys and Girls Math and Reading Scores 
function buildDatacharts(state) {
    // Boy's Math Scores 
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

                // Girl's Math Scores 
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
                            // Boy's Reading Scores
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
                                        //Girl's Reading Scores 
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
                                                }



                                                // Chart.js 
                                                // var myBarChart = new Chart(ctx, {
                                                //     type: 'bar',
                                                //     data: data,
                                                //     options: options
                                                // });