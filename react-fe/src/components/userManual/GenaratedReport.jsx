import React from "react";
import Grid from "@mui/material/Grid";

export default function GenaratedReport() {
  return (
    <div className="section-white">
    <div className="section">
      <div>
        <Grid container spacing={2}>
          <Grid item xs={3} md={1}>
            <img style={{ width: "80%" }} src="/userManual/STEP 03.png" />
          </Grid>
          <Grid xs={9} md={10} container alignItems="center">
            <div className="section-h2">
              <b>View the Generated Report</b>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="section-p">
              After configuring the advanced options, click on the <b>Done </b>
              button. The software will generate a report based on the uploaded
              X-Ray and the advanced configuration.
            </div>
            <div className="section-p">
              If you want to download the generated report, click on the
              <b> Download</b> button.
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: "100%" }} src="/userManual/Step 3.png" />
          </Grid>
        </Grid>
      </div>
    </div></div>
  );
}
