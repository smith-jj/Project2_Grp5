Plotly.d3.csv('data/NationalScores.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

      Plotly.newPlot('graph', [{
          type: 'choropleth',
          locationmode: 'state',
          locations: unpack(rows, 'state'),
          z: unpack(rows, 'avg_2009_math'),
          text: unpack(rows, 'state',
                       rows, 'avg_2009_math',
                       rows, 'avg_2009_read' ),
          name: "2009",
          visible: true,
          zmin: 0,
          zmax: 17000,
          colorscale: [RdBu],
          colorbar: {
              title: 'Average Math Score',
              thickness: 0.2
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 2
              }
          },
          type: 'choropleth',
          locationmode: 'state',
          locations: unpack(rows, 'state'),
          z: unpack(rows, 'avg_2017_math'),
          name: "2017",
          visible: true,
          text: unpack(rows, 'state',
                       rows, 'avg_2017_math',
                       rows, 'avg_2017_read' ),
          zmin: 0,
          zmax: 17000,
          colorscale: [RdBu],
          colorbar: {
              title: 'Average Math Score',
              thickness: 0.2
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 2
              }
          }
      }];{
        updatemenus: [{
          buttons: [{
            label: '1st',
            method: 'restyle',
            args: ['visible', [true, false, false]]
          }, {
            label: '2nd',
            method: 'restyle',
            args: ['visible', [false, true, false]]
          }
        }]
        
      })

      var layout = {
        title: 'National Report Card',
            geo:{
                scope: 'usa',
                countrycolor: 'rgb(255, 255, 255)',
                showland: true,
                landcolor: 'rgb(217, 217, 217)',
                showlakes: true,
                lakecolor: 'rgb(255, 255, 255)',
                subunitcolor: 'rgb(255, 255, 255)',
                lonaxis: {},
                lataxis: {}
            }
        };
