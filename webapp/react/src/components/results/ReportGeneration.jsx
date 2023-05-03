import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
    return (
        <div className='section-white'>
            <div className='section'>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={12}>
                            <div className='section-h2'>
                            Report Generation Results

                            </div>
                            <div className='section-p'>
                            The report generation part of the project was able to achieve the following scores using ResNet101: BLUE-1 score of 0.296, Meteor score of 0.128, Rouge score of 0.335, and Cider score of 1.150. These scores indicate the quality of the generated reports, with higher scores indicating better performance. The achieved scores suggest that the ResNet101 model performed well in generating reports, with good performance across multiple evaluation metrics. This is a promising result for the report generation part of the project, indicating that the generated reports are of high quality and can potentially be used in medical settings for providing accurate and detailed information about patient conditions.

</div>
                
                        </Grid>
                       
                    </Grid>
                </div>

            </div>
        </div>
    )
}
