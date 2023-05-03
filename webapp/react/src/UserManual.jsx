import {
    StreamlitComponentBase,
    withStreamlitConnection,
} from "streamlit-component-lib"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

class UserManual extends StreamlitComponentBase {
    theme = createTheme();
    render = () => {
        return <div>
            <Header title="ChestXpert: Results"
                        subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."/>
                <Footer/>
        </div>
    }
}

export default withStreamlitConnection(UserManual);
