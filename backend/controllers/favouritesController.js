const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc get user favourites
// @desc GET /api/users/favourites/add
// @access private
const getFavourites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  res.status(200).json(user.favouriteAnime);
});

// @desc add an anime to user favourites list
// @desc PUT /api/users/favourites/add
// @access private
const addToFavourites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { mal_id, name, image_url } = req.body;

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // check if anime already exists in array
  const currentFavourites = user.favouriteAnime;
  const isFavourite = currentFavourites.find(
    (anime) => anime.mal_id === parseInt(mal_id)
  );

  if (isFavourite) {
    res.status(400);
    throw new Error('Anime already added to favourites');
  } else {
    const newFavouriteAnime = {
      mal_id,
      name,
      image_url,
      timestamp: new Date(),
    };

    await User.findByIdAndUpdate(req.user.id, {
      $push: { favouriteAnime: newFavouriteAnime },
    });

    const updatedFavourites = await User.findById(req.user.id);

    res.status(200).json(updatedFavourites.favouriteAnime);
  }
});

// @desc delete an anime from user favourites list
// @desc PUT /api/users/favourites/delete
// @access private
const deleteFromFavourites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { mal_id } = req.body;

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { favouriteAnime: { mal_id } },
  });

  const updatedFavourites = await User.findById(req.user.id);

  res.status(200).json(updatedFavourites.favouriteAnime);
});

module.exports = {
  getFavourites,
  addToFavourites,
  deleteFromFavourites,
};
