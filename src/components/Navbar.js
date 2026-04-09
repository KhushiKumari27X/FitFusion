import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#ff9800' : '#fff',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    transition: '0.3s',
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      sx={{
        px: { xs: '20px', md: '40px' },
        py: '15px',
        position: 'sticky',
        top: 0,
        zIndex: 100,

        //  FIXED PROFESSIONAL LOOK
        backdropFilter: 'blur(6px)',   // reduced blur
        background: 'rgba(15, 32, 39, 0.85)', // darker solid feel
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo + Brand */}
      <Stack direction="row" alignItems="center" gap="10px">
        <img
          src={Logo}
          alt="logo"
          style={{ width: '40px', height: '40px' }}
        />
        <Typography
          fontSize={{ xs: '16px', md: '20px' }}
          fontWeight="bold"
          sx={{ color: '#fff' }}
        >
          FitTrack Pro
        </Typography>
      </Stack>

      {/* Navigation Links */}
      <Stack
        direction="row"
        gap={{ xs: '20px', md: '40px' }}
        fontSize={{ xs: '14px', md: '18px' }}
        alignItems="center"
        mt={{ xs: '10px', md: '0px' }}
      >
        <Link to="/" style={linkStyle('/')}>
          Home
        </Link>

        <a
          href="#exercises"
          style={{
            ...linkStyle('/exercises'),
          }}
          onMouseEnter={(e) => (e.target.style.color = '#ff9800')}
          onMouseLeave={(e) => (e.target.style.color = '#fff')}
        >
          Exercises
        </a>

        <Link
          to="/favorites"
          style={linkStyle('/favorites')}
          onMouseEnter={(e) => (e.target.style.color = '#ff9800')}
          onMouseLeave={(e) =>
            (e.target.style.color =
              location.pathname === '/favorites' ? '#ff9800' : '#fff')
          }
        >
          Favorites
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;