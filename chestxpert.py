import streamlit as st
from webapp.streamlit.app import app
from webapp.streamlit.home import home_page
from webapp.streamlit.results import results
from webapp.streamlit.usability_study import usability_study
from webapp.streamlit.user_manual import user_manual

# Set page config
st.set_page_config(layout="wide", page_title="ChestXpert: Chest X-Ray Report Generation", page_icon="assets/ChestXpert icon.png")
st.markdown("""
        <style>
               .block-container {
                    padding: 0rem;
                }
               header {
                    visibility: hidden !important;
               }
               iframe {
                    height: 100vh;
               }
               [data-testid="stVerticalBlock"]{
                    gap: 0rem;
               }
               @media (max-width: 720px) {
                    [data-testid="stFileUploader"]{
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }
                    #upload-chest-x-ray-image {
                        padding-left: 2rem;
                        padding-right: 2rem;
                        padding-top: 2rem;
                    }
               }
               @media (min-width: 720px) {
                    [data-testid="stFileUploader"]{
                        padding-left: 10rem;
                        padding-right: 10rem;
                        padding-top: 2rem;
                    }
                    #upload-chest-x-ray-image {
                        padding-left: 10rem;
                        padding-right: 10rem;
                    }
               }
               footer {
                    visibility: hidden;
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