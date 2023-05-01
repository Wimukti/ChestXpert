import json
import streamlit.components.v1 as components

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# React Component for Home Page
_home_page = components.declare_component(
    name="home_page",
    url=config['baseUrl'] + "/home"
)

# Function to render React Component
def home_page():
    return _home_page()