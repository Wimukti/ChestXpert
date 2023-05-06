import React from 'react'
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const percentageValues = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,95,90,95,100]

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
      },
    },
  };

  
export default function Disease({accuracy,disease}) {

const [approval, setApproval] = React.useState(-1);

  const handleChange = (event) => {
    setApproval(event.target.value);
  };

  return (
    <div style={{marginBottom: 15, paddingLeft: '10%', paddingRight: '10%'}}>
        <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>
            Disease Prediction:
        </Typography>
        <Grid container spacing={5}>
            <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                <div style={{display:'flex',alignItems:'center', height: 43}}>
                    <div style={{width: 190}}>Predicated disease:</div> {disease}
                </div>
                <div style={{display:'flex',alignItems:'center', height: 43}}>
                    <div style={{width: 190}}>Prediction Accuracy:</div> {accuracy}%
                </div>
                <div style={{display:'flex', alignItems:'center', height: 43}}>
                    <div style={{width: 190}}>Radiologist Approval:</div>
                    <Select
                        MenuProps={MenuProps}
                        size='small'
                        style={{width: 150}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={approval}
                        onChange={handleChange}
                        >
                        <MenuItem value={-1}>Not Available</MenuItem>
                        {
                            percentageValues.map(el=><MenuItem value={el}>{el}%</MenuItem>)
                        }
                    </Select>
                </div>
                <div style={{textAlign:'center', fontWeight:'bold', fontSize: 19, marginTop:40}}>
                    <div>
                    {disease} with {approval>=0 ?(accuracy+approval)/2:accuracy}% accuracy
                    </div>
                </div>
                
                
            </Grid>
            <Grid item xs={12} md={6}  display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <img style={{width: '60%'}} src='/home/ChestXray-cam.png'/>
            </Grid>
        </Grid>
    </div>
  )
}
