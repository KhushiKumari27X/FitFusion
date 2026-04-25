import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import toast from "react-hot-toast";
import API from "../api";

const ExerciseCard = ({ exercise, onRemoveLocal }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isFavoritePage = location.pathname === "/favorites";

  const getId = (item) => String(item?.id || item?.idExercise || "");

  const [isFavorite, setIsFavorite] = useState(false);

  // 🔥 OPTIMIZED CHECK (runs once per mount)
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await API.get("/favorites");
        setIsFavorite(res.data.some(f => f.id === getId(exercise)));
      } catch {}
    };

    checkFavorite();
  }, []);

  // ❤️ ADD
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post("/favorites", {
        id: getId(exercise),
        name: exercise?.name,
        gifUrl: exercise?.gifUrl,
        bodyPart: exercise?.bodyPart,
        target: exercise?.target,
      });

      toast.success("Added to favorites");
      setIsFavorite(true);

    } catch {
      toast.error("Already in favorites");
    }
  };

  // ❌ REMOVE
  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await API.delete(`/favorites/${getId(exercise)}`);

      toast.success("Removed from favorites");
      setIsFavorite(false);

      if (onRemoveLocal) {
        onRemoveLocal(getId(exercise));
      }

    } catch {
      toast.error("Error removing");
    }
  };

  if (!exercise || !getId(exercise)) return null;

  return (
    <Stack
      sx={{
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        borderRadius: '20px',
        overflow: 'hidden',
        width: '300px',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
        },
      }}
    >
      {/* CARD */}
      <Link
        to={`/exercise/${getId(exercise)}`}
        style={{ textDecoration: 'none' }}
      >
        <img
          src={
            exercise?.gifUrl ||
            "https://via.placeholder.com/300x200?text=Exercise"
          }
          alt={exercise?.name}
          loading="lazy"
          style={{
            width: '100%',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
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
            fontWeight="600"
            mt="10px"
            pb="10px"
            textTransform="capitalize"
            fontSize="17px"
            letterSpacing="0.5px"
          >
            {exercise?.name || "Exercise"}
          </Typography>
        </Stack>
      </Link>

      {/* BUTTON */}
      {isFavoritePage ? (
        <button
          onClick={handleRemove}
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '12px',
            background: 'linear-gradient(45deg, #e53935, #b71c1c)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Remove
        </button>
      ) : (
        <button
          onClick={handleFavorite}
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '12px',
            background: 'linear-gradient(45deg, #ff5722, #ff9800)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.opacity = "1";
          }}
        >
          {isFavorite ? "❤️ Saved" : "🤍 Save"}
        </button>
      )}
    </Stack>
  );
};

export default ExerciseCard;