import React from 'react'
import Grid from '@mui/material/Grid';

export default function Intro() {
    return (
        <div className='section-brown'>
            <div className='section'>
                <div>
                    <Grid container spacing={5}>
                        
                        <Grid item xs={12} md={7}  display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <img style={{width: '70%'}} src='/results/Blank 4 Grids Collage.png'/>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <div className='section-h2'>
                            Classification Results

                            </div>
                            <div className='section-p'>
                            ResNet101 has shown better results among the considered CNN models for most of the cases when tested for multilabel classification of pathological classes using the CheXpert chest radiograph dataset. The sensitivities of most pathological classes were higher for MobileNet, making it more suitable for screening purposes. However, ResNet had the highest specificities for LL, PO, and At, indicating that it is a better model for the final confirmation of disease for those classes since testing positive will guarantee that the patient is diseased. In addition, the accuracies of all pathological classes among the selected CNN architectures were highest for ResNet, indicating that it is better for both screening and the final confirmation of disease. The results of the study also show that ResNet101 occupies the best ROC curves since most of those curves tend to deviate more toward the upper left corner, resulting in higher AUC scores. Therefore, considering the results in TABLE I and ROC Curves in Fig. 3, a CNN encoder with ResNet101 is used as the primary feature extractor since ResNet101 performed better in many cases, making it more powerful compared to other CNNs for the task of multilabel classification of pathological classes in chest radiographs.
                            </div>
                
                        </Grid>
                    </Grid>
                    <div style={{textAlign:'center', marginTop:30}}>
                     <img style={{width: '83%'}} src='/results/classification.png'/>
                    </div>
                   
                </div>

            </div>
        
        </div>
    )
}
