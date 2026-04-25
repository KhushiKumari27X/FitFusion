import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  // Fetch body parts
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  // Search function
  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.target.toLowerCase().includes(search.toLowerCase()) ||
          item.equipment.toLowerCase().includes(search.toLowerCase()) ||
          item.bodyPart.toLowerCase().includes(search.toLowerCase())
      );

      window.scrollTo({
        top: 1800,
        behavior: 'smooth',
      });

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">

      {/* Heading */}
      <Typography
        color="#fff"
        fontWeight={700}
        sx={{
          fontSize: { xs: '24px', sm: '30px', md: '36px', lg: '44px' },
          textAlign: 'center',
        }}
        mb="49px"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>

      {/*  UPDATED SEARCH BAR */}
      <Box
        mb="72px"
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: '90%', md: '70%', lg: '1170px' },
            background: '#fff',
            borderRadius: '40px',
            overflow: 'hidden',
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search Exercises..."
            sx={{
              px: 3,
              py: 1.5,
              input: {
                fontWeight: '600',
                fontSize: '16px',
              },
            }}
          />

          <Button
            onClick={handleSearch}
            sx={{
              bgcolor: '#FF2625',
              color: '#fff',
              px: { xs: 2, md: 4 },
              height: '100%',
              borderRadius: '0 40px 40px 0',
              textTransform: 'none',
              fontSize: { xs: '12px', md: '16px' },
              minWidth: { xs: '80px', sm: '120px' },

              transition: 'all 0.2s ease',

              '&:hover': {
                bgcolor: '#e31c1c',
              },
              '&:active': {
                bgcolor: '#cc1a1a',
                transform: 'scale(0.97)',
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Body Parts Scroll */}
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </Box>

    </Stack>
  );
};

export default SearchExercises;