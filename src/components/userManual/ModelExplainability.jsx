import React from "react";
import Grid from "@mui/material/Grid";

export default function SelectFile() {
  return (
    <div className="section-brown">
      <div className="section section-brown">
        <div>
          <Grid container spacing={1}>
            <Grid item xs={3} md={1}>
              <img style={{ width: "80%" }} src="/userManual/STEP 04.png" />
            </Grid>
            <Grid xs={9} md={10} container alignItems="center">
              <div className="section-h2">
                <b>Browse through the Attention Map</b>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="section-p">
                You can browse through the attention maps images to learn which
                section of the X-ray is used to generate each word in the
                report.
              </div>
              <div className="section-p">
                <ul>
                  <li>
                    <b>Attention Map:</b> This map shows the attention weight
                    assigned to each pixel in the input image. The brighter the
                    pixel, the higher the attention weight assigned to it.
                  </li>
                  <li>
                    <b>Jet Map:</b> This map uses a color scheme to represent
                    the attention weight assigned to each pixel. The color scale
                    goes from blue to red, with blue representing low attention
                    weight and red representing high attention weight.
                  </li>
                  <li>
                    <b>Temperature:</b> This map shows which pixels in the input
                    image are most relevant for generating each word in the
                    report. The pixels with higher relevance are marked in
                    white, while the pixels with lower relevance are marked in
                    black.
                  </li>
                </ul>
              </div>
              <div className="section-p">
                <b>Show Explainability Map Toggle:</b> This map shows the
                contribution of each word in the report to the final prediction.
                The brighter the pixel, the higher the contribution of the
                corresponding word to the final prediction.
              </div>
              <div className="section-p">
                The attention maps are included in the downloadable PDF report.
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <img style={{ width: "100%" }} src="/userManual/Step 04.gif" />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
