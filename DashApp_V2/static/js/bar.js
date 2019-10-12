// function to call states

    var state1 = d3.select("#State1");
    var state2 = d3.select("#State2");

    var searchnames= [];

    // make the variable chart elements
    var globPlot1;
    var globPlot3;

    //Load CSV Data
    var stateData;

    d3.csv('rawData/female_math_data.csv').then(data => {
            const stateData = data.map(read => {
            
              let row = {
                  State: read[1],
                  Read_2009: +read[3],
                  Read_2017: +read[3],
                };
            
                return row;
              });
            
              console.log(stateData);
    
  /////////////////////////////////////////////////UPDATE
        var state1 = stateData.map(data => data.name);
        console.log(state1);
        const uniqueSet= new Set(state1);
        const backToArray= [...uniqueSet];
        
        for (var i=0; i<backToArray.length;i++){
            searchnames.push(backToArray[i]);
        };
        console.log(backToArray)
        console.log(searchnames)
  /////////////////////////////////////////////////UPDATE

        d3.select("#State1")
            .selectAll("option")
            .data(searchnames)
            .enter()
            .append("option")
            .html(function (d) {
                return `<option>${d}</option>`;
            });

        // console.log(stateData);
        d3.select("#State2")
            .selectAll("option")
            .data(searchnames)
            .enter()
            .append("option")
            .html(function (d) {
                return `<option>${d}</option>`;
            });


        newStateData = StateData;

        function first(x) {
            return (x.name === "TX");
        }

        function second(x) {
            return (x.name === "OK");
        }

        //Store filtered data in CHOSEN variable 
        var firstState = StateData.filter(first);

        var barchosen1 = (Object.values(firstState[9]));


        //Store filtered data in CHOSEN variable 
        var secondState = StateData.filter(second);

        var barchosen2 = (Object.values(secondState[9]));



        new Chart(document.getElementById("barChart1"), {
            type: 'horizontalBar',
            reponsive: true,
            data: {
                labels: ["Reading 2009", "Reading 2017"],
                datasets: [{
                    label: "Gradebook",
                    fill: true,
                    backgroundColor: "rgba(241,110,152,0.8)",
                    borderColor: "rgba(179,181,198,1)",
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(179,181,198,1)",
                    data: barchosen1.slice(2, 8)
                }]
            },
            options: {
                // title: {
                //     display: true,
                //     text: 'Scores for State!'
                // },
                    scales: {
                        xAxes : [{
                            ticks : {
                                max : 175,    
                                min : 0
                            }
                        }]
                    }
                }
        });

        new Chart(document.getElementById("barChart3"), {
            type: 'horizontalBar',
            reponsive: true,
            data: {
                labels: ["Readin 2009", "Reading 2017"],
                datasets: [{
                    label: "State Scores",
                    fill: true,
                    backgroundColor: "rgba(153,219,145,0.8)",
                    borderColor: "rgba(179,181,198,1)",
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "rgba(179,181,198,1)",
                    data: barchosen1.slice(2, 8)
                }]
            },
            options: {
                scales: {
                    xAxes:[{
                        ticks:{
                            beginatzero: true,
                            min: 0,
                            max: 175
                        }
                    }]
                }
            }
        });
    });

    setTimeout(function () {
        console.log(newStateData);
    }, 2000);

 
// Function to handle input change
function Update1(x) {
    //Store filtered data in CHOSEN variable 
    var first = newStateData.filter(state1);
    // console.log(chosen[0]);
    var barchosen1 = (Object.values(first[9]));

    console.log(globPlot1);
    // update a specific chart instance
    // clear out the old instance
        $('#barChart1').remove(); // this is my <canvas> element
        $('#chartDiv1').html('<canvas id="barChart1" max-width="400" max-height="300"> </canvas>');

    // make a new chart
    new Chart(document.getElementById("barChart1"), {
        type: 'horizontalBar',
        reponsive: true,
        data: {
            labels: ["Readin 2009", "Reading 2017"],
            datasets: [{
                label: "State Scores",
                fill: true,
                backgroundColor: "rgba(241,110,152,0.8)",
                borderColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointBackgroundColor: "rgba(179,181,198,1)",
                data: barchosen1.slice(2, 8)
            }]
        },
        options: {
          
            scales: {
                xAxes:[{
                    ticks:{
                        beginatzero: true,
                        min: 0,
                        max: 175
                    }
                }]
            }
        }
    });
};

// Function to handle input change
function Update2(x) {

    //Store filtered data in CHOSEN variable 
    var first = newStateData.filter(state1);
    // console.log(chosen[0]);
    var barchosen1 = (Object.values(first[9]));
    // console.log(radarchosen.slice(3, 9));
    console.log(globPlot1);
    // update a specific chart instance
    // clear out the old instance
        $('#barChart3').remove(); // this is my <canvas> element
        $('#chartDiv3').html('<canvas id="barChart3" max-width="400" max-height="300"> </canvas>');

    // make a new chart
    new Chart(document.getElementById("barChart3"), {
        type: 'horizontalBar',
        reponsive: true,
        data: {
            labels: ["Readin 2009", "Reading 2017"],
            datasets: [{
                label: "State Scores",
                fill: true,
                backgroundColor: "rgba(153,219,145,0.8)",
                borderColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointBackgroundColor: "rgba(179,181,198,1)",
                data: barchosen1.slice(2, 8)
            }]
        },
        options: {
            scales: {
                xAxes:[{
                    ticks:{
                        beginatzero: true,
                        min: 0,
                        max: 175
                    }
                }]
            }
        }
    });
};

state1.on("change", Update1);
state2.on("change", Update2);