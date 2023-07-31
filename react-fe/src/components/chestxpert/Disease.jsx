import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const percentageValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 95, 90, 95, 100];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
    },
  },
};

export default function Disease({
  opacity,
  setOpacity,
  accuracy,
  disease,
  gradcam,
  setMainApproval,
  resizedImg,
  classification,
}) {
  const [approval, setApproval] = React.useState(-1);

  const handleChange = (event) => {
    setMainApproval(event);
    setApproval(event.target.value);
  };

  return (
    <div style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }}>
      <Typography sx={{ fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600 }}>Disease Prediction:</Typography>
      <div className="flex my-10">
        <div className="flex flex-col justify-center px-5 w-1/2 border-r border-r-3 bg-[#891313] text-white">
          <div className="font-bold text-4xl">
            {classification[0].class_name}
            <CheckCircleIcon style={{ fontSize: 30, marginLeft: 10 }} />
          </div>
          <div className="mt-2">
            <span className="text-3xl">{classification[0].probability.toFixed(2)}%</span> Very Likely
          </div>
        </div>
        <div className="w-1/2  bg-[#cccc] font-bold">
          <div className="flex px-5 py-3 border-b border-b-3 justify-between align-center">
            <div className="w-3/5 flex items-center text-xl">{classification[1].class_name}</div>
            <div className="w-2/5 flex flex-col justify-center">
              <div className="text-xl">{classification[1].probability.toFixed(2)}%</div>
              <div>Likely</div>
            </div>
          </div>
          <div className="flex px-5 py-3 justify-between">
            <div className="w-3/5 flex items-center text-xl">{classification[2].class_name}</div>
            <div className="w-2/5 flex flex-col justify-center">
              <div className="text-xl">{classification[2].probability.toFixed(2)}%</div>
              <div>Uncertain</div>
            </div>
          </div>
        </div>
      </div>
      <Grid container spacing={5}>
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
              width: '80%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              style={{
                width: '100%',

                position: 'absolute',
                objectFit: 'cover',
              }}
              alt="The house from the offer."
              src={resizedImg}
            />
            <img
              style={{
                width: '100%',
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
              valueLabelDisplay="auto"
              style={{ width: 343, marginTop: 15, color: '#891313', zIndex: 21 }}
              value={opacity}
              onChange={(event, newValue) => {
                setOpacity(newValue);
              }}
              min={0}
              max={1}
              step={0.1}
              defaultValue={0.5}
            />
          </div>
        </Grid>

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
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 23, marginTop: 40 }}>
            <div>
              {disease} with {approval >= 0 ? ((parseFloat(accuracy) + approval) / 2).toFixed(2) : accuracy}% accuracy
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
