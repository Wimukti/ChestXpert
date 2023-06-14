import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
//import PdfComponent from '../components/pdf/PdfComponent';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import * as React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

import Report from '../components/chestxpert/Report';
import FileUploader from '../components/chestxpert/FileUploader';
import Disease from '../components/chestxpert/Disease';
//import response from '../response.json';
import Layout from '../components/Layout.jsx';
import Header from '../components/common/Header.jsx';
import ImageEditor from '../components/chestxpert/ImageEditor.jsx';
import axios from 'axios';
import PdfComponent from '../components/pdf/PdfComponent.jsx';
import CustomizedSteppers from '../components/chestxpert/Stepper';

class AttentionMap extends React.Component {
  state = {
    originalImgFile: undefined,
    opacity: 0.5,
    att_maps: [],
    jet_maps: [],
    binary_maps: [],
    displayedMap: [],
    resizedImg: '',
    showResizedImg: false,
    selectedMap: 'attention',
    report: '',
    gradcam: `/gradcam/${Math.floor(Math.random() * 5 + 1)}.png`,
    disease: '',
    accuracy: '',
    approval: -1,
    radiologyOpinion: '',
    loading: false,
    hasResponse: false,
    activeStep: 0,
  };

  setMainApproval = (event) => {
    this.setState({ approval: event.target.value });
  };

  setOpacity = (event) => {
    this.setState({ opacity: event });
  };

  setMainRadiologyOpinion = (event) => {
    this.setState({ radiologyOpinion: event });
  };

  componentDidMount() {}

  handleSave = async (image) => {
    this.setState({ loading: true, resizedImg: image, activeStep: 1 });

    try {
      const { data: response } = await axios.post('https://chestxpert.live/generate_report', { image });

      setTimeout(() => {
        let att_maps = response['attention_map'];
        let jet_maps = response['jet_images'];
        let binary_maps = response['binary_images'];

        this.setState({
          activeStep: 2,
          report: response['report'],
          disease: response['prediction'],
          accuracy: parseFloat(response['accuracy']),
        });

        if (att_maps) {
          const maps = JSON.parse(att_maps);
          const images = Object.keys(maps).map((key) => maps[key]);
          this.setState({ att_maps: images, displayedMap: images });
        }

        if (jet_maps) {
          const maps = JSON.parse(jet_maps);
          const images = Object.keys(maps).map((key) => maps[key]);
          this.setState({ jet_maps: images });
        }

        if (binary_maps) {
          const maps = JSON.parse(binary_maps);
          const images = Object.keys(maps).map((key) => maps[key]);
          this.setState({ binary_maps: images });
        }
        this.setState({ loading: false });
        this.setState({ hasResponse: true });
      }, 5000);
    } catch (e) {
      alert('Error !');
      this.setState({ loading: false });
      this.setState({ hasResponse: false });
      throw e;
    }
  };

  handleFileChange = async (files) => {
    this.setState({ originalImgFile: files[0] });
  };
  render = () => {
    return (
      <Layout>
        <Header
          title="ChestXpert: Chest X-ray Report Generation"
          subtitle="A Deep Learning based Chest X-ray Report Generation System"
          showActionButton={false}
        />

        <div
          style={{
            margin: '0px auto',
            maxWidth: '1200px',
            background: 'white',
            padding: '40px 40px',
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <CustomizedSteppers activeStep={this.state.activeStep} />
          </div>

          {this.state.originalImgFile ? (
            <ImageEditor handleSave={this.handleSave} upload_image={this.state.originalImgFile} />
          ) : (
            <FileUploader handleFileChange={this.handleFileChange} />
          )}

          {this.state.loading && (
            <Box sx={{ width: '50%', margin: 'auto', marginTop: 5 }}>
              <LinearProgress />
              <Typography textAlign={'center'} marginTop={1} fontSize={20}>
                Generating your x-ray report. Please wait...
              </Typography>
            </Box>
          )}
          {this.state.hasResponse && (
            <>
              <Divider sx={{ margin: '30px auto', width: '80%' }} />
              <Disease
                opacity={this.state.opacity}
                setOpacity={this.setOpacity}
                resizedImg={this.state.resizedImg}
                setMainApproval={this.setMainApproval}
                gradcam={this.state.gradcam}
                accuracy={this.state.accuracy}
                disease={this.state.disease}
              />
              <Divider sx={{ margin: '30px auto', width: '80%' }} />
              <Report setMainRadiologyOpinion={this.setMainRadiologyOpinion} report={this.state.report} />
              <Divider sx={{ margin: '30px auto', width: '80%' }} />
              <div style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }}>
                <Typography sx={{ fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600 }}>Model Explainability:</Typography>
              </div>
              <ButtonGroup color="error" style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }}>
                <Button
                  variant={this.state.selectedMap === 'attention' ? 'contained' : 'outlined'}
                  onClick={() =>
                    this.setState({
                      displayedMap: this.state.att_maps,
                      selectedMap: 'attention',
                    })
                  }
                >
                  Attention Map
                </Button>
                <Button
                  variant={this.state.selectedMap === 'jet' ? 'contained' : 'outlined'}
                  onClick={() => this.setState({ displayedMap: this.state.jet_maps, selectedMap: 'jet' })}
                >
                  Jet Map
                </Button>
                <Button
                  variant={this.state.selectedMap === 'binary' ? 'contained' : 'outlined'}
                  onClick={() =>
                    this.setState({
                      displayedMap: this.state.binary_maps,
                      selectedMap: 'binary',
                    })
                  }
                >
                  Binary Map
                </Button>
              </ButtonGroup>

              <div style={{ paddingLeft: '3%', paddingRight: '3%' }}>
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
                    <SwiperSlide key={index} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
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
                        {this.state.showResizedImg && (
                          <img
                            style={{
                              height: 230,
                              width: '75%',
                              left: '38px',
                              top: 36,
                              position: 'absolute',
                              objectFit: 'cover',
                            }}
                            alt="The house from the offer."
                            src={this.state.resizedImg}
                          />
                        )}
                        <img
                          style={{
                            height: '100%',
                            width: '75%',
                            objectFit: 'cover',
                            objectPosition: '50% 50%',
                          }}
                          alt="The house from the offer."
                          src={`data:image/jpeg;base64,${imageSet}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }}>
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
                  onChange={() => this.setState({ showResizedImg: !this.state.showResizedImg })}
                />
                Show explainability Map
              </div>
              <Divider sx={{ margin: '30px auto', width: '80%' }} />
              <div style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }}>
                <Typography sx={{ fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600 }}>
                  Download Chest X-Ray Report
                </Typography>
              </div>
              <div style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                <PdfComponent
                  gradcam={this.state.gradcam}
                  accuracy={this.state.accuracy}
                  disease={this.state.disease}
                  approval={this.state.approval}
                  report={this.state.report}
                  radiologyOpinion={this.state.radiologyOpinion}
                  originalImg={this.state.resizedImg}
                  opacity={this.state.opacity}
                />
              </div>
              {/*    Vertical Space*/}
              <div style={{ height: '10vh' }}></div>
            </>
          )}
        </div>
      </Layout>
    );
  };
}

export default AttentionMap;
