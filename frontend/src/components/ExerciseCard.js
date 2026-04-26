import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import toast from "react-hot-toast";
import API from "../api";

const ExerciseCard = ({ exercise, isFavorite = false, onRemoveLocal }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isFavoritePage = location.pathname === "/favorites";

  // 🔹 Normalize ID (VERY IMPORTANT)
  const getId = (item) =>
    String(item?.id || item?._id || item?.idExercise || "");

  const id = getId(exercise);

  if (!exercise || !id) return null;

  // ❤️ ADD FAVORITE
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post("/favorites", {
        id,
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

  // ❌ REMOVE FAVORITE
  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await API.delete(`/favorites/${id}`);

      toast.success("Removed from favorites");

      // update UI instantly
      if (onRemoveLocal) {
        onRemoveLocal(id);
      }

    } catch (err) {
      toast.error("Error removing favorite");
    }
  };

  return (
    <Stack
      sx={{
        background: '#1e293b',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '300px',
        transition: '0.3s',
        '&:hover': { transform: 'scale(1.03)' }
      }}
    >
      <Link to={`/exercise/${id}`} style={{ textDecoration: 'none' }}>
        <img
          src={exercise?.gifUrl}
          alt={exercise?.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />

        <Stack p="15px">
          <Typography color="#fff" fontWeight="bold" textTransform="capitalize">
            {exercise?.name}
          </Typography>

          <Typography color="#94a3b8" fontSize="12px">
            {exercise?.bodyPart} • {exercise?.target}
          </Typography>
        </Stack>
      </Link>

      {/* 🔥 BUTTON SECTION */}
      <Stack p="10px">
        {isFavoritePage ? (
          <button
            onClick={handleRemove}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#ef4444",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            ❌ Remove
          </button>
        ) : (
          <button
            onClick={handleFavorite}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: isFavorite ? "#22c55e" : "#f97316",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            {isFavorite ? "❤️ Saved" : "🤍 Save"}
          </button>
        )}
      </Stack>
    </Stack>
  );
};

export default ExerciseCard;