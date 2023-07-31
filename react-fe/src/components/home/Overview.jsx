import React from 'react'
import Grid from '@mui/material/Grid';

export default function Overview() {
    return (
        <div className='section-brown'>
            <div className='section'>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7} textAlign={'center'}>
                            <img style={{width: 300}} src='/home/Overview.png'/>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <div className='section-h2'>
                                ChestXpert - Streamlined Chest X-Ray Analysis and Reporting with Explainability
                                Techniques

                            </div>
                            <div className='section-p'>
                                With ChestXpert, analyzing chest X-rays has never been easier. Our state-of-the-art
                                framework takes in a chest X-ray as input and generates a detailed report with a few
                                simple clicks.
                            </div>

                            <div className='section-p'>
                                But ChestXpert isn't just about convenience - it's also about accuracy. Our deep
                                learning model leverages the latest Transformer technology to provide unparalleled
                                analysis of chest X-rays, detecting anomalies at a level that matches practicing
                                radiologists. And with our advanced explainability techniques, you'll get insight into
                                how our AI model makes its diagnoses.
                            </div>

                            <div className='section-p'>
                                ChestXpert is designed to streamline your workflow and save you time. Our user-friendly
                                interface allows you to easily edit your chest X-ray, rotating, zooming, and cropping as
                                needed, before generating a comprehensive report. Whether you're a busy radiologist or a
                                medical student, ChestXpert is the ideal tool for faster, more accurate diagnoses.

                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}
