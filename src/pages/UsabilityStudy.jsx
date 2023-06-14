import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Usability from '../components/usability/Usability';
import Review from '../components/usability/Review';
import React from 'react';
import Layout from '../components/Layout.jsx';

class UsabilityStudy extends React.Component {
  render = () => {
    return (
      <Layout>
        <Header
          title="ChestXpert: Usability"
          subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."
        />
        <Usability />
        <Review />
        <Footer />
      </Layout>
    );
  };
}

export default UsabilityStudy;
