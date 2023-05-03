import React from "react";
import Grid from "@mui/material/Grid";

export default function SelectFile() {
  return (
    <div className="section">
      <div>
        <Grid container spacing={1}>
          <Grid item xs={3} md={1}>
            <img style={{ width: "80%" }} src="/userManual/STEP 01.png" />
          </Grid>
          <Grid xs={9} md={10} container alignItems="center">
            <div className="section-h2">
              <b>Select the chest X-Ray image</b>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="section-p">
              To use the software, the first step is to upload the X-ray image.
              Click on the "Upload" button and select the image file from your
              computer or simply drag and drop.
            </div>
            <div className="section-p">
              If the upload process is successful, the image will be displayed
              in the image viewer.
            </div>
            <div className="section-p">
              <b>Supported file types</b>: .jpeg .jpg, .png
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: "100%" }} src="/userManual/Step 01.gif" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
