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
                            Survey Results

                            </div>
                            <div className='section-p'>
                            To assess the accuracy of our medical image captioning framework, we conducted a survey involving two radiologists, three doctors, and five medical interns. The participants were shown eight chest x-ray images, along with their corresponding generated reports. They were then asked to rate the accuracy of each generated report on a scale of 1 to 10.
                                The results of the survey were promising, with all participants rating the accuracy of the generated reports as greater than 7.5 out of 10. These high ratings demonstrate the effectiveness of our framework in accurately generating medical reports based on chest x-ray images.Furthermore, we conducted a statistical analysis of the survey results, which is presented in Chart 1. Overall, the survey results provide strong evidence of the accuracy and effectiveness of our medical image captioning framework. These findings suggest that our framework has the potential to improve the efficiency and accuracy of medical reporting, which can ultimately lead to improved patient care.
                            </div>
                
                        </Grid>
                        <Grid item xs={12} md={5} display={'flex'}>
                            <img style={{width: '100%'}} src='/results/Generated Report Correctness (1).svg'/>
                        </Grid>
                    </Grid>
                </div>

            </div>
            <div className='section'>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={7}>
                            <div className='section-p'>
                            In addition to evaluating the accuracy of the generated reports, we also conducted a survey to assess the explainability of our framework. The survey involved 2 radiologists, 3 doctors, and 5 medical interns, who were asked to rate the relevance of each word in the generated reports based on their attention maps. Attention maps are a visualization tool used to understand how the model attends to different parts of the input image while generating the report.
</div>

<div className='section-p'>
To conduct the survey, we used 8 chest X-ray images and their corresponding attention maps. Participants were asked to rate the relevance of each word in the generated report with their corresponding attention map on a scale of 1 to 10. The results showed that all participants found the attention maps helpful in understanding the generation process and rated the relevance of each word with an average score between 5 to 8.
</div>

<div className='section-p'>
These results suggest that our framework not only generates accurate medical reports but also provides meaningful explanations of the generation process. The attention maps help medical professionals to understand how the model generates each word in the report and what parts of the input image it focuses on while generating each word. Overall, our framework has the potential to improve the transparency and interpretability of medical image captioning systems, which is crucial for ensuring patient safety and building trust among medical professionals.
</div>
                
                        </Grid>
                        <Grid item xs={12} md={5} display={'flex'}>
                            <img style={{width: '100%'}} src='/results/Attention Map Correctness.svg'/>
                        </Grid>
                    </Grid>
                </div>

            </div>
        </div>
    )
}
