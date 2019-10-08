var map = d3.choropleth()
    .geofile('/d3-geomap/topojson/countries/USA.json')
    .projection(d3.geoAlbersUsa)
    .column('avg_math_perchg')
    .unitId('fips')
    .scale(1000)
    .legend(true);

d3.csv('/data/NationalScores.csv').then(data => {
    map.draw(d3.select('#map').datum(data));
});