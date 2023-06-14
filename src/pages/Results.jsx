import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Survey from '../components/results/Survey';
import Classification from '../components/results/Classification';
import ReportGeneration from '../components/results/ReportGeneration';
import Layout from '../components/Layout.jsx';

function Results(props) {
  return (
    <Layout>
      <Header
        title="ChestXpert: Results"
        subtitle="Looking for a faster, more accurate way to diagnose chest X-rays? Look no further than ChestXpert - the radiologist-approved framework that uses cutting-edge Deep Learning techniques to analyze and generate detailed reports. With ChestXpert, you can streamline your radiology workflow and get the results you need in seconds."
      />
      <Survey></Survey>
      <Classification />
      <ReportGeneration />
      <Footer />
    </Layout>
  );
}

export default Results;
