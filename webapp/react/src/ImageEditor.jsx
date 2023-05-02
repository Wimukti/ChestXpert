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
        showEditedImage: false,
        editedImage: null,
        rotate: 0,
    }

    // add ref to the editor
    setEditorRef = (editor) => this.editor = editor

    // add a method to the editor to preview the image
    handleSave = () => {
        const canvas = this.editor.getImage()
        const data = canvas.toDataURL('image/jpeg')
        this.setState({showInputImage: false})
        this.setState({editedImage: data})
        this.setState({showEditedImage: true})
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
                <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}>
                                <Typography style={{margin: '20px 0px', fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>Edit the Chest X-Ray to fit the box</Typography>
                                <AvatarEditor
                                    ref={this.setEditorRef}
                                    image={`data:image/jpeg;base64,${this.state.image}`}
                                    width={this.state.width}
                                    height={this.state.height}
                                    border={50}
                                    color={[0, 0, 0, 0.6]} // RGBA
                                    scale={this.state.zoom}
                                    rotate={this.state.rotate}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '30px'}}>
                                <Typography style={{marginRight: '20px', fontSize: 'calc(1rem + .4vw)', fontWeight: 500}}>Zoom&nbsp;&nbsp;</Typography>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                                <Typography style={{marginRight: '20px', fontSize: 'calc(1rem + .4vw)', fontWeight: 500}}>Rotate </Typography>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                                <Typography style={{marginRight: '20px', fontSize: 'calc(1rem + .4vw)', fontWeight: 500}}>Width&nbsp;</Typography>
                                <Slider
                                    aria-label="Default"
                                    valueLabelDisplay="false"
                                    value={this.state.width}
                                    onChange={(event, newValue) => {
                                        this.setState({width: newValue})
                                    }}
                                    min={250}
                                    max={500}
                                    backgroundColor='#fc4c4c'
                                    step={1}
                                    defaultValue={250}
                                    aria-labelledby="continuous-slider"
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                                <Typography style={{marginRight: '20px', fontSize: 'calc(1rem + .4vw)', fontWeight: 500}}>Height</Typography>
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
                                <Button style={{backgroundColor: '#fc4c4c'}} variant="contained" size="medium" onClick={this.handleSave}>Done</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        } else if (this.state.showEditedImage) {
            return (
                <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <img src={this.state.editedImage} alt="edited image" style={{width: '40%'}}/>
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
