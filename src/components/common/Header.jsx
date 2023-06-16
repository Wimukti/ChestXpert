import './styles.css';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

function Header({ title, subtitle, showActionButton = false }) {
  const navigate = useNavigate();

  const [headerStyle, setBgColor] = useState({ background: 'transparent' });

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setBgColor({ background: `rgba(59, 59, 59, ${(window.scrollY - 50) / 100})` });
      } else {
        setBgColor({ background: 'transparent' });
      }
    });
  }, []);
  return (
    <>
      <div
        style={headerStyle}
        className="fixed text-white  w-screen px-10 py-5  hidden md:block border-b-[1px] border-white/25 z-10"
      >
        <div className="max-w-[1140px] mx-auto flex justify-between items-center">
          <div>
            <img style={{ width: 200 }} src="/ChestXpert.png"></img>
          </div>
          <div className="flex gap-7 font-bold items-center">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/results">Results</NavLink>
            <NavLink to="/usability">Usability</NavLink>
            <NavLink to="/user-manual">User Manual</NavLink>
            <NavLink to="/chestxpert">ChestXpert</NavLink>
            <NavLink to="/configuration">Configuration</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container">
          <div className="titles-container md:mt-20">
            <Fade triggerOnce duration={1500}>
              <div className="page-title">{title}</div>
              <div className="page-sub-title">{subtitle}</div>
            </Fade>
            {showActionButton && (
              <div style={{ paddingTop: 10 }}>
                <Button
                  sx={{
                    backgroundColor: '#c52a25',
                    '&:hover': {
                      backgroundColor: '#7a100c',
                    },
                  }}
                  variant="contained"
                  style={{ marginRight: 10 }}
                  onClick={() => navigate('/chestxpert')}
                >
                  Start ChestXpert
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#c52a25',
                    '&:hover': {
                      backgroundColor: '#7a100c',
                    },
                  }}
                  variant="contained"
                  onClick={() => navigate('/user-manual')}
                >
                  User Manual
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
