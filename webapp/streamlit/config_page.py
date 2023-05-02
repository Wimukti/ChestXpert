import json
import streamlit.components.v1 as components
import streamlit as st

# Read config file
with open('config.json') as config_file:
    config = json.load(config_file)

# React Component for Results
_config_page = components.declare_component(
    name="config_page",
    url=config['baseUrl'] + "/config"
)
def vertical_space():
    st.markdown("<br>", unsafe_allow_html=True)

# Function to render React Component
def config_page():
    st.title('Advanced Configuration')

    col1, col2 = st.columns(2,gap='large')
    with col1:
        options = st.selectbox('Generation Method', ('Sampling', 'Greedy'))
        st.write("---")
        seed = st.number_input('Sampling Seed:', value=42)
        st.write("---")
        temperature = st.number_input('Temperature', value=1.)

    with col2:
        top_k = st.slider('Top K Value', min_value=0, max_value=st.session_state.tokenizer.get_vocab_size(), value=6, step=1)
        st.write("---")
        top_p = st.slider('Top P Value', min_value=0., max_value=1., value=1., step=0.01)
        st.write("---")
        attention_head = st.slider('Attention Heads', min_value=-1, max_value=7, value=-1, step=1)

    # Save config in session state
    st.session_state['options'] = options
    st.session_state['seed'] = seed
    st.session_state['temperature'] = temperature
    st.session_state['top_k'] = top_k
    st.session_state['top_p'] = top_p
    st.session_state['attention_head'] = attention_head

