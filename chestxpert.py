import streamlit as st
from streamlit_option_menu import option_menu
from webapp.streamlit import utils
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
    # Load models
    transformer, tokenizer = utils.load_model()
    cxr_validator_model = utils.load_validator()
    encoder_model = utils.load_encoder()

    st.session_state['tokenizer'] = tokenizer
    st.session_state['transformer'] = transformer
    st.session_state['cxr_validator_model'] = cxr_validator_model
    st.session_state['encoder_model'] = encoder_model

    if 'options' not in st.session_state:
        st.session_state['options'] = 'Sampling'
    if 'seed' not in st.session_state:
        st.session_state['seed'] = 42
    if 'temperature' not in st.session_state:
        st.session_state['temperature'] = 1.
    if 'top_k' not in st.session_state:
        st.session_state['top_k'] = 6
    if 'top_p' not in st.session_state:
        st.session_state['top_p'] = 1.
    if 'attention_head' not in st.session_state:
        st.session_state['attention_head'] = -1
    if 'home_return' not in st.session_state:
        st.session_state['home_return'] = None
    if 'home_clicked' not in st.session_state:
        st.session_state['home_clicked'] = False

    default_index = 0
    if st.session_state.home_return == "ChestXpert":
        default_index = 4
    elif st.session_state.home_return == "User Manual":
        default_index = 3

    # Sidebar
    with st.sidebar:
        selected = option_menu('Main Menu',
                               ["Home", 'Results', 'Usability', 'User Manual', 'ChestXpert', 'Configuration', 'Contact Us'],
                               icons=['house', 'bar-chart', 'people', 'map', 'file-earmark-medical', 'gear', 'telephone'], menu_icon="cast", default_index=default_index,
                               styles={
                                   "container": {"padding": "0!important", "background-color": "#c52a2500"},
                                   "menu-title": {"font-family": ['Muli', 'Helvetica', 'Arial', 'sans-serif'], "font-size": "25px"},
                                   "icon": {"font-size": "20px"},
                                   "nav-link": {"font-family": ['Muli', 'Helvetica', 'Arial', 'sans-serif'], "font-size": "20px"},
                                   "nav-link-selected": {"background-color": "#c52a25"},
                               }
                           )

    if st.session_state.home_clicked:
        selected = st.session_state.home_return
        st.session_state.home_clicked = False
        st.session_state.home_return = None


    if selected != "Configuration":
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
                                    border: 2px solid #8a191d;
                                    border-radius: 10px;
                                    color: #8a191d;
                                    background-color: #FFFFFFC5;
                           }
                           p { 
                                font-size: calc(1rem + .4vw)!important;
                                font-weight: 600!important;
                           }
                    </style>
                    """, unsafe_allow_html=True)
    else:
        st.markdown("""
                    <style>
                        p { 
                                font-size: calc(1rem + .4vw)!important;
                                font-weight: 600!important;
                        }
                        .st-af {
                                font-size: 1.2rem!important;
                        }
                        .StyledThumbValue {
                                font-size: 1rem!important;
                        }
                        [data-testid="stTickBarMin"] {
                                font-size: 1rem!important;
                        }
                        [data-testid="stTickBarMax"] {
                                font-size: 1rem!important;
                        }
                        [data-testid="stMarkdownContainer"] {
                                font-size: 1.3rem!important;
                        }
                        footer {
                                display: none;
                        }
                        header {
                                visibility: hidden !important;
                        }
                    </style>
                    """, unsafe_allow_html=True)

    if selected == "Home":
        home_return = page_names_to_funcs[selected]()
        if home_return:
            print("Inside If")
            st.session_state.home_return = home_return
            st.session_state.home_clicked = True
            st.experimental_rerun()
    else:
        page_names_to_funcs[selected]()

# Main function call
if __name__ == '__main__':
    main()
