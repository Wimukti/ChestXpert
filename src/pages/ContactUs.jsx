import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import FeebackForm from '../components/contact-us/FeebackForm';
import OurTeam from '../components/contact-us/OurTeam';
import React from 'react';
import Layout from '../components/Layout.jsx';

class ContactUs extends React.Component {
  render = () => {
    return (
      <Layout>
        <Header
          title="ChestXpert: Contact Us"
          subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."
        />
        <FeebackForm />
        <OurTeam />
        <Footer />
      </Layout>
    );
  };
}

export default ContactUs;
