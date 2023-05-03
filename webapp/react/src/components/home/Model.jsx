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
                                We develop an algorithm that can detect Chest X-ray anomalies at a level that matches
                                practicing radiologists and goes beyond by providing educational insights that help
                                medical students learn chest X-ray analysis.
                            </div>
                            <div className='section-p'>
                                At the heart of ChestXpert lies an advanced encoder-decoder deep learning model that
                                combines cutting-edge CNN and text transformer architectures. Our encoder uses Resnet101
                                - one of the newest and most powerful CNN models available - which we have found to
                                outperform other models in comparative analyses.
                            </div>
                            <div className='section-p'>
                                The decoder, on the other hand, uses text transformer technology to capture long-range
                                dependencies of Chest X-rays and generate coherent medical reports. Transformers have
                                become increasingly popular in natural language processing and even ChatGPT uses
                                transformers in its architecture. With ChestXpert, we've adapted this technology to
                                medical imaging, giving you a state-of-the-art framework for chest X-ray analysis and
                                reporting that is unparalleled in accuracy and efficiency. Whether you're a practicing
                                radiologist or a medical student, ChestXpert can help you streamline your workflow and
                                provide faster, more accurate diagnoses.
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <img style={{width: '100%'}} src='/home/Model 1.png'/>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}
