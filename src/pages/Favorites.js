import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ExerciseCard from '../components/ExerciseCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const stored = JSON.parse(localStorage.getItem('favorites')) || [];
      console.log("FAVORITES:", stored);
      setFavorites(stored);
    };

    loadFavorites();

    // listen for updates (save/remove)
    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  return (
    <Box p="20px" minHeight="60vh">

      <Typography
        variant="h4"
        color="#fff"
        fontWeight="bold"
        mb="30px"
        textAlign="center"
      >
        Your Favorite Exercises
      </Typography>

      {favorites.length === 0 ? (
        <Typography color="#ccc" textAlign="center">
          No favorites added yet 
        </Typography>
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap"
          gap="30px"
          justifyContent="center"
        >
          {favorites.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id || index}
              exercise={exercise}
            />
          ))}
        </Stack>
      )}

    </Box>
  );
};

export default Favorites;