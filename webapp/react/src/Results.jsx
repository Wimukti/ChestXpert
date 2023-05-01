import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


class Results extends StreamlitComponentBase {
    theme = createTheme();
    render = () => {
        return <div>
            <ThemeProvider theme={this.theme}>
              <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Results
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
        </div>
    }
}

export default withStreamlitConnection(Results);
