import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/NationalReportCard.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
NationalScores = Base.classes.FILENAME
PrivateScores = Base.classes.FILENAME
PublicScores = Base.classes.FILENAME


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/years")
def years():
    """Return National Scores data"""

    # Use Pandas to perform the sql query of scores for Male and Females 2009 & 2017

    # Return Jsonified data ()


print(national)
return jsonify(national)

@app.route("/national")
def national(years):
    """Return National Scores data"""

    # Use Pandas to perform the sql query


    # Return Jsonified data ()

print(national)
return jsonify(national)


@app.route("/public")
def public(years):
    """Return Public Scores data."""

    # Use Pandas to perform the sql query

    # Return Jsonified data ()

print(public)
return jsonify(public)

@app.route("/private")
def private(years):
    """Return Public Scores data."""

    # Use Pandas to perform the sql query

    # Return Jsonified data ()
print(private)
return jsonify(private)



if __name__ == "__main__":
    app.run()
