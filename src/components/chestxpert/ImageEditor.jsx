import AvatarEditor from 'react-avatar-editor';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import React from 'react';

class ImageEditor extends React.Component {
  state = {
    width: 300,
    height: 300,
    zoom: 1,
    image: null,
    showInputImage: true,
    showEditedImage: false,
    editedImage: null,
    rotate: 0,
  };

  // add ref to the editor
  setEditorRef = (editor) => (this.editor = editor);

  // add a method to the editor to preview the image
  handleSave = async () => {
    const canvas = this.editor.getImageScaledToCanvas();
    const data = canvas.toDataURL();

    this.setState({ showInputImage: false, editedImage: data, showEditedImage: true });

    try {
      await this.props.handleSave(data);
    } catch (e) {
      this.setState({ showInputImage: true, showEditedImage: false });
    }
  };

  componentDidMount() {
    let upload_image = this.props['upload_image'];

    if (upload_image) {
      this.setState({ image: upload_image, showAttentionMaps: false });
    }
  }

  render = () => {
    if (this.state.showInputImage) {
      return (
        <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>
          <Typography style={{ margin: '20px 0px', fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600 }}>
            Edit X-Ray Image:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AvatarEditor
                    ref={this.setEditorRef}
                    image={this.state.image}
                    width={this.state.width}
                    height={this.state.height}
                    border={50}
                    color={[0, 0, 0, 0.6]} // RGBA
                    scale={this.state.zoom}
                    rotate={this.state.rotate}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                <Typography
                  style={{
                    marginRight: '20px',
                    fontSize: 'calc(1rem + .4vw)',
                    fontWeight: 500,
                  }}
                >
                  Zoom&nbsp;&nbsp;
                </Typography>
                <Slider
                  valueLabelDisplay="auto"
                  value={this.state.zoom}
                  onChange={(event, newValue) => {
                    this.setState({ zoom: newValue });
                  }}
                  min={0.5}
                  max={5}
                  step={0.1}
                  defaultValue={1}
                  aria-labelledby="continuous-slider"
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Typography
                  style={{
                    marginRight: '20px',
                    fontSize: 'calc(1rem + .4vw)',
                    fontWeight: 500,
                  }}
                >
                  Rotate{' '}
                </Typography>
                <Slider
                  valueLabelDisplay="auto"
                  value={this.state.rotate}
                  onChange={(event, newValue) => {
                    this.setState({ rotate: newValue });
                  }}
                  min={0}
                  max={360}
                  step={1}
                  defaultValue={0}
                  aria-labelledby="continuous-slider"
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Typography
                  style={{
                    marginRight: '20px',
                    fontSize: 'calc(1rem + .4vw)',
                    fontWeight: 500,
                  }}
                >
                  Width&nbsp;
                </Typography>
                <Slider
                  valueLabelDisplay="auto"
                  value={this.state.width}
                  onChange={(event, newValue) => {
                    this.setState({ width: newValue });
                  }}
                  min={250}
                  max={500}
                  step={1}
                  defaultValue={250}
                  aria-labelledby="continuous-slider"
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Typography
                  style={{
                    marginRight: '20px',
                    fontSize: 'calc(1rem + .4vw)',
                    fontWeight: 500,
                  }}
                >
                  Height
                </Typography>
                <Slider
                  valueLabelDisplay="auto"
                  value={this.state.height}
                  onChange={(event, newValue) => {
                    this.setState({ height: newValue });
                  }}
                  min={250}
                  max={500}
                  step={1}
                  defaultValue={250}
                  aria-labelledby="continuous-slider"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px',
                  justifyContent: 'center',
                }}
              >
                <Button
                  style={{ backgroundColor: '#fc4c4c' }}
                  variant="contained"
                  size="medium"
                  onClick={this.handleSave}
                >
                  Done
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }
  };
}

export default ImageEditor;
