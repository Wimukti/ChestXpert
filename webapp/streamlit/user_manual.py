import json
import streamlit.components.v1 as components

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# React Component for User Manual Page
_user_manual_page = components.declare_component(
    name="user_manual_page",
    url=config['baseUrl'] + "/user-manual"
)

# Function to render React Component
def user_manual():
    return _user_manual_page()