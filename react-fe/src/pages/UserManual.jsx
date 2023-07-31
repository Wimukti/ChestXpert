import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SelectFile from '../components/userManual/SelectFile';
import AdvancedConfig from '../components/userManual/AdvancedConfig';
import ImageManipulation from '../components/userManual/EditImage';
import GenaratedReport from '../components/userManual/GenaratedReport';
import ModelExplainability from '../components/userManual/ModelExplainability';
import React from 'react';
import Layout from '../components/Layout.jsx';
import { Slide } from 'react-awesome-reveal';

class UserManual extends React.Component {
  render = () => {
    return (
      <Layout>
        <Header
          title="ChestXpert: User Manual"
          subtitle="This software is designed to generate medical reports for chest X-ray images. In this user manual, we will explain how to use the software to generate a report."
        />
        <Slide delay={500} duration={1500} triggerOnce>
          <SelectFile />
        </Slide>

        <Slide delay={500} duration={1500} triggerOnce direction="right">
          <ImageManipulation />
        </Slide>

        <Slide duration={1500} triggerOnce>
          <GenaratedReport />
        </Slide>

        <Slide duration={1500} triggerOnce direction="right">
          <ModelExplainability />
        </Slide>

        <Slide duration={1500} triggerOnce>
          <AdvancedConfig />
        </Slide>

        <Footer />
      </Layout>
    );
  };
}

export default UserManual;
