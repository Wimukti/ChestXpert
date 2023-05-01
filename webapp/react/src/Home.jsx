import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Intro from "./components/home/Intro";
import OurModel from "./components/home/OurModel";
import Dataset from "./components/home/Dataset";
import Importance from "./components/home/Importance";

class Home extends StreamlitComponentBase {
    render = () => {
        return  (
        <div>
            <Header title="CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning" subtitle="Pranav Rajpurkar*, Jeremy Irvin*, Kaylie Zhu, Brandon Yang, Hershel Mehta, Tony Duan, Daisy Ding, Aarti Bagul, Curtis Langlotz, Katie Shpanskaya, Matthew P. Lungren, Andrew Y. Ng"/>
            <Intro/>
            <OurModel/>
            <Dataset/>
            <Importance/>
            <Footer/>
        </div>
        )
    }
}

export default withStreamlitConnection(Home);
