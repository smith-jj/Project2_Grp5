# Project2_Grp5
## JILL's branch 

Review documentation and create URLs for API calls of test data for 4th grade students in US. 

## API URL LEGEND
baseURL = https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?
* type=sigacrossyear (changes between given years)
* &subject=reading
* &subject=mathematics
* &grade=4
* &subscale=RRPCM (reading)
* &subscale=MWPCM (math)
* &variable=GENDER
* &jurisdiction=NT (National); &jurisdiction=NP (National public); &jurisdiction=NR (National private); (add states after juridicition)
* &stattype=MN:MN (Mean)
* &Year=2009, 2017

## Math URLS - 4th Grade Boys & Girls Math Scores from 2009 and 2017
* National Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=mathematics&grade=4&subscale=MRPCM&variable=GENDER&jurisdiction=NT,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

* Public Schools Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=mathematics&grade=4&subscale=MRPCM&variable=GENDER&jurisdiction=NP,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

* Private Schools Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=mathematics&grade=4&subscale=MRPCM&variable=GENDER&jurisdiction=NR,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009


## Reading URLS - 4th Grade Boys & Girls Reading Scores from 2009 and 2017
* National Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=reading&grade=4&subscale=RRPCM&variable=GENDER&jurisdiction=NT,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

* Public Schools Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=reading&grade=4&subscale=RRPCM&variable=GENDER&jurisdiction=NP,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

* Private Schools Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=reading&grade=4&subscale=RRPCM&variable=GENDER&jurisdiction=NR,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009


## Dashboard 
For the app.py file:
* Install dash - https://dash.plot.ly/
* Review the Tutorial pages on using Dash - https://dash.plot.ly/getting-started 
    * Dash Core Components - https://dash.plot.ly/dash-core-components
    * Graphs Reference - https://dash.plot.ly/dash-core-components/graph
    * DataTable - https://dash.plot.ly/datatable 
    * Interactive Visualizations - https://dash.plot.ly/interactive-graphing

For Thursday, each branch needs to have an app.py file with a rendering visual of one of the above datasets


