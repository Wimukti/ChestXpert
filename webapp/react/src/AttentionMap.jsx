import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation, Pagination  } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";


import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

class AttentionMap extends StreamlitComponentBase {
    state = {
        att_maps: [],
        jet_maps:[],
        binary_maps: [],
        displayedMap:[],
        resizedImg: null,
        showResizedImg: false,
        selectedMap:'attention'
    }

    componentDidMount() {
        super.componentDidMount();

        let att_maps = this.props.args["attention_maps"];
        let jet_maps = this.props.args["jet_maps"];
        let binary_maps = this.props.args["binary_maps"];
        let resized_img = this.props.args["resized_img"];
        this.setState({resizedImg: resized_img})

        if (att_maps) {
            const maps = JSON.parse(att_maps)
            const images = Object.keys(maps).map((key) => maps[key]);
            this.setState({att_maps: images, displayedMap:images})
        }

        if (jet_maps) {
          const maps = JSON.parse(jet_maps)
          const images = Object.keys(maps).map((key) => maps[key]);
          this.setState({jet_maps: images})
      }

      if (binary_maps) {
        const maps = JSON.parse(binary_maps)
        const images = Object.keys(maps).map((key) => maps[key]);
        this.setState({binary_maps: images})
      }
    }

    render = () => {

        if (true) {
            return <div style={{  paddingTop: 20}}>
              <ButtonGroup style={{marginBottom:15, paddingLeft: '10%', paddingRight: '10%'}}>
                <Button variant={this.state.selectedMap==='attention'?"contained":"outlined"} onClick={()=>this.setState({displayedMap:this.state.att_maps, selectedMap:'attention'})}>Attention Map</Button>
                <Button variant={this.state.selectedMap==='jet'?"contained":"outlined"} onClick={()=>this.setState({displayedMap:this.state.jet_maps, selectedMap:'jet'})}>Jet Map</Button>
                <Button variant={this.state.selectedMap==='binary'?"contained":"outlined"} onClick={()=>this.setState({displayedMap:this.state.binary_maps, selectedMap:'binary'})}>Binary Map</Button>
              </ButtonGroup>
              <div style={{paddingLeft: '3%', paddingRight: '3%'}}>
                  <Swiper
                  zoom={true}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Zoom, Navigation, Pagination]}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 0,
                    },
                  }}
                  >
                    {this.state.displayedMap.map((imageSet,index) => (
                    <SwiperSlide style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
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
                                    src={`data:image/jpeg;base64,${imageSet}`}
                                  />
                                </div>
                            
                    </SwiperSlide>))}
                </Swiper>
              </div>
              
                {/* <Carousel
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
                </Carousel> */}
                <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
                  <Button  variant="contained" onClick={()=> {this.setState({showResizedImg: !this.state.showResizedImg})}}> 
                    {this.state.showResizedImg?'Show':'Hide'} Attention 
                  </Button>
                </div>
                
            </div>
        } else {
            return <div></div>
        }
    }
}

export default withStreamlitConnection(AttentionMap);
