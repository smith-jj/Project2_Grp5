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
    stmt = db.session.query(NationalScores).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[4:])

    # Return Jsonified data ()

@app.route("/math/<states>")
def math_scores(states):
    """Return Math test scores for 2009 and 2017 and percent change"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        NationalScores.start_year,
        NationalScores.end_year,
        NationalScores.state,
        NationalScores.gender,
        NationalScores.avg_2009_math,
        NationalScores.avg_2017_math,
    ]

    results = db.session.query(*sel).filter(NationalScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    math = {}
    for result in results:
        NationalScores["start_year"] = result[0]
        NationalScores["end_year"] = result[1]
        NationalScores["avg_2009_math"] = result[4]
        NationalScores["avg_2017_math"] = result[5]

    print(math_scores)
    return jsonify(math_scores)

    # Return Jsonified data ()


@app.route("/read/<states>")
def read_scores(states):
    """Return Read test scores for 2009 and 2017 and percent change"""

    # perform the sql query for read test scores comparison
    # avg_2009_read, avg_2017_read, avg_read_perchg
    sel = [
        NationalScores.start_year,
        NationalScores.end_year,
        NationalScores.state,
        NationalScores.gender,
        NationalScores.avg_2009_read,
        NationalScores.avg_2017_read,
    ]

    results = db.session.query(*sel).filter(NationalScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    reading = {}
    for result in results:
        NationalScores["start_year"] = result[0]
        NationalScores["end_year"] = result[1]
        NationalScores["avg_2009_read"] = result[4]
        NationalScores["avg_2017_read"] = result[5]

    print(read_scores)
    return jsonify(read_scores)

if __name__ == "__main__":
    app.run()
