import Favorite from "../models/Favorite.js";


// Add favorite book
export async function addFavorite(req, res) {
  try {

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { bookId, title, author, cover } = req.body;

    const favorite = await Favorite.create({
      userId: req.user.id,
      bookId,
      title,
      author,
      cover
    });

    console.log("SAVED:", favorite);

    res.status(201).json(favorite);

  } catch(error) {
    console.log(error);
    res.status(500).json({
      message:error.message
    });
  }
}

// Get user favorites
export async function getFavorites(req, res) {

  try {

    const favorites = await Favorite.find({
      userId: req.user.id
    });


    res.json(favorites);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

}


// Remove favorite
export async function removeFavorite(req, res) {
  try {

    await Favorite.findOneAndDelete({
      bookId: req.params.id,
      userId: req.user.id
    });

    res.json({
      message: "Removed from favorites"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}