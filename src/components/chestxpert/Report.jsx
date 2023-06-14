import React, {useState} from 'react'
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import {Button} from '@mui/material';
import axios from 'axios'
import LoadingButton from "@mui/lab/LoadingButton";

const endpoint = 'https://180146c.pythonanywhere.com/api/bleu'

export default function Report({report, setMainRadiologyOpinion}) {
    const [addOpinion, setAddOpinion] = useState(false)
    const [radiologyOpinion, setRadiologyOpinion] = useState('')
    const [bleuScore, setBleuScore] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setRadiologyOpinion(e.target.value);
        setMainRadiologyOpinion(e.target.value)
    };

    const handleAddOpinion = () => {
        setRadiologyOpinion('');
        setMainRadiologyOpinion('')
        setAddOpinion(!addOpinion)
    };

    const validate = () => {
        setLoading(true)
        axios.post(endpoint, {field1: report, field2: radiologyOpinion}).then(res => {
            console.log(res.data)
            setBleuScore(res.data)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }

    return (
        <div style={{marginBottom: 15, paddingLeft: '10%', paddingRight: '10%'}}>
            <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>
                Report Generation:
            </Typography>
            <div style={{fontWeight: 'bold', marginTop: 10, padding: '0px 20px'}}>
                Generated Report:
            </div>
            <div style={{padding: '0px 40px', marginTop: 10}}>
                {report}
            </div>
            <div style={{fontWeight: 'bold', marginTop: 20, padding: '0px 20px',}}>
                <div style={{fontWeight: 'bold', marginTop: 20, display: 'flex', alignItems: 'center'}}>
                    Radiologist Opinion:
                    <Checkbox sx={{color: '#c52a25', '&.Mui-checked': {color: '#c52a25'}}} onChange={handleAddOpinion}
                              checked={addOpinion}/>
                </div>
                {addOpinion &&
                    <div style={{padding: '0px 20px', marginTop: 10}}>
                        <Button disabled={report === radiologyOpinion} onClick={() => {
                            setRadiologyOpinion(report);
                            setMainRadiologyOpinion(report)
                        }} size='small'
                                sx={{
                                    marginBottom: '10px',
                                    backgroundColor: '#c52a25',
                                    '&:hover': {
                                        backgroundColor: '#7a100c',
                                    },
                                }} variant="contained">Copy generated report</Button>
                        <textarea value={radiologyOpinion} onChange={(e) => handleChange(e)}
                                  style={{width: '100%', padding: 10}} rows={8}
                                  placeholder='Radiologist Opinion'></textarea>
                        <LoadingButton loading={loading} disabled={radiologyOpinion == ''} onClick={validate} size='small'
                                sx={{
                                    marginBottom: '10px',
                                    backgroundColor: '#c52a25',
                                    '&:hover': {
                                        backgroundColor: '#7a100c',
                                    },
                                }} variant="contained">Validate</LoadingButton>

                        {bleuScore && <div style={{marginTop:10}}>
                            Generated report accuracy: <strong>{parseFloat(bleuScore).toFixed(2) * 100}%</strong> (BLEU Score)
                        </div>}

                    </div>
                }
            </div>
        </div>
    )
}
