import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//  Generate JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};



// =====================
//  REGISTER
// =====================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    const token = createToken(user._id);

    const { password: _, ...safeUser } = user.toObject();

    //  IMPORTANT: send token + user
    res.status(201).json({
      token,
      user: safeUser
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// =====================
//  LOGIN
// =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    const { password: _, ...safeUser } = user.toObject();

    //  IMPORTANT: send token + user
    res.json({
      token,
      user: safeUser
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// =====================
//  LOGOUT (optional)
// =====================
export const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};