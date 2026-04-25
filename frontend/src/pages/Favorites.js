import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ExerciseCard from '../components/ExerciseCard';
import API from '../api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader'; // 🔥 add this

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch from backend
  const loadFavorites = async () => {
    try {
      setLoading(true);
      const res = await API.get('/favorites');
      setFavorites(res.data);
    } catch (err) {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // 🔥 Remove favorite (NO reload)
  const handleRemoveLocal = (id) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  // ⏳ REAL LOADER
  if (loading) return <Loader />;

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

      {/* 📭 EMPTY STATE (improved) */}
      {favorites.length === 0 ? (
        <Box textAlign="center" mt="60px">
          <Typography color="#ccc" fontSize="20px">
            No favorites yet ❤️
          </Typography>
          <Typography color="#777" mt="10px">
            Start exploring and save your workouts!
          </Typography>
        </Box>
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap"
          gap="30px"
          justifyContent="center"
        >
          {favorites.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onRemoveLocal={handleRemoveLocal}
            />
          ))}
        </Stack>
      )}

    </Box>
  );
};

export default Favorites;