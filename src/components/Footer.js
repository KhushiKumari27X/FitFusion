import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import Logo from '../assets/images/Logo.png';

const Footer = () => {
  return (
    <Box
      sx={{
        mt: '80px',
        py: '50px',
        px: { lg: '100px', xs: '20px' },
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* MAIN SECTION */}
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
      >
        {/* LOGO + BRAND */}
        <Stack direction="row" alignItems="center" gap="10px">
          <img src={Logo} alt="logo" style={{ width: '45px' }} />
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '22px',
              letterSpacing: '1px',
            }}
          >
            FitFusion
          </Typography>
        </Stack>

        {/* TAGLINE */}
        <Typography
          sx={{
            color: '#ccc',
            textAlign: 'center',
            maxWidth: '400px',
            fontSize: { lg: '16px', xs: '14px' },
          }}
        >
          Transform your body. Build your strength. Stay consistent 💪
        </Typography>

        {/* NAV LINKS */}
        <Stack direction="row" gap="25px">
          <a href="/" style={linkStyle}>Home</a>
          <a href="#exercises" style={linkStyle}>Exercises</a>
          <a href="/favorites" style={linkStyle}>Favorites</a>
        </Stack>

        {/* SOCIAL ICONS */}
        <Stack direction="row" gap="20px">
          <a href="#" style={iconStyle}><FaInstagram /></a>
          <a href="#" style={iconStyle}><FaGithub /></a>
          <a href="#" style={iconStyle}><FaLinkedin /></a>
        </Stack>
      </Stack>

      {/* DIVIDER */}
      <Box
        sx={{
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          mt: '30px',
        }}
      />

      {/* COPYRIGHT */}
      <Typography
        textAlign="center"
        color="#aaa"
        mt="20px"
        fontSize="14px"
      >
        © {new Date().getFullYear()} FitFusion. All rights reserved.
      </Typography>
    </Box>
  );
};

/*  LINK STYLE */
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '15px',
  position: 'relative',
  transition: '0.3s',
};

const iconStyle = {
  color: '#fff',
  fontSize: '20px',
  transition: '0.3s',
};

/*  HOVER EFFECTS */
document.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'A') {
    e.target.style.color = '#FF2625';
    e.target.style.transform = 'scale(1.1)';
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.tagName === 'A') {
    e.target.style.color = '#fff';
    e.target.style.transform = 'scale(1)';
  }
});

export default Footer;