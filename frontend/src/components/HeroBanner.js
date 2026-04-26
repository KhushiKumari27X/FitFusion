import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import HeroBannerImage from '../assets/images/banner.png';
import ImageOne from '../assets/images/freepik-export-20240506184916tBaZ.jpeg';
import ImageTwo from '../assets/images/ImageTwo.jpeg';
import ImageThree from '../assets/images/ImageThree.jpeg';

const images = [ImageOne, ImageTwo, ImageThree]; // static (no state)

const HeroBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []); //  no dependency issue

  return (
    <Box
      sx={{
        mt: { lg: '155px', xs: '60px' },
        ml: { sm: '50px' }
      }}
      position="relative"
      p="20px"
    >
      <Typography color="#FF2625" fontWeight="600" fontSize="36px">
        Fitness Club
      </Typography>

      <Typography
        color="#fff"
        fontWeight={700}
        sx={{ fontSize: { lg: '60px', xs: '40px' } }}
        mb="23px"
        mt="10px"
      >
        Sweat, Smile <br />
        And Repeat
      </Typography>

      <Typography color="#fff" fontSize="25px" fontFamily="Alegreya">
        Check out the most effective exercises personalized to you
      </Typography>

      <Stack>
        <a
          href="#exercises"
          style={{
            marginTop: '45px',
            textDecoration: 'none',
            width: '200px',
            textAlign: 'center',
            background: '#FF2625',
            padding: '14px',
            fontSize: '22px',
            color: 'white',
            borderRadius: '4px'
          }}
        >
          Explore Exercises
        </a>
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
          transform: 'translateY(-50%) rotate(90deg)'
        }}
      >
        Exercise
      </Typography>

      <img
        src={images[index]}
        alt="exercise preview"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          height: '300px'
        }}
      />

      <img
        src={HeroBannerImage}
        alt="hero banner"
        className="hero-banner-img"
      />
    </Box>
  );
};

export default HeroBanner;