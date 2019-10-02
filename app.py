import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objs as go
import dash_core_components as dcc

dcc.Dropdown(
    options=[
        {'label': '2009', 'value': '2009'},
        {'label': '2017', 'value': '2017'}
    ],
    value='MTL'
)

if __name__ == '__main__':
    app.run_server(debug=True)

