import streamlit as st
from webapp.streamlit.app import app
from webapp.streamlit.home import home_page
from webapp.streamlit.results import results
from webapp.streamlit.usability_study import usability_study
from webapp.streamlit.user_manual import user_manual

# Set page config
st.set_page_config(layout="wide", page_title="ChestXpert: Chest X-Ray Report Generation",
                   page_icon="assets/ChestXpert icon.png")
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
    }

    st.sidebar.title("Navigation")
    demo_name = st.sidebar.selectbox("", page_names_to_funcs.keys())
    page_names_to_funcs[demo_name]()


# Main function call
if __name__ == '__main__':
    main()
