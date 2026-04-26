import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ExerciseCard from '../components/ExerciseCard';
import API from '../api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Helper to normalize ID
  const getId = (item) => String(item?.id || item?._id || item?.idExercise || "");

  // 🔥 Load favorites from backend
  const loadFavorites = async () => {
    try {
      setLoading(true);

      const res = await API.get('/favorites');

      console.log("FAVORITES RESPONSE:", res.data);

      // Always ensure array
      setFavorites(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // ❌ Remove locally (instant UI update)
  const handleRemoveLocal = (id) => {
    setFavorites(prev =>
      prev.filter(item => getId(item) !== id)
    );
  };

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
          {favorites.map((exercise) => {
            const id = getId(exercise);

            return (
              <ExerciseCard
                key={id}
                exercise={exercise}
                isFavorite={true} // ✅ always true on favorites page
                onRemoveLocal={handleRemoveLocal}
              />
            );
          })}
        </Stack>
      )}

    </Box>
  );
};

export default Favorites;