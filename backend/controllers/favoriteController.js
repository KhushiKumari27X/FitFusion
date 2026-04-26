import User from "../models/User.js";


// ============================
// GET FAVORITES
// ============================
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ============================
// ADD FAVORITE
// ============================
export const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // IMPORTANT: safe string comparison
    const exists = user.favorites.find(
      (f) => String(f.id) === String(req.body.id)
    );

    // Already exists → send error
    if (exists) {
      return res.status(400).json({
        message: "Already in favorites"
      });
    }

    // Add new favorite
    user.favorites.push({
      id: req.body.id,
      name: req.body.name,
      gifUrl: req.body.gifUrl,
      bodyPart: req.body.bodyPart,
      target: req.body.target,
    });

    await user.save();

    res.status(201).json({
      message: "Added to favorites",
      favorites: user.favorites
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ============================
// REMOVE FAVORITE
// ============================
export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      (f) => String(f.id) !== String(req.params.id)
    );

    await user.save();

    res.json({
      message: "Removed from favorites",
      favorites: user.favorites
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};