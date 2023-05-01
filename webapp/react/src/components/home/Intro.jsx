import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
  return (
        <div className='section'>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                            <div className='section-h2'>
                                We develop an algorithm that can detect pneumonia from chest X-rays at a level exceeding practicing radiologists.
                            </div>
                            <div className='section-p'>
                            Chest X-rays are currently the best available method for diagnosing pneumonia, playing a crucial role in clinical care and epidemiological studies. Pneumonia is responsible for more than 1 million hospitalizations and 50,000 deaths per year in the US alone.
                            </div>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <img style={{width: '100%'}} src='/home/chest-example.png'/>
                        </Grid>
                    </Grid>
                </div>
            
            </div>
  )
}
