import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Loader from './Loader';

const ExerciseVideos = ({ exerciseVideos, name }) => {

  //  FIX: prevent crash when undefined
  if (!exerciseVideos || exerciseVideos.length === 0) {
    return <Loader />;
  }

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">

      {/* Heading */}
      <Typography
        sx={{ fontSize: { lg: '44px', xs: '25px' } }}
        fontWeight={700}
        color="#fff"   //  FIX: better visibility on dark bg
        mb="33px"
      >
        Watch{' '}
        <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>
          {name}
        </span>{' '}
        exercise videos
      </Typography>

      {/* Videos */}
      <Stack
        sx={{
          flexDirection: { lg: 'row' },
          gap: { lg: '40px', xs: '20px' },  //  reduced gap (cleaner UI)
        }}
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
      >
        {exerciseVideos.slice(0, 3).map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
              color: '#fff',
              width: '300px',   //  consistent card width
            }}
          >
            <img
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
              style={{
                borderRadius: '20px',
                width: '100%',
              }}
            />

            <Box mt="10px">
              <Typography
                sx={{ fontSize: { lg: '18px', xs: '16px' } }}
                fontWeight={600}
                color="#fff"
              >
                {item.video.title}
              </Typography>

              <Typography fontSize="14px" color="#aaa">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;