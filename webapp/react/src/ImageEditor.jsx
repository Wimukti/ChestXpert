import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import AvatarEditor from 'react-avatar-editor'
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import {Grid, Typography} from "@mui/material";

class ImageEditor extends StreamlitComponentBase {
    state = {
        width: 250,
        height: 250,
        zoom: 1,
        image: null,
        showInputImage: true,
        rotate: 0,
    }

    // add ref to the editor
    setEditorRef = (editor) => this.editor = editor

    // add a method to the editor to preview the image
    handleSave = () => {
        const canvas = this.editor.getImage()
        const data = canvas.toDataURL('image/jpeg')
        this.setState({showInputImage: false})
        Streamlit.setComponentValue(data)
    }

    componentDidMount() {
        super.componentDidMount();
        let upload_image = this.props.args["upload_image"];

        if (upload_image) {
            this.setState({ image: upload_image, showAttentionMaps: false})
        }
    }

    render = () => {
        if (this.state.showInputImage) {
            return (
                <div >
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} lg={6}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Typography style={{margin: '20px'}}>Edit the image </Typography>
                                <AvatarEditor
                                    ref={this.setEditorRef}
                                    image={`data:image/jpeg;base64,${this.state.image}`}
                                    width={this.state.width}
                                    height={this.state.height}
                                    border={50}
                                    color={[255, 255, 255, 0.6]} // RGBA
                                    scale={this.state.zoom}
                                    rotate={this.state.rotate}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '50px'}}>
                                <Typography style={{marginRight: '20px'}}>Zoom: </Typography>
                                <Slider
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    value={this.state.zoom}
                                    onChange={(event, newValue) => {
                                        this.setState({zoom: newValue})
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
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                                <Typography style={{marginRight: '20px'}}>Rotate: </Typography>
                                <Slider
                                    aria-label="Default"
                                    valueLabelDisplay="false"
                                    value={this.state.rotate}
                                    onChange={(event, newValue) => {
                                        this.setState({rotate: newValue})
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
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                                <Typography style={{marginRight: '20px'}}>Width: </Typography>
                                <Slider
                                    aria-label="Default"
                                    valueLabelDisplay="false"
                                    value={this.state.width}
                                    onChange={(event, newValue) => {
                                        this.setState({width: newValue})
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
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                                <Typography style={{marginRight: '20px'}}>Height: </Typography>
                                <Slider
                                    aria-label="Default"
                                    valueLabelDisplay="false"
                                    value={this.state.height}
                                    onChange={(event, newValue) => {
                                        this.setState({height: newValue})
                                    }}
                                    min={250}
                                    max={500}
                                    step={1}
                                    defaultValue={250}
                                    aria-labelledby="continuous-slider"
                                />
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'center'}}>
                                <Button variant="contained" onClick={this.handleSave}>Done</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default withStreamlitConnection(ImageEditor);
