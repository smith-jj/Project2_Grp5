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

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/(DATABASEFILE).sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
MaleMathScores = Base.classes.MaleMathScores
FemaleMathScores = Base.classes.FemaleMathScores
MaleReadingScores = Base.classes.MaleReadingScores
FemaleReadingScores = Base.classes.FemaleReadingScores


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

    # Return a Jsonified list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

@app.route("/boy_math/<state>")
def boy_math_scores(state):
    """Return Boy's Math Scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        MaleMathScores.state,
        MaleMathScores.avg_2009_mathScores,
        MaleMathScores.avg_2017_mathScores,
        MaleMathScores.mathScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(MaleMathScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    boy_math_scores = {}
    for result in results:
        mathScores["state"] = result[0]
        mathScores["avg_2009_mathScores"] = result[1]
        mathScores["avg_2017_mathScores"] = result[2]
        mathScores["mathScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(boy_math_scores)
    return jsonify(boy_math_scores)


@app.route("/girl_math/<state>")
def girl_math_scores(state):
    """Return Girl's Math scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        FemaleMathScores.state,
        FemaleMathScores.avg_2009_mathScores,
        FemaleMathScores.avg_2017_mathScores,
        FemaleMathScores.mathScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(FemaleMathScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    girl_math_scores = {}
    for result in results:
        mathScores["state"] = result[0]
        mathScores["avg_2009_mathScores"] = result[1]
        mathScores["avg_2017_mathScores"] = result[2]
        mathScores["mathScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(girl_math_scores)
    return jsonify(girl_math_scores)


@app.route("/boy_reading/<state>")
def boy_reading_scores(state):
    """Return Boy's Reading scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        MaleReadingScores.state,
        MaleReadingScores.avg_2009_readingScores,
        MaleReadingScores.avg_2017_readingScores,
        MaleReadingScores.readingScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(MaleReadingScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    boy_read_scores = {}
    for result in results:
        MaleReadingScores["state"] = result[0]
        MaleReadingScores["avg_2009_readingScores"] = result[1]
        MaleReadingScores["avg_2017_readingScores"] = result[2]
        MaleReadingScores["readingScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(boy_reading_scores)
    return jsonify(boy_reading_scores)


@app.route("/girl_reading/<state>")
def girl_reading_scores(state):
    """Return Girl's Reading scores"""

    # perform the sql query for math test scores comparison
    # avg_2009_math, avg_2017_math, avg_math_perchg
    sel = [
        FemaleReadingScores.state,
        FemaleReadingScores.avg_2009_readingScores,
        FemaleReadingScores.avg_2017_readingScores,
        FemaleReadingScores.readingScores_precentChange,
    ]

    results = db.session.query(
        *sel).filter(FemaleReadingScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    boy_read_scores = {}
    for result in results:
        FemaleReadingScores["state"] = result[0]
        FemaleReadingScores["avg_2009_readingScores"] = result[1]
        FemaleReadingScores["avg_2017_readingScores"] = result[2]
        FemaleReadingScores["readingScores_precentChange"] = result[3]

   # Return Jsonified data ()
    print(girl_reading_scores)
    return jsonify(girl_reading_scores)

if __name__ == "__main__":
    app.run()

