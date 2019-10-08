import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import sqlite3 as sq

conn = sq.connect('NationalReportCard.sqlite')

Data = pd.read_csv('data/NationalScores.csv')

Data.to_sql(name='NationalReportCard', con=conn,
            if_exists='append', index=False)

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


@app.route("/state")
def state():
    """Return list of states"""

    # Use Pandas to perform the sql query of states
    # Use Pandas to perform the sql query
    stmt = db.session.query(state).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

    # Return Jsonified data ()

@app.route("/math/<state>")
def math_scores(state):
    """Return Math test scores for 2009 and 2017"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        NationalScores.state,
        NationalScores.gender,
        NationalScores.avg_2009_math,
        NationalScores.avg_2017_math,
    ]

    results = db.session.query(*sel).filter(NationalScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    math_scores = {}
    for result in results:
        NationalScores["state"] = result[0]
        NationalScores["gender"] = result[1]
        NationalScores["avg_2009_math"] = result[2]
        NationalScores["avg_2017_math"] = result[3]

    print(math_scores)
    return jsonify(math_scores)

    # Return Jsonified data ()


@app.route("/read/<state>")
def read_scores(state):
    """Return Read test scores for 2009 and 2017"""

    # perform the sql query for read test scores comparison
    # avg_2009_read, avg_2017_read, avg_read_perchg
    sel = [
        NationalScores.state,
        NationalScores.gender,
        NationalScores.avg_2009_read,
        NationalScores.avg_2017_read,
    ]

    results = db.session.query(*sel).filter(NationalScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    read_scores = {}
    for result in results:
        NationalScores["state"] = result[0]
        NationalScores["gender"] = result[1]
        NationalScores["avg_2009_read"] = result[5]
        NationalScores["avg_2017_read"] = result[6]

    print(read_scores)
    return jsonify(read_scores)


@app.route("/combine/<state>")
def combine_scores(state):
    """Return Math and Reading test scores for 2009 and 2017"""

    # perform the sql query for read test scores comparison
    # avg_2009_math, avg_2017_math, avg_2009_read, avg_2017_read
    sel = [
        NationalScores.state,
        NationalScores.gender,
        NationalScores.avg_2009_math,
        NationalScores.avg_2017_math,
        NationalScores.avg_2009_read,
        NationalScores.avg_2017_read,
    ]

    results = db.session.query(*sel).filter(NationalScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    combine_scores = {}
    for result in results:
        NationalScores["avg_2009_math"] = result[0]
        NationalScores["avg_2017_math"] = result[1]
        NationalScores["avg_2009_read"] = result[2]
        NationalScores["avg_2017_read"] = result[3]

    print(combine_scores)
    return jsonify(read_scores)
if __name__ == "__main__":
    app.run()
