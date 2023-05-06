import React, {useState} from 'react'
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

export default function Report({report, setMainRadiologyOpinion}) {
  const [addOpinion, setAddOpinion] = useState(false)
  const [radiologyOpinion, setRadiologyOpinion] = useState('')

    const handleChange = (e) => {
      setRadiologyOpinion(e.target.value);
      setMainRadiologyOpinion(e.target.value)
  };

  const handleAddOpinion = () => {
      setRadiologyOpinion('');
      setMainRadiologyOpinion('')
      setAddOpinion(!addOpinion)
  };

  return (
    <div style={{marginBottom: 15, paddingLeft: '10%', paddingRight: '10%'}}>
        <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>
            Report Generation:
        </Typography>
            <div style={{fontWeight:'bold', marginTop: 10, padding: '0px 20px'}}>
                Generated Report:
            </div>
            <div style={{ padding: '0px 40px', marginTop: 10}}>
                {report}
            </div>
            <div style={{fontWeight:'bold', marginTop: 20, padding: '0px 20px', }}>
                <div style={{fontWeight:'bold', marginTop: 20, display:'flex', alignItems:'center'}}>
                 Radiologist Opinion:
                    <Checkbox sx={{color: '#c52a25', '&.Mui-checked': {color: '#c52a25'}}} onChange={handleAddOpinion}  checked={addOpinion}/>
                </div>
                {addOpinion &&
                <div style={{ padding: '0px 20px', marginTop: 10}}>
                    <Button disabled={report===radiologyOpinion} onClick={()=> {
                        setRadiologyOpinion(report);
                        setMainRadiologyOpinion(report)
                    }} size='small'
                    sx={{
                        marginBottom:'10px',
                            backgroundColor: '#c52a25',
                            '&:hover': {
                              backgroundColor: '#7a100c',
                          },
                        }} variant="contained" >Copy generated report</Button>
                    <textarea value={radiologyOpinion} onChange={(e)=>handleChange(e)} style={{width:'100%', padding:10}} rows={8} placeholder='Radiologist Opinion'></textarea>
                </div>
                }
                
                
            </div>
           
    </div>
  )
}
