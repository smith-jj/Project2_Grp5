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
def male_scores(states):
    """Return Math test scores for 2009 and 2017 and percent change"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        NationalScores.start_year,
        NationalScores.end_year,
        NationalScores.subject,
        NationalScores.grade,
        NationalScores.state,
        NationalScores.gender,
        NationalScores.avg_2009_math,
        NationalScores.avg_2017_math,
        NationalScores.avg_math_perchg,
    ]

    results = db.session.query(*sel).filter(NationalScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    math = {}
    for result in results:
        NationalScores["start_year"] = result[0]
        NationalScores["end_year"] = result[1]
        NationalScores["subject"] = result[2]
        NationalScores["grade"] = result[3]
        NationalScores["avg_2009_math"] = result[4]
        NationalScores["avg_2017_math"] = result[5]
        NationalScores["avg_math_perchg"] = result[6]

    print(math)
    return jsonify(sample_metadata)

    # Return Jsonified data ()


@app.route("/read/<states>")
def male_scores(states):
    """Return Read test scores for 2009 and 2017 and percent change"""

    # perform the sql query for read test scores comparison
    # avg_2009_read, avg_2017_read, avg_read_perchg
    sel = [
        NationalScores.start_year,
        NationalScores.end_year,
        NationalScores.subject,
        NationalScores.grade,
        NationalScores.state,
        NationalScores.gender,
        NationalScores.avg_2009_read,
        NationalScores.avg_2017_read,
        NationalScores.avg_read_perchg,
    ]

    results = db.session.query(*sel).filter(NationalScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    math = {}
    for result in results:
        NationalScores["start_year"] = result[0]
        NationalScores["end_year"] = result[1]
        NationalScores["subject"] = result[2]
        NationalScores["grade"] = result[3]
        NationalScores["avg_2009_read"] = result[4]
        NationalScores["avg_2017_read"] = result[5]
        NationalScores["avg_read_perchg"] = result[6]

    print(math)
    return jsonify(sample_metadata)

if __name__ == "__main__":
    app.run()