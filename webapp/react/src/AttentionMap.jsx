import {
    StreamlitComponentBase,
    withStreamlitConnection,
} from "streamlit-component-lib"

import {Swiper, SwiperSlide} from 'swiper/react';
import {Zoom, Navigation, Pagination} from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";


import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PdfComponent from "./components/pdf/PdfComponent";

import * as React from 'react';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import {alpha, Divider} from "@mui/material";

import Report from './components/chestxpert/Report'
import Disease from './components/chestxpert/Disease'

class AttentionMap extends StreamlitComponentBase {
    state = {
        opacity:0.5,
        att_maps: [],
        jet_maps: [],
        binary_maps: [],
        displayedMap: [],
        resizedImg: '',
        showResizedImg: false,
        selectedMap: 'attention',
        report:'',
        gradcam:`/gradcam/${Math.floor((Math.random() * 5) + 1)}.png`,
        disease:'',
        accuracy:'',
        approval: -1,
        radiologyOpinion:''
    }

    setMainApproval = (event) => {
        this.setState({approval: event.target.value})
    }

    setOpacity = (event) => {
        this.setState({opacity: event})
    }

    setMainRadiologyOpinion = (event) => {
        this.setState({radiologyOpinion: event})
    }

    componentDidMount() {
        super.componentDidMount();

        let att_maps = this.props.args["attention_maps"];
        let jet_maps = this.props.args["jet_maps"];
        let binary_maps = this.props.args["binary_maps"];
        let resized_img = this.props.args["resized_img"];
        let report = this.props.args["report"];
        this.setState({
            resizedImg: resized_img,
            report: this.props.args["report"],
            disease: this.props.args["classification"],
            accuracy: parseFloat(this.props.args["accuracy"]),
        })

        if (att_maps) {
            const maps = JSON.parse(att_maps)
            const images = Object.keys(maps).map((key) => maps[key]);
            this.setState({att_maps: images, displayedMap: images})
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
            return <div style={{paddingTop: 20,}}>
                    <Divider sx={{margin: '30px auto', width: '80%'}}/>
                <Disease opacity={this.state.opacity} setOpacity={this.setOpacity} resizedImg={`data:image/jpeg;base64,${this.state.resizedImg}`} setMainApproval={this.setMainApproval} gradcam={this.state.gradcam} accuracy={this.state.accuracy} disease={this.state.disease}/>
                    <Divider sx={{margin: '30px auto', width: '80%'}}/>
                <Report setMainRadiologyOpinion={this.setMainRadiologyOpinion} report={this.state.report}/>
                    <Divider sx={{margin: '30px auto', width: '80%'}}/>
                <div style={{marginBottom: 15, paddingLeft: '10%', paddingRight: '10%'}}>
                    <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>Model Explainability:</Typography>   
                </div>
                <ButtonGroup color="error" style={{marginBottom: 15, paddingLeft: '10%', paddingRight: '10%'}}>
                    <Button variant={this.state.selectedMap === 'attention' ? "contained" : "outlined"}
                            onClick={() => this.setState({
                                displayedMap: this.state.att_maps,
                                selectedMap: 'attention'
                            })}>Attention Map</Button>
                    <Button variant={this.state.selectedMap === 'jet' ? "contained" : "outlined"}
                            onClick={() => this.setState({displayedMap: this.state.jet_maps, selectedMap: 'jet'})}>Jet
                        Map</Button>
                    <Button variant={this.state.selectedMap === 'binary' ? "contained" : "outlined"}
                            onClick={() => this.setState({
                                displayedMap: this.state.binary_maps,
                                selectedMap: 'binary'
                            })}>Binary Map</Button>
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
                        {this.state.displayedMap.map((imageSet, index) => (
                            <SwiperSlide key={index}
                                         style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
                                <div
                                    style={{
                                        height: 300,
                                        width: 280,
                                        overflow: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'relative',
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
                <div style={{marginBottom: 15, paddingLeft: '10%', paddingRight: '10%'}}>
                    <Switch
                            sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#c52a25',
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#c52a25',
                                  },
                            }}
                            checked={!this.state.showResizedImg}
                            onChange={() => this.setState({showResizedImg: !this.state.showResizedImg})}/>
                    Show explainability Map
                </div>
                <Divider sx={{margin: '30px auto', width: '80%'}}/>
                <div style={{marginBottom: 15, paddingLeft: '10%', paddingRight: '10%'}}>
                    <Typography sx={{fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600}}>Download Chest X-Ray Report</Typography>
                </div>
                <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
                    <PdfComponent
                        gradcam={this.state.gradcam}
                        accuracy={this.state.accuracy}
                        disease={this.state.disease}
                        approval={this.state.approval}
                        report={this.state.report}
                        radiologyOpinion={this.state.radiologyOpinion}
                        originalImg={`data:image/jpeg;base64,${this.state.resizedImg}`}
                        opacity={this.state.opacity}
                    />
                </div>
                {/*    Vertical Space*/}
                <div style={{height: '10vh'}}></div>
            </div>
        } else {
            return <div></div>
        }
    }
}

export default withStreamlitConnection(AttentionMap);
