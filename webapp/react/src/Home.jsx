import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Intro from "./components/home/Intro";
import Overview from "./components/home/Overview";
import Dataset from "./components/home/Dataset";
import Importance from "./components/home/Importance";
import Model from "./components/home/Model";
class Home extends StreamlitComponentBase {
    render = () => {
        return  (
        <div>
            <Header title="ChestXpert: Revolutionize Chest X-ray Report Generation with ChestXpert" subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."/>
            <Intro/>
            <Overview/>
            <Model/>
            <Dataset/>
            <Importance/>
            <Footer/>
        </div>
        )
    }
}

export default withStreamlitConnection(Home);
