import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Stack, Typography, Button } from '@mui/material';
import toast from "react-hot-toast";

import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  //  FINAL LOGOUT (with notification + delay)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Logged out successfully"); // notification

    // small delay so user can see toast
    setTimeout(() => {
      navigate("/");
      window.location.reload(); // keeps navbar updated
    }, 800);
  };

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
        backdropFilter: 'blur(6px)',
        background: 'rgba(15, 32, 39, 0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <Stack direction="row" alignItems="center" gap="10px">
        <img src={Logo} alt="logo" style={{ width: '40px', height: '40px' }} />
        <Typography
          fontSize={{ xs: '16px', md: '20px' }}
          fontWeight="bold"
          sx={{ color: '#fff' }}
        >
          FitFusion
        </Typography>
      </Stack>

      {/* Navigation */}
      <Stack
        direction="row"
        gap={{ xs: '15px', md: '30px' }}
        alignItems="center"
        mt={{ xs: '10px', md: '0px' }}
      >
        <Link to="/" style={linkStyle('/')}>Home</Link>

        <a href="#exercises" style={{ color: '#fff', textDecoration: 'none' }}>
          Exercises
        </a>

        <Link to="/favorites" style={linkStyle('/favorites')}>
          Favorites
        </Link>

        {/* AUTH SECTION */}
        {!user ? (
          <>
            <Link to="/login" style={{ color: '#fff' }}>Login</Link>
            <Link to="/register" style={{ color: '#ff9800', fontWeight: 'bold' }}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Typography sx={{ color: '#fff', fontSize: '14px' }}>
              Hi, {user.name}
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={handleLogout}
              sx={{
                background: '#ff2625',
                '&:hover': { background: '#e60023' }
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;