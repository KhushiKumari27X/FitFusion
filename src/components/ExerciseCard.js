import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorites";

  //  SAFE ID HANDLER
  const getId = (item) => String(item?.id || item?.idExercise || "");

  //  SAVE FUNCTION
  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!exercise) return;

    let favs = JSON.parse(localStorage.getItem('favorites') || '[]');

    const exists = favs.find(
      (item) => getId(item) === getId(exercise)
    );

    if (!exists) {
      const newItem = {
        id: getId(exercise),
        name: exercise?.name || "Exercise",
        gifUrl: exercise?.gifUrl || "",
        bodyPart: exercise?.bodyPart || "unknown",
        target: exercise?.target || "unknown",
      };

      favs.push(newItem);
      localStorage.setItem('favorites', JSON.stringify(favs));

      alert("Added to Favorites ");

      //  notify update
      window.dispatchEvent(new Event("favoritesUpdated"));
    } else {
      alert("Already in Favorites ");
    }
  };

  //  REMOVE FUNCTION
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let favs = JSON.parse(localStorage.getItem('favorites') || '[]');

    const updated = favs.filter(
      (item) => getId(item) !== getId(exercise)
    );

    localStorage.setItem('favorites', JSON.stringify(updated));

    alert("Removed from Favorites ");

    //  notify update
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  if (!exercise || !getId(exercise)) return null;

  return (
    <Stack
      sx={{
        background: '#1e293b',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: '0.3s',
        width: '300px',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        },
      }}
    >
      {/* CLICKABLE CARD */}
      <Link
        to={`/exercise/${getId(exercise)}`}
        style={{ textDecoration: 'none' }}
      >
        <img
          src={
            exercise?.gifUrl ||
            "https://via.placeholder.com/300x200?text=Exercise"
          }
          alt={exercise?.name || "exercise"}
          loading="lazy"
          style={{ width: '100%' }}
        />

        <Stack p="15px">

          <Stack direction="row" gap="10px">
            <Button
              sx={{
                color: '#fff',
                background: '#ff5722',
                fontSize: '12px',
                borderRadius: '20px',
                textTransform: 'capitalize',
              }}
            >
              {exercise?.bodyPart}
            </Button>

            <Button
              sx={{
                color: '#000',
                background: '#ffc107',
                fontSize: '12px',
                borderRadius: '20px',
                textTransform: 'capitalize',
              }}
            >
              {exercise?.target}
            </Button>
          </Stack>

          <Typography
            color="#fff"
            fontWeight="bold"
            mt="10px"
            pb="10px"
            textTransform="capitalize"
            fontSize="18px"
          >
            {exercise?.name || "Exercise"}
          </Typography>

        </Stack>
      </Link>

      {/*  BUTTON SWITCH */}
      {isFavoritePage ? (
        <button
          onClick={handleRemove}
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '10px',
            background: 'linear-gradient(45deg, #e53935, #b71c1c)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Remove
        </button>
      ) : (
        <button
          onClick={handleFavorite}
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '10px',
            background: 'linear-gradient(45deg, #ff5722, #ff9800)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Save
        </button>
      )}
    </Stack>
  );
};

export default ExerciseCard;