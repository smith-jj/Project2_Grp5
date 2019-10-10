//Create Map
Plotly.d3.csv('data/NationalScores.csv', function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    // Data for map 
    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'state'),
        z: unpack(rows, 'avg_2009_math'),
        text: unpack(rows, 'state'),
        zmin: 0,
        zmax: 255.00,
        colorscale: [
            [0, 'rgb(242,240,247)'],
            [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'],
            [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'],
            [1, 'rgb(84,39,143)']
        ],
        colorbar: {
            title: 'Scores',
            thickness: 0.2
        },
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];

    // Mapy layout
    var layout = {
        title: '2009 Avg Math Scores for 4th Graders by State',
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
        }
    };
    //plot map
    Plotly.plot(myDiv, data, layout, { showLink: false });
});