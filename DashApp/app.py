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
NationalScores = Base.classes.NationalScores


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/states")
def states():
    """Return list of states"""

    # Use Pandas to perform the sql query of states
    # Use Pandas to perform the sql query
    stmt = db.session.query(states).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

    # Return Jsonified data ()

@app.route("/start_year")
def male_scores(states):
    """Return Math & Readingtest scores from 2009"""

    # perform the sql query for test scores from 2009


    # Return Jsonified data ()


@app.route("/end_eand")
def end_year(states):
    """Return Math & Reading test scores from 2017"""

    # perform the sql query for test scores from 2017

    # Return Jsonified data ()






if __name__ == "__main__":
    app.run()
