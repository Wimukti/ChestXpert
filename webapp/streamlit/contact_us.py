import json
import streamlit.components.v1 as components

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# React Component for Results
_contact_page = components.declare_component(
    name="contact_page",
    url=config['baseUrl'] + "/contact-us"
)

# Function to render React Component
def contact_page():
    return _contact_page()