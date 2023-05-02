import React from 'react';
import './pdfStyles.css'
import Header from '../common/Header';
import Footer from '../common/Footer';

class DataComponent extends React.Component {
    render() {
      return (
        <div className='pdfDownloader'>
            <Header title="ChestXpert: PDF Report" subtitle="By Wimukthi Indeewara, Mahela Hennayake, Kasun Rathnayake, Sahan Samarakoon"/>
            <div className='content'>
                <div style={{marginBottom: 40}}>
                    <h1>Original X-Ray:</h1>
                    <div>
                    <img
                        style={{ width: '25%'}}
                        alt="The house from the offer."
                        src={this.props.originalImg}
                    />
                    </div>
                </div>
                <div style={{marginBottom: 40}}>
                    <h1>Generated Report:</h1>
                    <div>
                        {this.props.report}
                    </div>
                </div>
                <div style={{marginBottom: 40,fontStyle:'italic'}}>
                It should be noted that the chestXpert team cannot be held responsible for any errors or inaccuracies in the automated generated reports. Use of the system is entirely at the user's own risk.
                </div>
            </div>
            <Footer/>
        </div> 
      );
    }
  }
  export default DataComponent;