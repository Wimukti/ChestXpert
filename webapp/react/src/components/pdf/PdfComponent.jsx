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
class PdfComponent extends React.Component {
    state = {
        showUserDetailsForm:true,
        patientDetails:{
            name:'',
            age: 0,
            sex:'Male'
        }
    }

    render() {
        return (
            <div>
                <div style={{display:'flex', alignItems:'center', marginBottom:20}}>
                    <Checkbox onChange={()=>this.setState({showUserDetailsForm: !this.state.showUserDetailsForm})}  checked={this.state.showUserDetailsForm}/> 
                    <span>
                        Include Patient Details in report
                    </span> 
                </div>

                {this.state.showUserDetailsForm && 
                <Box sx={{padding: '0px 0px 30px 10px', width: {xs:'100%', md:500}}}>
                     <TextField onChange={(event)=>this.setState({patientDetails:{...this.state.patientDetails,name:event.target.value}})} value={this.state.patientDetails.name} fullWidth id="name-input" label="Name" variant="outlined" style={{marginBottom:10}}/>
                     <TextField onChange={(event)=>this.setState({patientDetails:{...this.state.patientDetails,age:event.target.value}})} value={this.state.patientDetails.age} fullWidth id="age-input" label="Age" variant="outlined" type='number' style={{marginBottom:10}}/>
                     <Select
                     fullWidth
                        value={this.state.patientDetails.sex}
                        label="Sex"
                        onChange={(event)=>this.setState({patientDetails:{...this.state.patientDetails,sex:event.target.value}})}
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                </Box>
                }
                
                
                <ReactToPrint
                    content={() => this.componentRef}
                    trigger={() => <Button variant="contained" startIcon={<FileDownloadIcon/>}>
                        Download Report</Button>}
                />
                <DataComponent patientDetails={this.state.patientDetails} showUserDetails={this.state.showUserDetailsForm} {...this.props} ref={(response) => (this.componentRef = response)}/>
            </div>
        );
    }
}

export default PdfComponent;