# Project2_Grp5
## To run Flask App in command prompt use $python app.py

### Heroku Link: https://salty-reaches-91530.herokuapp.com/
* Not working, could not find log on Heroku Dashboard with failed/ error message 

## DashApp_V2 folder 
* data folder 
    * raw data folder  
        * csv files from API calls 
            * dataMathNaional.csv
            * dataReadNational.csv
        * jupyter notebook file for cleaning called data creating new dataframes and connecting new dataframes to postgres 
        * Clean csv files: 
            * female_math_data.csv
            * female_reading_data.csv
            * male_math_data.csv
            * male_reading_data.csv
        * schema.sql creating tables for new database in postgres 
* db folder
    * store the sqlite db file for running flask app (app.py)
* static folder
    * css folder
        * style.css file contains styling for index.html
    * js folder
        * app.js - Javascript functions that will call data from the app.py file to render visuals for Metadata webpage
* template folder
    * chart.html - Chart.js bar charts showing the percent change in test scores for all states by gender 
    * math.html - National Math Scores Data Table. Uses jquery 
    * read.html - National Reading Scoes Data Table. Uses jquery
    * index.html - Metadata tables showing boys vs girls test scores for each subject 
* Flask App (app.py)  
    * routes to call data and html files 


## Source Data 

* Math URLS - 4th Grade Boys & Girls Math Scores from 2009 and 2017
National Mean https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=mathematics&grade=4&subscale=MRPCM&variable=GENDER&jurisdiction=NT,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

* Reading URLS - 4th Grade Boys & Girls Reading Scores from 2009 and 2017
National Mean https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=sigacrossyear&subject=reading&grade=4&subscale=RRPCM&variable=GENDER&jurisdiction=NT,AL,AZ,AK,AR,CA,CO,CT,DE,DC,FL,GA,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,RI,SC,SD,TN,TX,UT,VT,VA,WA,WV,WI,WY&stattype=MN:MN&Year=2017,2009

### API URL LEGEND
    baseURL = https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?
    type=sigacrossyear (difference in test scores between 2009 & 2017)
    &subject=reading
    &subject=mathematics
    &grade=4
    &subscale=RRPCM (reading)
    &subscale=MWPCM (math)
    &variable=GENDER
    &jurisdiction=NT (National); &jurisdiction=NP (National public); &jurisdiction=NR (National private); (add states after juridicition)
    &stattype=MN:MN (Mean)
    &Year=2009, 2017
    Data cleaned using Jupyter Notebook Data transformed into sqlite db file using pandas in Jupyter Notebook
