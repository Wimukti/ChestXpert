import json
import streamlit.components.v1 as components

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# React Component for Results
_results_page = components.declare_component(
    name="results_page",
    url=config['baseUrl'] + "/results"
)

# Function to render React Component
def results():
    return _results_page()