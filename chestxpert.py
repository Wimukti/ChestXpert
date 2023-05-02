import streamlit as st
from streamlit_option_menu import option_menu

from webapp.streamlit.app import app
from webapp.streamlit.home import home_page
from webapp.streamlit.results import results
from webapp.streamlit.usability_study import usability_study
from webapp.streamlit.user_manual import user_manual
from webapp.streamlit.config_page import config_page
from webapp.streamlit.contact_us import contact_page

# Set page config
st.set_page_config(layout="wide",
                   page_title="ChestXpert: Chest X-Ray Report Generation",
                   page_icon="assets/ChestXpert icon.png",
                   initial_sidebar_state="collapsed")

st.markdown("""
                <style>
                       .block-container {
                            padding: 0rem;
                        }
                       header {
                            visibility: hidden !important;
                       }
                       [data-testid="stVerticalBlock"]{
                            gap: 0rem;
                       }
                       footer {
                            display: none;
                       }
                       [data-testid="stFileUploader"]{
                                padding-left: 10%;
                                padding-right: 10%;
                       }
                       .stSpinner {
                                padding-left: 10%;
                                padding-right: 10%;
                                padding-top: 20px;
                                padding-bottom: 20px;
                       }
                       .stProgress {
                                padding-left: 10%;
                                padding-right: 10%;
                                padding-top: 20px;
                                padding-bottom: 50px;
                       }
                       [data-testid="stMarkdownContainer"]{
                                padding-left: 10%;
                                padding-right: 10%;
                       }
                       [data-testid="collapsedControl"]{
                                border: 2px solid red;
                                border-radius: 10px;
                                color: #8a191d;
                                background-color: #FFFFFFC5;
                       }
                </style>
                """, unsafe_allow_html=True)

# Main function
def main():
    page_names_to_funcs = {
        "Home": home_page,
        "Results": results,
        "Usability": usability_study,
        "User Manual": user_manual,
        "ChestXpert": app,
        "Configuration": config_page,
        "Contact Us": contact_page
    }

    with st.sidebar:
        selected = option_menu('Main Menu',
                               ["Home", 'Results', 'Usability', 'User Manual', 'ChestXpert', 'Configuration', 'Contact Us'],
                               icons=['house', 'bar-chart', 'people', 'map', 'file-earmark-medical', 'gear', 'telephone'], menu_icon="cast", default_index=0,
                               styles={
                                   "container": {"padding": "0!important", "background-color": "#fafafa"},
                               }
                           )

    page_names_to_funcs[selected]()

# Main function call
if __name__ == '__main__':
    main()
