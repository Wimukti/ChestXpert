import json
import streamlit.components.v1 as components

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# React Component for Usability Study Page
_usability_study_page = components.declare_component(
    name="usability_study_page",
    url=config['baseUrl'] + "/usability-study"
)

# Function to render React Component
def usability_study():
    return _usability_study_page()