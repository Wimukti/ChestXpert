import React from 'react';
import ReactToPrint from 'react-to-print';
import DataComponent from './DataComponent';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../src/firebase.js';
import Alert from '@mui/material/Alert';

class PdfComponent extends React.Component {
  state = {
    showUserDetailsForm: false,
    patientDetails: {
      name: '',
      age: 0,
      sex: 'Male',
    },
    agreePrivacyPolicy: false,
    open: false,
    sendFirebaseData: false,
    showAlert: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  saveDataToFirebase = async () => {
    if (this.props.radiologyOpinion && this.state.sendFirebaseData) {
      try {
        const docRef = await addDoc(collection(db, 'cxr-reports'), {
          report: this.props.radiologyOpinion,
          image: this.props.originalImg.slice(0, 200),
        });
        console.log('Document written with ID: ', docRef.id);
        this.setState({ showAlert: true });
        setTimeout(() => {
          this.setState({ showAlert: false });
        }, 2000);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  render() {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <Checkbox
            sx={{ color: '#c52a25', '&.Mui-checked': { color: '#c52a25' } }}
            onChange={() => this.setState({ showUserDetailsForm: !this.state.showUserDetailsForm })}
            checked={this.state.showUserDetailsForm}
          />
          <span>Include Patient Details in report</span>
        </div>

        {this.state.showUserDetailsForm && (
          <Box sx={{ padding: '0px 0px 10px 0px', width: { xs: '100%', md: 500 } }}>
            <div style={{ paddingLeft: 45 }}>
              <TextField
                onChange={(event) =>
                  this.setState({
                    patientDetails: {
                      ...this.state.patientDetails,
                      name: event.target.value,
                    },
                  })
                }
                value={this.state.patientDetails.name}
                fullWidth
                id="name-input"
                label="Full Name"
                variant="outlined"
                style={{ marginBottom: 10 }}
              />
              <TextField
                onChange={(event) =>
                  this.setState({
                    patientDetails: {
                      ...this.state.patientDetails,
                      age: event.target.value,
                    },
                  })
                }
                value={this.state.patientDetails.age}
                fullWidth
                id="age-input"
                label="Age"
                variant="outlined"
                type="number"
                style={{ marginBottom: 10 }}
              />
              <Select
                style={{ marginBottom: 10 }}
                fullWidth
                value={this.state.patientDetails.sex}
                label="Sex"
                onChange={(event) =>
                  this.setState({
                    patientDetails: {
                      ...this.state.patientDetails,
                      sex: event.target.value,
                    },
                  })
                }
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
              </Select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                sx={{ color: '#c52a25', '&.Mui-checked': { color: '#c52a25' } }}
                onChange={() => this.setState({ agreePrivacyPolicy: !this.state.agreePrivacyPolicy })}
                checked={this.state.agreePrivacyPolicy}
              />
              <span>
                I agree to{' '}
                <span style={{ cursor: 'pointer', color: '#c52a25' }} onClick={() => this.setState({ open: true })}>
                  {' '}
                  Privacy Policy{' '}
                </span>
              </span>
            </div>
          </Box>
        )}

        {this.props.radiologyOpinion && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <Checkbox
              sx={{ color: '#c52a25', '&.Mui-checked': { color: '#c52a25' } }}
              onChange={() => this.setState({ sendFirebaseData: !this.state.sendFirebaseData })}
              checked={this.state.sendFirebaseData}
            />
            <span>
              I agree to furnish the manually written medical report and Chest X-Ray to enhance the performance of the
              framework.
            </span>
          </div>
        )}

        <span onClick={this.saveDataToFirebase}>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => (
              <Button
                disabled={this.state.showUserDetailsForm ? !this.state.agreePrivacyPolicy : false}
                sx={{
                  backgroundColor: '#c52a25',
                  '&:hover': {
                    backgroundColor: '#7a100c',
                  },
                }}
                size="large"
                variant="contained"
                startIcon={<FileDownloadIcon />}
              >
                Download Report
              </Button>
            )}
          />
        </span>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Privacy Policy for ChestXpert</DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                At ChestXpert, accessible from chestxpert.live, one of our main priorities is the privacy of our
                visitors. This Privacy Policy document contains types of information that is collected and recorded by
                ChestXpert and how we use it. If you have additional questions or require more information about our
                Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities
                and is valid for visitors to our website with regards to the information that they shared and/or collect
                in ChestXpert. This policy is not applicable to any information collected offline or via channels other
                than this website.
                <br />
                <br />
                <strong>Consent</strong>
                <br />
                <br />
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                <br />
                <br />
                <strong>Information we collect</strong>
                <br />
                <br />
                The personal information that you are asked to provide, and the reasons why you are asked to provide it,
                will be made clear to you at the point we ask you to provide your personal information. If you contact
                us directly, we may receive additional information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may send us, and any other information you
                may choose to provide. When you register for an Account, we may ask for your contact information,
                including items such as name, company name, address, email address, and telephone number.
                <br />
                <br />
                <strong>How we use your information</strong>
                <br />
                <br />
                We use the information we collect in various ways, including to:
                <ul>
                  <li>Provide, operate, and maintain our webste</li>
                  <li>Improve, personalize, and expand our webste</li>
                  <li>Understand and analyze how you use our webste</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>
                    Communicate with you, either directly or through one of our partners, including for customer
                    service, to provide you with updates and other information relating to the webste, and for marketing
                    and promotional purposes
                  </li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>
                <br />
                <br />
                <strong>Log Files</strong>
                <br />
                <br />
                ChestXpert follows a standard procedure of using log files. These files log visitors when they visit
                websites. All hosting companies do this and a part of hosting services' analytics. The information
                collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider
                (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not
                linked to any information that is personally identifiable. The purpose of the information is for
                analyzing trends, administering the site, tracking users' movement on the website, and gathering
                demographic information.
                <br />
                <br />
                <strong>Third Party Privacy Policies</strong>
                <br />
                <br />
                ChestXpert's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you
                to consult the respective Privacy Policies of these third-party ad servers for more detailed
                information. It may include their practices and instructions about how to opt-out of certain options.
                <br />
                <br />
                <strong>GDPR Data Protection Rights</strong>
                <br />
                <br />
                We would like to make sure you are fully aware of all of your data protection rights. Every user is
                entitled to the following:
                <ul>
                  <li>
                    The right to access – You have the right to request copies of your personal data. We may charge you
                    a small fee for this service.
                  </li>
                  <li>
                    The right to rectification – You have the right to request that we correct any information you
                    believe is inaccurate. You also have the right to request that we complete the information you
                    believe is incomplete.
                  </li>
                  <li>
                    The right to erasure – You have the right to request that we erase your personal data, under certain
                    conditions.
                  </li>
                  <li>
                    The right to restrict processing – You have the right to request that we restrict the processing of
                    your personal data, under certain conditions.
                  </li>
                  <li>
                    The right to object to processing – You have the right to object to our processing of your personal
                    data, under certain conditions.
                  </li>
                  <li>
                    The right to data portability – You have the right to request that we transfer the data that we have
                    collected to another organization, or directly to you, under certain conditions.
                  </li>
                </ul>
                <br />
                <br />
                If you make a request, we have one month to respond to you. If you would like to exercise any of these
                rights, please contact us.
                <br />
                <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        <DataComponent
          patientDetails={this.state.patientDetails}
          showUserDetails={this.state.showUserDetailsForm}
          {...this.props}
          ref={(response) => (this.componentRef = response)}
        />
        {this.state.showAlert && (
          <Alert severity="success" sx={{ marginTop: '20px' }}>
            Thank You! You Medical Report is successfully Saved!
          </Alert>
        )}
      </div>
    );
  }
}

export default PdfComponent;
