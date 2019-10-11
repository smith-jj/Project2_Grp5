# Project2_Grp5
## JILL's branch 

### SEE DashApp_V2 folder 

# Dashboard 
* db folder 
    * sqlitle file for postgres connection of cleaned data 
* data folder 
    * Holds clean csv files 
* @TODO Flask App (app.py) (DONE)
    * Connect to SQL database and call tables (see Jupter Notebook) (DONE)
    * Use routes to call data from tables and store for app.js (DONE)
* static folder
    * @TODO app.js holds functions to build charts 
    * style.css styling for index.html 
* template folder 
    * index.html holds elements to render charts from functions built in app.js file under static folder  


# API Calls & Clean 
URLs for API calls of test data for 4th grade students in US. 

## Math URLS - 4th Grade Boys & Girls Math Scores from 2009 and 2017
* National Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=mathematics&grade=4&subscale=MRPCM&variable=GENDER&jurisdiction=NT,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009


## Reading URLS - 4th Grade Boys & Girls Reading Scores from 2009 and 2017
* National Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=reading&grade=4&subscale=RRPCM&variable=GENDER&jurisdiction=NT,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

* Public Schools Mean
https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=reading&grade=4&subscale=RRPCM&variable=GENDER&jurisdiction=NP,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

### API URL LEGEND
baseURL = https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?
* type=sigacrossyear (changes between 2009 & 2017)
* &subject=reading
* &subject=mathematics
* &grade=4
* &subscale=RRPCM (reading)
* &subscale=MWPCM (math)
* &variable=GENDER
* &jurisdiction=NT (National); &jurisdiction=NP (National public); &jurisdiction=NR (National private); (add states after juridicition)
* &stattype=MN:MN (Mean)
* &Year=2009, 2017

Data cleaned using Jupyter Notebook
Data transformed into sqlite db file using pandas in Jupyter Notebook



