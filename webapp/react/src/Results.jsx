import {
    StreamlitComponentBase,
    withStreamlitConnection,
} from "streamlit-component-lib"
import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Survey from "./components/results/Survey";
import Classification from "./components/results/Classification";

import ReportGeneration from "./components/results/ReportGeneration";
class Results extends StreamlitComponentBase {
    theme = createTheme();
    render = () => {
        return <div>
            <Header title="ChestXpert: Results" subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."/>
                <Survey></Survey>
                <Classification/>
                <ReportGeneration/>
            <Footer/>
        </div>
    }
}

export default withStreamlitConnection(Results);
