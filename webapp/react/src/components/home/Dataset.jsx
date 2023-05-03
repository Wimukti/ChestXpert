import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
  return (
    <div  style={{background:'#f5f5f5'}}>
        <div className='section'>
                <div>
                    <Grid container spacing={5}>
                        
                        <Grid item xs={12} md={7}>
                            <img style={{width: '100%'}} src='/home/Dataset.png'/>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <div className='section-h2'>
                                We train on MIMIC-CXR: A large publicly available dataset of chest radiographs in DICOM format with free-text radiology reports
                            </div>
                            <div className='section-p'>
                                The MIMIC-CXR dataset is a game-changer for chest X-ray report generation. With over 243,000 segmented images, it's one of the largest datasets available for this task. The dataset contains 377,110 images corresponding to 227,835 radiographic studies performed at the Beth Israel Deaconess Medical Center in Boston, MA. With MIMIC-CXR, you'll have the accuracy and scale you need to take your chest X-ray report generation to the next level. It contains,
                            </div>
                            <div className='section-p'>
                                <ul>
                                    <li>377K Chest X-Ray images</li>
                                    <li>227,835 Medical Reports</li>
                                    <li>Manually labeled to 14 categories using CheXpert Labeler.</li>
                                    <li>A total of 687 reports were reviewed by a board-certified radiologist with 8 years of experience (ML)</li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            
            </div>
            </div>
  )
}
