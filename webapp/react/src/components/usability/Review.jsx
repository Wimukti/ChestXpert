import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
    return (
        <div className='section-brown'>
            <div className='section'>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={7} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                        <img style={{width: '80%'}} src='/usability/Review.png'/>
                        </Grid>
                        <Grid item xs={12} md={5}>
                        <div className='section-p'>
                            The results of our usability study have shown that our framework is useful not only for radiologists and doctors but also for medical students who are learning to examine x-rays. With the help of our framework, medical students can learn to analyze x-rays more effectively, identify important factors and get feedback on their interpretations. Additionally, our framework can be used by radiologists and doctors to double-check their reports, ensuring that no important factors have been overlooked. Our study found that users found the interface to be user-friendly and easy to navigate, making it accessible to individuals with different levels of experience. Overall, our framework has the potential to improve the accuracy and efficiency of x-ray analysis for medical professionals at all levels.


                            </div>
                         
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}
