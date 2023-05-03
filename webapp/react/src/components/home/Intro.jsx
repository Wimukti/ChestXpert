import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
    return (
        <div className='section-white'>
            <div className='section'>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={7}>
                            <div className='section-h2'>
                                ChestXpert - Advanced Chest X-Ray Analysis and Reporting with Transformer Technology
                            </div>
                            <div className='section-p'>
                                Are you tired of the manual diagnosis of chest X-rays? Introducing ChestXpert - a
                                state-of-the-art framework that automates the analysis and reporting of chest X-rays.
                                Our advanced algorithm, built on the latest Transformer technology, not only detects
                                pneumonia but also generates detailed and accurate radiology reports that exceed the
                                capabilities of practicing radiologists.
                            </div>
                            <div className='section-p'>
                                With ChestXpert, you'll benefit from the latest explainability techniques that provide
                                insight into the decision-making process of our AI model. Our user-friendly interface
                                ensures easy use and integration with your medical records system, saving you time and
                                streamlining your radiology workflow. Trust ChestXpert to provide you with faster, more
                                accurate diagnoses of chest X-rays - playing a crucial role in clinical care and
                                epidemiological studies.
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <img style={{width: '100%'}} src='/home/ChestXray.png'/>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}
