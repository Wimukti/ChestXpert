// import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Typography from '@mui/material/Typography';
//
// export default function Dropzone(props) {
//   const { getRootProps, getInputProps, open, acceptedFiles, onDrop } = useDropzone({
//     // Disable click and keydown behavior
//     noClick: true,
//     noKeyboard: true,
//   });
//
//   return (
//     <div style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }}>
//       <Typography sx={{ fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600 }}>Upload Chest X-Ray Image:</Typography>
//       <div
//         style={{ background: 'rgb(225,224,224)', marginTop: 40, padding: '30px 40px', borderRadius: 5 }}
//         className="container"
//       >
//         <div {...getRootProps({ className: 'dropzone' })}>
//           <input {...getInputProps()} />
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
//               <CloudUploadOutlinedIcon style={{ fontSize: 40 }} />
//               <div>
//                 <Typography fontWeight={600}>Drag and drop file here</Typography>
//                 <Typography marginTop={'2px'}>Limit 200MB per file. PNG, JPG, JPEG</Typography>
//               </div>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <div style={{ background: 'white', padding: '8px 12px', borderRadius: '2px' }} onClick={open}>
//                 Browse Files
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { createRef } from 'react';
import Dropzone from 'react-dropzone';

export default function DropzoneA(props) {
  const dropzoneRef = createRef();
  const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const handleFileChange = (files) => {
    props.handleFileChange(files);
  };

  // Disable click and keydown behavior on the <Dropzone>
  return (
    <Dropzone onDrop={handleFileChange} ref={dropzoneRef} noClick noKeyboard>
      {({ getRootProps, getInputProps, acceptedFiles }) => {
        return (
          <div style={{ marginBottom: 15, paddingLeft: '10%', paddingRight: '10%' }} onClick={openDialog}>
            <Typography sx={{ fontSize: 'calc(1.3rem + .6vw)', fontWeight: 600 }}>Upload Chest X-Ray Image:</Typography>
            <div
              style={{ background: 'rgb(225,224,224)', marginTop: 40, padding: '30px 40px', borderRadius: 5 }}
              className="container"
            >
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <CloudUploadOutlinedIcon style={{ fontSize: 40 }} />
                    <div>
                      <Typography fontWeight={600}>Drag and drop file here</Typography>
                      <Typography marginTop={'2px'}>Limit 200MB per file. PNG, JPG, JPEG</Typography>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{ background: 'white', padding: '8px 12px', borderRadius: '2px', cursor: 'pointer' }}
                      onClick={openDialog}
                    >
                      Browse Files
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
}
