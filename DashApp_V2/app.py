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


if __name__ == "__main__":
    app.run(debug=True)