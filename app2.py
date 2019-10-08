import plotly.graph_objects as go

import pandas as pd
import os

import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objs as go

csv_file = "data/NationalScores.csv"
df = pd.read_csv(csv_file, encoding ="ISO-8859-1")

for col in df.columns:
    df[col] = df[col].astype(str)

df['text'] = df['state'] + '<br>' + \
    'Year: ' + df['start_year'] + ' Math: ' + df['avg_2009_math'] + '<br>' + \
    'Reading: ' + df['avg_2009_read']

fig = go.Figure(data=go.Choropleth(
    locations=df['state'],
    z=df['avg_math_perchg'].astype(float),
    locationmode='USA-states',
    colorscale='Blues',
    autocolorscale=False,
    text=df['text'], # hover text
    marker_line_color='white', # line markers between states
    colorbar_title="Average Math Difference"
))

fig.update_layout(
    title_text='National Report Card',
    geo = dict(
        scope='usa',
        projection=go.layout.geo.Projection(type = 'albers usa'),
        showlakes=True, # lakes
        lakecolor='rgb(255, 255, 255)'),
)

fig.show()