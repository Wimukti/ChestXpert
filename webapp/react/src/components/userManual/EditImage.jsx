import React from "react";
import Grid from "@mui/material/Grid";

export default function EditImage() {
  return (
    <div style={{ background: "#f5f5f5" }}>
      <div className="section section-brown">
        <div>
          <Grid container spacing={2}>
            <Grid item xs={3} md={1}>
              <img style={{ width: "80%" }} src="/userManual/STEP 02.png" />
            </Grid>
            <Grid xs={9} md={10} container alignItems="center">
              <div className="section-h2">
                <b>Edit Image to Fit the White Square Box</b>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="section-p">
                After uploading the image, it needs to be manipulated to fit
                into the square box. The following tools are available to
                manipulate the image.
              </div>
              <div className="section-p">
                <ul>
                  <li>
                    <b>Zoom:</b> Use the zoom tool to enlarge or reduce the size
                    of the image.
                  </li>
                  <li>
                    <b>Rotation:</b> Use the rotation tool to rotate the image
                    clockwise or counterclockwise.
                  </li>
                  <li>
                    <b>Width:</b> Use the height tool to adjust the height of
                    the image to fit into the square box.
                  </li>
                  <li>
                    <b>Height:</b> Use the width tool to adjust the width of the
                    image to fit into the square box.
                  </li>
                </ul>
              </div>
              <div className="section-p">
                After the X-ray image fits the box, click <b>Done</b>.
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <img style={{ width: "100%" }} src="/userManual/Step 02.gif" />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
