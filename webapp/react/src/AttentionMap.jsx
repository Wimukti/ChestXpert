import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import Button from '@mui/material/Button';
import {Grid, Typography} from "@mui/material";
import Carousel from 'react-material-ui-carousel'

class AttentionMap extends StreamlitComponentBase {
    state = {
        att_maps: null,
        showAttentionMaps: false,
        resizedImg: null,
        showResizedImg: false
    }

    componentDidMount() {
        super.componentDidMount();

        let att_maps = this.props.args["attention_maps"];
        let jet_maps = this.props.args["jet_maps"];
        let binary_maps = this.props.args["binary_maps"];
        let resized_img = this.props.args["resized_img"];

        if (att_maps) {
            const maps = JSON.parse(att_maps)
            const imageSets = [];
            const images = Object.keys(maps).map((key) => maps[key]);
            for (let i = 0; i < images.length; i += 4) {
              imageSets.push(images.slice(i, i + 4));
            }
            this.setState({att_maps: imageSets, showInputImage: false, showAttentionMaps: true, resizedImg: resized_img})

        }
    }

    render = () => {

        if (this.state.showAttentionMaps) {
            return <div style={{minHeight: 450, paddingLeft: '10%', paddingRight: '10%'}}>
                <Carousel
                navButtonsAlwaysVisible={true}
                animation={"slide"}
                autoPlay={false}
                >
                  {
                    // Map through the array of arrays to create sets of images
                    this.state.att_maps.map((imageSet,index) => (
                      <Grid container spacing={2} key={index}>
                        {
                          // Map through the images in the set to create grid items
                          imageSet.map((image) => (
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <Typography style={{margin: '20px'}}></Typography>
                              <div
                                style={{
                                  height: 300,
                                  width:280,
                                  overflow: 'hidden',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                    position:'relative',
                                }}
                              >
                                  {this.state.showResizedImg && <img
                                      style={{
                                          height: 230,
                                          width: '75%',
                                          left: '38px',
                                          top: 36,
                                          position: 'absolute',
                                          objectFit: 'cover',

                                      }}
                                      alt="The house from the offer."
                                      src={`data:image/jpeg;base64,${this.state.resizedImg}`}
                                  />}
                                <img
                                  style={{
                                    height: '100%',
                                    width: '75%',
                                    objectFit: 'cover',
                                    objectPosition: '50% 50%'
                                  }}
                                  alt="The house from the offer."
                                  src={`data:image/jpeg;base64,${image}`}
                                />
                              </div>
                            </Grid>
                          ))
                        }
                      </Grid>
                    ))
                  }
                </Carousel>
                <Button variant="contained" onClick={()=> {
                    this.setState({showResizedImg: !this.state.showResizedImg})
                }}> {this.state.showResizedImg?'Show':'Hide'} Attention </Button>
            </div>
        } else {
            return <div></div>
        }
    }
}

export default withStreamlitConnection(AttentionMap);
