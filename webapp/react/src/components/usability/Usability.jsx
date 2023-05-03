import React from 'react'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

export default function Intro() {
    return (
        <div className='section-white'>
            <div className='section'>
                <div>
                    <Grid container spacing={5}>
                        
                        <Grid item xs={12} md={12}>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <Box sx={{width:{xs: '100%', sm: '50%'}}}>
                                    <img style={{width:'100%'}} src='/usability/System Usability Study(SUS) (1).svg'/>
                                </Box>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                           
                            <div className='section-p'>
                                
In addition to the accuracy and explainability evaluation, we also conducted a usability study to assess the user experience of our medical image captioning framework. The study involved the same 2 radiologists, 3 doctors, and 5 medical interns who participated in the previous evaluations.
</div>

<div className='section-p'>
                                
The results of the study were overwhelmingly positive, with all participants agreeing 100% that the system was easy to use, well-integrated, and they felt confident using it. Furthermore, all participants reported that they learned to use the system quickly, and would like to use it frequently in their clinical practice. None of the participants reported that the system was cumbersome, inconsistent, or required technical assistance. Additionally, none of the participants found the system to be complex.
</div>

                                <div className='section-p'>
                                The results of the usability study demonstrate that our medical image captioning framework not only provides accurate and explainable reports, but also offers a user-friendly and intuitive interface. The positive feedback from the study participants suggests that our framework has the potential to improve the efficiency and accuracy of medical reporting and could be a valuable tool for healthcare professionals.
</div>
                
                        </Grid>
                    </Grid>
                   
                </div>

            </div>
        
        </div>
    )
}
