import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

const percentageValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 95, 90, 95, 100];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
    },
  },
};

export default function Disease({ opacity, setOpacity, accuracy, disease, gradcam, setMainApproval, resizedImg }) {
  const [approval, setApproval] = React.useState(-1);

  const handleChange = (event) => {
    setMainApproval(event);
    setApproval(event.target.value);
  };

  return (
    <div style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }}>
      <Typography sx={{ fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600 }}>Disease Prediction:</Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <div style={{ display: 'flex', alignItems: 'center', height: 43 }}>
            <div style={{ width: 190 }}>Predicated disease:</div>
            {disease}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: 43 }}>
            <div style={{ width: 190 }}>Prediction Accuracy:</div>
            {accuracy}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: 43 }}>
            <div style={{ width: 190 }}>Radiologist Approval:</div>
            <Select
              MenuProps={MenuProps}
              size="small"
              style={{ width: 150 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={approval}
              onChange={handleChange}
            >
              <MenuItem value={-1}>Not Available</MenuItem>
              {percentageValues.map((el, index) => (
                <MenuItem key={index} value={el}>
                  {el}%
                </MenuItem>
              ))}
            </Select>
          </div>
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19, marginTop: 40 }}>
            <div>
              {disease} with {approval >= 0 ? (accuracy + approval) / 2 : accuracy}% accuracy
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          textAlign={'center'}
          flexDirection={'column'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <div
            style={{
              height: 300,
              width: 280,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              style={{
                height: 230,
                width: '75%',
                top: 36,
                position: 'absolute',
                objectFit: 'cover',
              }}
              alt="The house from the offer."
              src={resizedImg}
            />
            <img
              style={{
                height: 230,
                width: '75%',
                objectFit: 'cover',
                objectPosition: '50% 50%',
                opacity: parseFloat(opacity),
                zIndex: 20,
              }}
              alt="The house from the offer."
              src={gradcam}
            />
          </div>

          <div>
            <Slider
              style={{ width: 300 }}
              fullWidth
              value={opacity}
              onChange={(event, newValue) => {
                setOpacity(newValue);
              }}
              min={0}
              max={1}
              step={0.1}
              defaultValue={0.5}
            />
            <div style={{ textAlign: 'center' }}>opacity {opacity}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
