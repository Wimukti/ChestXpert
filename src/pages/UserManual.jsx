import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SelectFile from '../components/userManual/SelectFile';
import AdvancedConfig from '../components/userManual/AdvancedConfig';
import ImageManipulation from '../components/userManual/EditImage';
import GenaratedReport from '../components/userManual/GenaratedReport';
import ModelExplainability from '../components/userManual/ModelExplainability';
import React from 'react';
import Layout from '../components/Layout.jsx';

class UserManual extends React.Component {
  render = () => {
    return (
      <Layout>
        <Header
          title="ChestXpert: User Manual"
          subtitle="This software is designed to generate medical reports for chest X-ray images. In this user manual, we will explain how to use the software to generate a report."
        />
        <SelectFile />
        <ImageManipulation />
        <GenaratedReport />
        <ModelExplainability />
        <AdvancedConfig />

        <Footer />
      </Layout>
    );
  };
}

export default UserManual;
