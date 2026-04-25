import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    favorites: [
      {
        id: String,
        name: String,
        gifUrl: String,
        bodyPart: String,
        target: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);