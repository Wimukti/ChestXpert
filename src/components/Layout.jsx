import Drawer from '@mui/material/Drawer';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';

function Layout({ children }) {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <div>
      {!showDrawer && (
        <div className="drawer-btn" onClick={toggleDrawer}>
          <ChevronRightIcon style={{ fontSize: '22px' }} />
        </div>
      )}

      <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
        <div className="drawer">
          <div style={{ textAlign: 'right', margin: '10px' }}>
            <IconButton style={{ color: 'white' }} onClick={toggleDrawer}>
              <CloseIcon style={{ fontSize: '20px' }} />
            </IconButton>
          </div>
          <div className="items-container">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AirplayOutlinedIcon style={{ marginLeft: '12px' }} />
              <span style={{ fontSize: '25px', marginLeft: 20 }}>Main Menu</span>
            </div>

            <Divider color="gray" style={{ marginTop: 12, marginBottom: 12 }}></Divider>

            <div id="sidebar">
              <NavLink to="/home">
                <HomeOutlinedIcon />
                <span>Home</span>
              </NavLink>
              <NavLink to="/results">
                <LeaderboardOutlinedIcon />
                <span>Results</span>
              </NavLink>
              <NavLink to="/usability">
                <GroupOutlinedIcon />
                <span>Usability</span>
              </NavLink>
              <NavLink to="/user-manual">
                <MapOutlinedIcon />
                <span>User Manual</span>
              </NavLink>
              <NavLink to="/chestxpert">
                <AssignmentOutlinedIcon />
                <span>ChestXpert</span>
              </NavLink>
              <NavLink to="/configuration">
                <SettingsOutlinedIcon />
                <span>Configuration</span>
              </NavLink>
              <NavLink to="/contact-us">
                <LocalPhoneOutlinedIcon />
                <span>Contact Us</span>
              </NavLink>
            </div>
          </div>
        </div>
      </Drawer>

      <div>{children}</div>
    </div>
  );
}

export default Layout;
