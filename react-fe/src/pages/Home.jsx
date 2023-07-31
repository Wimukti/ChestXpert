import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Intro from '../components/home/Intro';
import Overview from '../components/home/Overview';
import Dataset from '../components/home/Dataset';
import Importance from '../components/home/Importance';
import Model from '../components/home/Model';
import { Slide } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import Layout from '../components/Layout.jsx';
import { Button } from '@mui/material';

function Home() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        title="ChestXpert: Revolutionize Chest X-ray Report Generation with ChestXpert"
        subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."
        showActionButton={true}
        showContent={false}
      />
      <div className="relative">
        <video
          style={{ height: '100vh', objectFit: 'cover', width: '100vw' }}
          src="/Red 1.mp4"
          type="video/mp4"
          autoPlay
          loop
          playsInline
          muted
        ></video>
        <Fade delay={100} duration={5000} triggerOnce>
          <div
            style={{ zIndex: 10000 }}
            className="absolute bottom-[120px] text-white text-center md:text-left w-screen"
          >
            <div
              style={{ fontFamily: 'DM Sans' }}
              className="text-bold text-[60px] leading-[65px] md:w-[1130px] mx-auto"
            >
              Revolutionize <br />
              Chest X-ray Analysis <br /> with ChestXpert
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-[1.5rem]  p-10 md:p-0 md:w-[1130px] mx-auto">
              <Button
                sx={{
                  display: 'block',
                  padding: '15px 25px',
                  fontSize: 15,
                  color: '#891313',
                  fontWeight: 'bold',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: '#891313',
                    color: 'white',
                  },
                }}
                variant="contained"
                style={{ marginRight: 10 }}
                onClick={() => navigate('/chestxpert')}
              >
                Start ChestXpert
              </Button>
              <Button
                className="btn-anim"
                sx={{
                  display: 'block',
                  padding: '15px 25px',
                  fontSize: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: 10,
                  backgroundColor: '#891313',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#891313',
                  },
                  minWidth: '236px',
                }}
                variant="contained"
                onClick={() => navigate('/user-manual')}
              >
                User Manual
              </Button>
            </div>
          </div>
        </Fade>
      </div>

      <Slide delay={500} duration={1500} triggerOnce>
        <Intro />
      </Slide>
      <Slide delay={500} duration={1500} triggerOnce direction="right">
        <Overview />
      </Slide>
      <Slide duration={1500} triggerOnce>
        <Model />
      </Slide>
      <Slide duration={1500} triggerOnce direction="right">
        <Dataset />
      </Slide>
      <Slide duration={1500} triggerOnce>
        <Importance />
      </Slide>
      <Footer />
    </Layout>
  );
}

export default Home;
