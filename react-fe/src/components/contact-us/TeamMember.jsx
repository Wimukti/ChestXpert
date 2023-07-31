import React from 'react';

import EmailIcon from '@mui/icons-material/Email';

export default function Overview({ name, img, email, linkedIn, github }) {
  return (
    <div>
      <div className="text-center flex justify-center">
        <img style={{ width: 150, height: 150, borderRadius: '100%', objectFit: 'cover' }} src={img} />
      </div>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>{name}</div>
      <div style={{ textAlign: 'center', margin: 'auto', width: 220, marginTop: 5 }}>
        <div>
          <EmailIcon style={{ marginRight: 5, fontSize: 20 }} />
          {email}
        </div>
      </div>
    </div>
  );
}
