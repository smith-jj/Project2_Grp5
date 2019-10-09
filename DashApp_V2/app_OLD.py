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
mathScores = Base.classes.mathScores


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
        mathScores.stateAbv,
        mathScores.scores2003,
        mathScores.scores2005,
        mathScores.scores2007,
        mathScores.scores2009,
        mathScores.scores2011,
    ]

    results = db.session.query(*sel).filter(mathScores.state == state).all()

    # Create a dictionary entry for each row of math data information
    math_scores = {}
    for result in results:
        mathScores["stateAbv"] = result[0]
        mathScores["scores2003"] = result[1]
        mathScores["scores2005"] = result[2]
        mathScores["scores2007"] = result[3]
        mathScores["scores2009"] = result[2]
        mathScores["scores2011"] = result[3]

    print(math_scores)
    return jsonify(math_scores)

    # Return Jsonified data ()



if __name__ == "__main__":
    app.run()

