import React from 'react';
import './pdfStyles.css'
import Header from '../common/Header';
import Footer from '../common/Footer';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Divider} from "@mui/material";

class DataComponent extends React.Component {
    render() {
        return (
            <div className='pdfDownloader'>
                <div style={{marginBottom: 40}}>
                    <Header title="ChestXpert: PDF Report"
                            subtitle="Developed by Wimukthi Indeewara, Mahela Hennayake, Kasun Rathnayake, Sahan Samarakoon"/>
                </div>

                <div className='content'>
                    {this.props.showUserDetails}

                    {
                        this.props.showUserDetails &&
                        <div>

                            <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>
                                Patient Details:
                            </Typography>
                            <div>
                                <div>
                                    Name: {this.props.patientDetails.name}
                                </div>
                                <div>
                                    Age: {this.props.patientDetails.age} years old
                                </div>
                                <div>
                                    Sex: {this.props.patientDetails.sex}
                                </div>
                            </div>
                        </div>
                    }
                     <Divider sx={{margin: '15px auto', width: '100%'}}/>
                    <div >
                        <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600, marginBottom:'20px'}}>
                            Original X-Ray:
                        </Typography>

                        <div>
                            <img
                                style={{width: '25%'}}
                                alt="The house from the offer."
                                src={this.props.originalImg}
                            />
                        </div>
                    </div>

                    <Divider sx={{margin: '15px auto', width: '100%'}}/>

                    <div >

                        <div>
                            <div style={{marginBottom: 15}}>
                                <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>
                                    Disease Prediction:
                                </Typography>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'}
                                          justifyContent={'center'}>
                                        <div style={{display: 'flex', alignItems: 'center', height: 43}}>
                                            <div style={{width: 190}}>Predicated disease:</div>
                                            {this.props.disease}
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', height: 43}}>
                                            <div style={{width: 190}}>Prediction Accuracy:</div>
                                            {this.props.accuracy}%
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', height: 43}}>
                                            <div style={{width: 190}}>Radiologist Approval:</div>
                                            {this.props.approval >= 0 ? this.props.approval : 'Not Available'}

                                        </div>
                                        <div style={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 19,
                                            marginTop: 40
                                        }}>
                                            <div>
                                                {this.props.disease} with {this.props.approval >= 0 ? (this.props.accuracy + this.props.approval) / 2 : this.props.accuracy}%
                                                accuracy
                                            </div>
                                        </div>


                                    </Grid>
                                    <Grid item xs={12} md={6} display={'flex'} alignItems={'center'}
                                          justifyContent={'center'}>
                                        <img style={{width: '60%'}} src={this.props.gradcam}
                                             alt='gradcam'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>

                    <Divider sx={{margin: '15px auto', width: '100%'}}/>

                    <div >
                        <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>
                            Report Generation:
                        </Typography>
                        <div style={{fontWeight: 'bold', marginTop: 10, padding: '0px 20px'}}>
                            Generated Report:
                        </div>
                        <div style={{padding: '0px 40px', marginTop: 10}}>
                            {this.props.report}
                        </div>
                        <div style={{fontWeight: 'bold', marginTop: 20, padding: '0px 20px'}}>
                            Radiologist Opinion:
                        </div>
                        <div style={{ marginTop: 10}}>
                            <div style={{padding: '0px 40px', marginTop: 10}}>
                            {this.props.radiologyOpinion?this.props.radiologyOpinion:'-'}
                        </div>


                        </div>

                    </div>

                       <Divider sx={{margin: '15px auto', width: '100%'}}/>

                    <div style={{marginBottom: 10, fontStyle: 'italic'}}>
                        It should be noted that the chestXpert team cannot be held responsible for any errors or
                        inaccuracies in the automated generated reports. Use of the system is entirely at the user's own
                        risk.
                    </div>
                </div>
                <Footer/>
            </div>
        )
            ;
    }
}

export default DataComponent;