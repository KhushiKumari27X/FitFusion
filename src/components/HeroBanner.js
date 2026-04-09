import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import HeroBannerImage from '../assets/images/banner.png';
import ImageOne from '../assets/images/freepik-export-20240506184916tBaZ.jpeg';
import ImageTwo from '../assets/images/ImageTwo.jpeg';
import ImageThree from '../assets/images/ImageThree.jpeg';

const HeroBanner = () => {
  const [images, setImages] = useState([ImageOne, ImageTwo, ImageThree]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change images every 9 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    // <Box sx={{ mt: { lg: '212px', xs: '70px' }, ml: { sm: '50px' } }} position="relative" p="20px">
    // {<Box sx={{ mt: { lg: '200px', xs: '10px' }, ml: { sm: '50px' } }} position="relative" p="20px"> 
    <Box 
  sx={{ 
    mt: { lg: '155px', xs: '60px' },   // FIXED
    ml: { sm: '50px' } 
  }} 
  position="relative" 
  p="20px"
>
      <Typography color="#FF2625" 
      fontWeight="600"
       fontSize="36px"
       sx={{ mt:"5px"}}>
        Fitness Club
        </Typography>
      <Typography 
      color="#fff"
      fontWeight={700}
       sx={{ fontSize: { lg: '60px', xs: '40px' } }} 
       mb="23px" mt="10px">
        Sweat, Smile <br />
        And Repeat
      </Typography>
      <Typography
      color="#fff"
       fontSize="25px"
        fontFamily="Alegreya" 
        lineHeight="35px">
        Check out the most effective exercises personalized to you
      </Typography>
      <Stack>
        <a href="#exercises" style={{ marginTop: '45px', textDecoration: 'none', width: '200px', textAlign: 'center', background: '#FF2625', padding: '14px', fontSize: '22px', textTransform: 'none', color: 'white', borderRadius: '4px' }}>Explore Exercises</a>
      </Stack>
      <Typography 
        fontWeight={600} 
        color="#7EC8E3" 
        sx={{ 
          opacity: '0.1', 
          display: { lg: 'block', xs: 'none' }, 
          fontSize: '200px', 
          position: 'absolute', 
          top: '60%', 
          right: '10px', 
          
          transform: 'translateY(-50%) rotate(90deg)', // Rotate the text vertically
        }}
      >
        Exercise
      </Typography>
      <img src={images[index]} alt={`new-image-${index}`} 
      style={{ position: 'absolute', top: '20px', right: '20px', height: '300px', width: 'auto' }} />
      <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
    </Box>
  );
};

export default HeroBanner;
