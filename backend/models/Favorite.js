import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bookId: {
      type: String,
      required: true
    },

    title: String,

    author: String,

    cover: String
  },
  {
    timestamps: true
  }
);


const Favorite = mongoose.model(
  "Favorite",
  favoriteSchema
);


export default Favorite;