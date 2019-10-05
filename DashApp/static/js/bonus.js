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