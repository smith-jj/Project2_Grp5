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

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/db.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
male_math = Base.classes.male_math
female_math = Base.classes.female_math
male_reading = Base.classes.male_reading
female_reading = Base.classes.female_reading


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/chart")
def chart():
    """Return the homepage."""
    return render_template("chart.html")


@app.route("/mathtable")
def mathtable():
    """Return the homepage."""
    return render_template("math.html")


@app.route("/readtable")
def readtable():
    """Return the homepage."""
    return render_template("read.html")


@app.route("/state")
def state():
    """Return a list of states."""

    stmt = db.session.query(female_math).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    state_list = list(df.state)

    # Return a list of the column states
    return jsonify(state_list)


@app.route("/boymath/<state>")
def boy_math_scores(state):
    """Return Boy's Math Scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        male_math.state,
        male_math.avg_2009_mathScores,
        male_math.avg_2017_mathScores,
        male_math.mathScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(male_math.state == state).all()

    # Create a dictionary entry for each row of math data information
    boy_math_scores = {}
    for result in results:
        boy_math_scores["state"] = result[0]
        boy_math_scores["avg_2009_mathScores"] = result[1]
        boy_math_scores["avg_2017_mathScores"] = result[2]
        boy_math_scores["mathScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(boy_math_scores)
    return jsonify(boy_math_scores)


@app.route("/girlmath/<state>")
def girl_math_scores(state):
    """Return Girls's Math Scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        female_math.state,
        female_math.avg_2009_mathScores,
        female_math.avg_2017_mathScores,
        female_math.mathScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(female_math.state == state).all()

    # Create a dictionary entry for each row of math data information
    girl_math_scores = {}
    for result in results:
        girl_math_scores["state"] = result[0]
        girl_math_scores["avg_2009_mathScores"] = result[1]
        girl_math_scores["avg_2017_mathScores"] = result[2]
        girl_math_scores["mathScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(girl_math_scores)
    return jsonify(girl_math_scores)


@app.route("/boyreading/<state>")
def boy_reading_scores(state):
    """Return Boy's Reading Scores"""

    # perform the sql query for reading test scores comparison
    # avg_2009_reading, avg_2017_reading, avg_reading_perchg
    sel = [
        male_reading.state,
        male_reading.avg_2009_readingScores,
        male_reading.avg_2017_readingScores,
        male_reading.readingScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(male_reading.state == state).all()

    # Create a dictionary entry for each row of math data information
    boy_reading_scores = {}
    for result in results:
        boy_reading_scores["state"] = result[0]
        boy_reading_scores["avg_2009_readingScores"] = result[1]
        boy_reading_scores["avg_2017_readingScores"] = result[2]
        boy_reading_scores["readingScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(boy_reading_scores)
    return jsonify(boy_reading_scores)


@app.route("/girlreading/<state>")
def girl_reading_scores(state):
    """Return Girls's Reading Scores"""

    # perform the sql query for reading test scores comparison
    # avg_2009_reading, avg_2017_reading, avg_reading_perchg
    sel = [
        female_reading.state,
        female_reading.avg_2009_readingScores,
        female_reading.avg_2017_readingScores,
        female_reading.readingScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(female_reading.state == state).all()

    # Create a dictionary entry for each row of math data information
    girl_reading_scores = {}
    for result in results:
        girl_reading_scores["state"] = result[0]
        girl_reading_scores["avg_2009_readingScores"] = result[1]
        girl_reading_scores["avg_2017_readingScores"] = result[2]
        girl_reading_scores["readingScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(girl_reading_scores)
    return jsonify(girl_reading_scores)


if __name__ == "__main__":
    app.run(debug=True)
