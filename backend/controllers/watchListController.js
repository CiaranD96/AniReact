const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const getWatchList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  res.status(200).json(user.animeList);
});

const addToWatchList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { mal_id, name, image_url, status } = req.body;

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if anime already exists in array
  const currentWatchList = user.animeList;
  const existingAnime = currentWatchList.find(
    (anime) => anime.mal_id === parseInt(mal_id),
  );

  if (existingAnime) {
    // Update the status of the existing anime
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "animeList.$[elem].status": status } },
      { arrayFilters: [{ "elem.mal_id": parseInt(mal_id) }] },
    );

    const updatedWatchList = await User.findById(req.user.id);
    res.status(200).json(updatedWatchList.animeList);
  } else {
    // Add new anime to watch list
    const newAnime = {
      mal_id,
      name,
      image_url,
      status,
      timestamp: new Date(),
    };

    await User.findByIdAndUpdate(req.user.id, {
      $push: { animeList: newAnime },
    });

    const updatedWatchList = await User.findById(req.user.id);
    res.status(200).json(updatedWatchList.animeList);
  }
});

module.exports = {
  getWatchList,
  addToWatchList,
};
