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
import io from 'socket.io-client';
import Footer from '../components/common/Footer.jsx';

const configDeafult = {
  options: 'Greedy',
  seed: 42,
  temperature: 1.0,
  top_k: 0,
  top_p: 1,
  attention_head: -1,
};

class ChestXPert extends React.Component {
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
    gradcam: ``,
    disease: '',
    accuracy: '',
    approval: -1,
    radiologyOpinion: '',
    loading: false,
    hasResponse: false,
    activeStep: 0,
    socket: null,
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

  componentDidMount() {
    const socketInstance = io('https://api.chestxpert.live/', { maxHttpBufferSize: 1024 * 1024 * 1024 });

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      this.setState({ socket: socketInstance });
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Disconnected from server,', reason);
      this.setState({ loading: false, hasResponse: false, socket: null });
    });

    // Custom event listener for server response
    socketInstance.on('generated_report', (data) => {
      console.log('Received server response:', data);
      this.handleResponse(data);
      // Process the server response
    });
  }
  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.disconnect();
    }
  }

  handleResponse(response) {
    let att_maps = response['attention_map'];
    let jet_maps = response['jet_images'];
    let binary_maps = response['binary_images'];

    this.setState({
      activeStep: 2,
      report: response['report'],
      disease: response['prediction'],
      accuracy: parseFloat(response['accuracy']),
      gradcam: `data:image/jpeg;base64,${response['gradcam']}`,
    });

    const objectWithMaxProbability = response['classification'].reduce((maxObject, currentObject) => {
      if (currentObject.probability > maxObject.probability) {
        return currentObject;
      }
      return maxObject;
    }, response['classification'][0]);

    this.setState({ disease: objectWithMaxProbability.class, accuracy: objectWithMaxProbability.probability });

    if (att_maps) {
      const maps = att_maps;
      const images = Object.keys(maps).map((key) => maps[key]);
      this.setState({ att_maps: images, displayedMap: images });
    }

    if (jet_maps) {
      const maps = jet_maps;
      const images = Object.keys(maps).map((key) => maps[key]);
      this.setState({ jet_maps: images });
    }

    if (binary_maps) {
      const maps = binary_maps;
      const images = Object.keys(maps).map((key) => maps[key]);
      this.setState({ binary_maps: images });
    }

    this.setState({ loading: false, hasResponse: true });
  }

  handleSave = async (image) => {
    this.setState({ loading: true, resizedImg: image, activeStep: 1 });

    let payload = { image: image.substring(image.indexOf(',') + 1) };
    try {
      const storedConfig = localStorage.getItem('config');
      if (storedConfig) {
        const jsonConfig = JSON.parse(storedConfig);
        payload = { ...payload, ...jsonConfig };
      } else {
        payload = { ...payload, ...configDeafult };
      }
      console.log(payload);
      this.state.socket.emit('generate_report', payload);
      console.log('Sent to socket');
    } catch (e) {
      this.setState({ loading: false, hasResponse: false });
      alert(e.message || 'Error !');
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
            minHeight: '500px',
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <CustomizedSteppers activeStep={this.state.activeStep} />
          </div>

          {this.state.socket ? (
            <>
              {this.state.originalImgFile ? (
                <ImageEditor handleSave={this.handleSave} upload_image={this.state.originalImgFile} />
              ) : (
                <FileUploader handleFileChange={this.handleFileChange} />
              )}
            </>
          ) : (
            <div className="text-center mt-24 font-bold text-3xl">Connecting to server...</div>
          )}

          {this.state.loading && (
            <Box sx={{ width: '50%', margin: 'auto', marginTop: 5 }}>
              <div className="flex justify-center mb-10">
                <img style={{ width: 300 }} src="/loading-video.gif" />
              </div>

              <LinearProgress />
              <Typography textAlign={'center'} marginTop={1} fontSize={20}>
                Generating your x-ray report. Please wait...
              </Typography>
            </Box>
          )}
          {this.state.hasResponse && (
            <>
              <div className="flex gap-20 justify-center">
                <div className="text-center">
                  <img src={this.state.resizedImg} alt="edited image" style={{ width: 200 }} />
                  Uploaded Image
                </div>
              </div>
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
        <Footer />
      </Layout>
    );
  };
}

export default ChestXPert;
