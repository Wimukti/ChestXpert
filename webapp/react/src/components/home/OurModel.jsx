import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
  return (
    <div  style={{background:'#f5f5f5'}}>
    <div className='section section-brown'>
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} textAlign={'center'}>
                 <img style={{width: 300}} src='/home/chex-main.svg'/>
                </Grid>
                <Grid item xs={12} md={5}>
                    <div className='section-h2'>
                        Our model, CheXNet, is a 121-layer convolutional neural network that inputs a chest X-ray image and outputs the probability of pneumonia along with a heatmap localizing the areas of the image most indicative of pneumonia.
                    </div>
                    <div className='section-p'>
                        We train CheXNet on the recently released ChestX-ray14 dataset, which contains 112,120 frontal-view chest X-ray images individually labeled with up to 14 different thoracic diseases, including pneumonia. We use dense connections and batch normalization to make the optimization of such a deep network tractable.
                    </div>
                </Grid>
            </Grid>
        </div>
    
    </div>
    </div>
  )
}
