import React from 'react';
import ReactToPrint from 'react-to-print';
import DataComponent from './DataComponent';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

class PdfComponent extends React.Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    content={() => this.componentRef}
                    trigger={() => <Button variant="contained" startIcon={<FileDownloadIcon/>}>
                        Download Report</Button>}
                />
                <DataComponent {...this.props} ref={(response) => (this.componentRef = response)}/>
            </div>
        );
    }
}

export default PdfComponent;