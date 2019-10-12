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
    ]

    results = db.session.query(
        *sel).filter(male_math.state == state).all()

    # Create a dictionary entry for each row of math data information
    boy_math_scores = {}
    for result in results:
        boy_math_scores["state"] = result[0]
        boy_math_scores["avg_2009_mathScores"] = result[1]
        boy_math_scores["avg_2017_mathScores"] = result[2]

   # Return Jsonified data ()
    print(boy_math_scores)
    return jsonify(boy_math_scores)


@app.route("/boymathgap")
def boymath_gap():
    """Return Gap in Boy's Math Scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        male_math.state,
        male_math.mathScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(male_math.mathScores_precentChange).all()

    # Create a dictionary entry for each row of math data information
    boymath_gap = {}
    for result in results:
        boy_math_scores["state"] = result[0]
        boy_math_scores["mathScores_precentChange"] = result[1]

   # Return Jsonified data ()
    print(boymath_gap)
    return jsonify(boymath_gap)


@app.route("/girlmath/<state>")
def girl_math_scores(state):
    """Return Girls's Math Scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        female_math.state,
        female_math.avg_2009_mathScores,
        female_math.avg_2017_mathScores,
    ]

    results = db.session.query(
        *sel).filter(female_math.state == state).all()

    # Create a dictionary entry for each row of math data information
    girl_math_scores = {}
    for result in results:
        girl_math_scores["state"] = result[0]
        girl_math_scores["avg_2009_mathScores"] = result[1]
        girl_math_scores["avg_2017_mathScores"] = result[2]

   # Return Jsonified data ()
    print(girl_math_scores)
    return jsonify(girl_math_scores)


@app.route("/girlmathgap")
def girlmath_gap():
    """Return Gap in Girls's Math Scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        female_math.state,
        female_math.mathScores_precentChange,
    ]

    results = db.session.query(
        *sel).all()

    # Create a dictionary entry for each row of math data information
    girlmath_gap = {}
    for result in results:
        girl_math_scores["state"] = result[0]
        girl_math_scores["mathScores_precentChange"] = result[1]

   # Return Jsonified data ()
    print(girlmath_gap)
    return jsonify(girlmath_gap)

@app.route("/boyreading/<state>")
def boy_reading_scores(state):
    """Return Boy's Reading Scores"""

    # perform the sql query for reading test scores comparison
    # avg_2009_reading, avg_2017_reading, avg_reading_perchg
    sel = [
        male_reading.state,
        male_reading.avg_2009_readingScores,
        male_reading.avg_2017_readingScores,
    ]

    results = db.session.query(
        *sel).filter(male_reading.state == state).all()

    # Create a dictionary entry for each row of math data information
    boy_reading_scores = {}
    for result in results:
        boy_reading_scores["state"] = result[0]
        boy_reading_scores["avg_2009_readingScores"] = result[1]
        boy_reading_scores["avg_2017_readingScores"] = result[2]

   # Return Jsonified data ()
    print(boy_reading_scores)
    return jsonify(boy_reading_scores)


@app.route("/boyreadinggap")
def boyreading_gap():
    """Return Gap in Boy's Reading Scores"""

    # perform the sql query for reading test scores comparison
    # avg_2009_reading, avg_2017_reading, avg_reading_perchg
    sel = [
        male_reading.state,
        male_reading.readingScores_precentChange,
    ]

    results = db.session.query(
        *sel).all()

    # Create a dictionary entry for each row of math data information
    boyreading_gap = {}
    for result in results:
        boy_reading_scores["state"] = result[0]
        boy_reading_scores["readingScores_precentChange"] = result[1]

   # Return Jsonified data ()
    print(boyreading_gap)
    return jsonify(boyreading_gap)


@app.route("/girlreading/<state>")
def girl_reading_scores(state):
    """Return Girls's Reading Scores"""

    # perform the sql query for reading test scores comparison
    # avg_2009_reading, avg_2017_reading, avg_reading_perchg
    sel = [
        female_reading.state,
        female_reading.avg_2009_readingScores,
        female_reading.avg_2017_readingScores,
    ]

    results = db.session.query(
        *sel).filter(female_reading.state == state).all()

    # Create a dictionary entry for each row of math data information
    girl_reading_scores = {}
    for result in results:
        girl_reading_scores["state"] = result[0]
        girl_reading_scores["avg_2009_readingScores"] = result[1]
        girl_reading_scores["avg_2017_readingScores"] = result[2]

   # Return Jsonified data ()
    print(girl_reading_scores)
    return jsonify(girl_reading_scores)


@app.route("/girlreadinggap")
def girlreading_gap():
    """Return Gap in Girls's Reading Scores"""

    # perform the sql query for reading test scores comparison
    # avg_2009_reading, avg_2017_reading, avg_reading_perchg
    sel = [
        female_reading.state,
        female_reading.readingScores_precentChange,
    ]

    results = db.session.query(
        *sel).all()

    # Create a dictionary entry for each row of math data information
    girlreading_gap = {}
    for result in results:
        girl_reading_scores["state"] = result[0]
        girl_reading_scores["avg_2009_readingScores"] = result[1]
        girl_reading_scores["avg_2017_readingScores"] = result[2]

   # Return Jsonified data ()
    print(girlreading_gap)
    return jsonify(girlreading_gap)

if __name__ == "__main__":
    app.run(debug=True)
