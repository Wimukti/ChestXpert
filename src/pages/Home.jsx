import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Intro from '../components/home/Intro';
import Overview from '../components/home/Overview';
import Dataset from '../components/home/Dataset';
import Importance from '../components/home/Importance';
import Model from '../components/home/Model';
import React from 'react';

import Layout from '../components/Layout.jsx';

function Home() {
  return (
    <Layout>
      <Header
        title="ChestXpert: Revolutionize Chest X-ray Report Generation with ChestXpert"
        subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."
        showActionButton={true}
      />
      <Intro />
      <Overview />
      <Model />
      <Dataset />
      <Importance />
      <Footer />
    </Layout>
  );
}

export default Home;
