import React from "react";
import Grid from "@mui/material/Grid";

export default function AdvancedConfig() {
  return (
    <div className="section">
      <div>
        <Grid container spacing={1}>
          <Grid item xs={2} md={2}>
            <img style={{ width: "80%" }} src="/userManual/advanced.png" />
          </Grid>
          <Grid xs={10} md={10} container alignItems="center">
            <div className="section-h2">
              <b>Advanced Configurations</b>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="section-p">
              The software allows you to fine-tune the report generation with
              advanced configuration. The following advanced configuration
              options are available:
            </div>
            <div className="section-p">
              <ul>
                <li>
                  <b>Generation Method:</b> You can select from different
                  generation methods to customize the output. The available
                  methods are "Greedy Search," "Beam Search," and "Sampling."
                </li>
                <li>
                  <b>Sampling Seed:</b> You can set the seed value for the
                  sampling method to generate consistent outputs.
                </li>
                <li>
                  <b>Temperature:</b> You can adjust the temperature of the
                  sampling method to control the randomness of the generated
                  output.
                </li>
                <li>
                  <b>Top K:</b> You can set the number of top-K predictions to
                  consider during generation.
                </li>
                <li>
                  <b>Top P:</b> You can set the cumulative probability threshold
                  for top-p sampling.
                </li>
                <li>
                  <b>Attention Head:</b> You can adjust the number of attention
                  heads to control the amount of detail in the generated output.
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: "100%" }} src="/userManual/drag-drop.gif" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
