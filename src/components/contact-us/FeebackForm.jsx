import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios'
import LoadingButton from '@mui/lab/LoadingButton';
import { Hidden } from '@mui/material';

const apiEndpont = 'http://node-mailer-lb-1691901664.us-east-2.elb.amazonaws.com/api/v1'

export default function Intro() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        if(!email ||  !name || !feedback){
            setError(true)
        } else {
            setError(false)
        }
    },[email,name,feedback])

    const handleSubmit=()=>{
        console.log({name, email, feedback})
        setLoading(true)
        axios.post(apiEndpont, {
            from: 'ChestXpert',
            to:'chestxpert.live@gmail.com',
            subject:'ChestXpert: Feedback Form',
            html: `<div>Name: ${name}</div><div>Email: ${email}</div><div>Feedback: ${feedback}</div>`
        }).then(()=>{
            setLoading(false)
            setSubmitted(true)
        }).catch(()=>{
            setLoading(false)
        })
    }

    return (
        <div className='section-white'>
            <div className='section'>
                <div>
                    <Grid container spacing={20} justifyContent={'center'} style={{padding:'50px 0px'}}>
                        <Grid item xs={12} md={6} >
                            <div className='section-h2' style={{textAlign:'center' , marginBottom: 40, marginTop:0}}>
                                User Feedback
                            </div>
                            {!submitted ? <div>
                                <TextField required onChange={(e)=>setName(e.target.value)} value={name} fullWidth id="name-input" label="Name" variant="outlined" style={{marginBottom:15}}/>
                                <TextField required type='email' onChange={(e)=>setEmail(e.target.value)} value={email} fullWidth id="name-input" label="Email" variant="outlined" style={{marginBottom:15}}/>
                                <Textarea required onChange={(e)=>setFeedback(e.target.value)} value={feedback} fullWidth id="name-input" minRows={10} label="Feedback"  style={{marginBottom:15}}/>
    

                                <LoadingButton 
                                disabled={error}
                                loading={loading}
                                onClick={handleSubmit}
                                fullWidth  size="large" variant="contained" sx={{
                                    backgroundColor: '#c52a25',
                                    '&:hover': {
                                    backgroundColor: '#7a100c',
                                },
                                }}>Submit</LoadingButton>
                            </div>:
                            <div style={{textAlign:'center', fontSize:20}}>
                                Thank you !
                            </div>}
                            
                            
                        </Grid>
                        <Hidden mdDown>
                            <Grid item xs={12} md={5} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                                <img style={{width: '70%'}} src='/ChestXpert icon.png'/>
                            </Grid>
                        </Hidden>
                        
                    </Grid>
                </div>

            </div>
        </div>
    )
}
