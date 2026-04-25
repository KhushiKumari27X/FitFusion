import User from "../models/User.js";

// GET FAVORITES
export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.favorites);
};

// ADD FAVORITE
export const addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  const exists = user.favorites.find(f => f.id === req.body.id);

  if (!exists) {
    user.favorites.push(req.body);
    await user.save();
  }

  res.json(user.favorites);
};

// REMOVE FAVORITE
export const removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.favorites = user.favorites.filter(
    f => f.id !== req.params.id
  );

  await user.save();

  res.json(user.favorites);
};