import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import toast from "react-hot-toast";
import API from "../api";

const ExerciseCard = ({ exercise, onRemoveLocal }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isFavoritePage = location.pathname === "/favorites";

  const getId = (item) => String(item?.id || item?.idExercise || "");

  const [isFavorite, setIsFavorite] = useState(false);

  // FIXED: only call API if token exists
  useEffect(() => {
    const loadFavorites = async () => {
      const token = localStorage.getItem("token");

      // ❗ prevent 401 error
      if (!token) return;

      try {
        const res = await API.get("/favorites");

        const favIds = res.data.map(f => String(f.id));

        setIsFavorite(favIds.includes(getId(exercise)));
      } catch (err) {
        // silently ignore to avoid console spam
      }
    };

    if (exercise && getId(exercise)) {
      loadFavorites();
    }
  }, [exercise]);

  // ADD FAVORITE
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    setIsFavorite(true);

    try {
      await API.post("/favorites", {
        id: getId(exercise),
        name: exercise?.name,
        gifUrl: exercise?.gifUrl,
        bodyPart: exercise?.bodyPart,
        target: exercise?.target,
      });

      toast.success("Added to favorites");
    } catch (err) {
      toast.error("Already in favorites");
    }
  };

  //  REMOVE FAVORITE
  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite(false);

    try {
      await API.delete(`/favorites/${getId(exercise)}`);

      toast.success("Removed from favorites");

      if (onRemoveLocal) {
        onRemoveLocal(getId(exercise));
      }
    } catch (err) {
      toast.error("Error removing");
    }
  };

  if (!exercise || !getId(exercise)) return null;

  return (
    <Stack
      sx={{
        background: '#1e293b',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '300px',
      }}
    >
      <Link
        to={`/exercise/${getId(exercise)}`}
        style={{ textDecoration: 'none' }}
      >
        <img
          src={exercise?.gifUrl}
          alt={exercise?.name || "exercise"}
          style={{ width: '100%' }}
        />

        <Stack p="15px">
          <Typography color="#fff" fontWeight="bold">
            {exercise?.name}
          </Typography>
        </Stack>
      </Link>

      {isFavoritePage ? (
        <button onClick={handleRemove}>
           Remove
        </button>
      ) : (
        <button onClick={handleFavorite}>
          {isFavorite ? "❤️ Saved" : "🤍 Save"}
        </button>
      )}
    </Stack>
  );
};

export default ExerciseCard;