import {
    StreamlitComponentBase,
    withStreamlitConnection,
} from "streamlit-component-lib"
import * as React from 'react';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

class UserManual extends StreamlitComponentBase {
    render = () => {
        return <div>
            <Header title="ChestXpert: Results"
                        subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."/>
                <Footer/>
        </div>
    }
}

export default withStreamlitConnection(UserManual);
