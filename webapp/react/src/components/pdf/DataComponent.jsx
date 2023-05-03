import React from 'react';
import './pdfStyles.css'
import Header from '../common/Header';
import Footer from '../common/Footer';

class DataComponent extends React.Component {
    render() {
        return (
            <div className='pdfDownloader'>
                <div style={{marginBottom:40}}>
                <Header  title="ChestXpert: PDF Report"
                        subtitle="Developed by Wimukthi Indeewara, Mahela Hennayake, Kasun Rathnayake, Sahan Samarakoon"/>
                </div>
              
                <div className='content'>
                    {this.props.showUserDetails}

                    {
                        this.props.showUserDetails &&
                        <div style={{marginBottom: 40}}>
                            <h1>Patient Details:</h1>
                            <div>
                                <div>
                                    Name: {this.props.patientDetails.name}
                                </div>
                                <div>
                                    Age: {this.props.patientDetails.age} years old
                                </div>
                                <div>
                                    Sex: {this.props.patientDetails.sex}
                                </div>
                            </div>
                    </div>
                    }
                    <div style={{marginBottom: 40}}>
                        <h1>Original X-Ray:</h1>
                        <div>
                            <img
                                style={{width: '25%'}}
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
                    <div style={{marginBottom: 40, fontStyle: 'italic'}}>
                        It should be noted that the chestXpert team cannot be held responsible for any errors or
                        inaccuracies in the automated generated reports. Use of the system is entirely at the user's own
                        risk.
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default DataComponent;