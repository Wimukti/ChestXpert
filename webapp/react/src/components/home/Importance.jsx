import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
  return (
    <div  style={{background:'#f5f5f5'}}>
    <div className='section section-brown'>
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7} >
                    <div className='section-h3'>
                        With approximately 2 billion procedures per year, chest X-rays are the most common imaging examination tool used in practice, critical for screening, diagnosis, and management of diseases including pneumonia. However, an estimated two thirds of the global population lacks access to radiology diagnostics. With automation at the level of experts, we hope that this technology can improve healthcare delivery and increase access to medical imaging expertise in parts of the world where access to skilled radiologists is limited.
                    </div>
                </Grid>
                
            </Grid>
        </div>
    
    </div>
    </div>
  )
}
