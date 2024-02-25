const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// @desc Register a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  // find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      animeList: user.animeList,
      favouriteAnime: user.favouriteAnime,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Login a user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      animeList: user.animeList,
      favouriteAnime: user.favouriteAnime,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc update an anime in the users animeList field in the database
// @route PUT /api/users/list
// @access private
const updateList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // set anime object in anime list
  const { mal_id, name, status, image_url } = req.body;

  if ((!mal_id || !name || !status, !image_url)) {
    res.status(400);
    throw new Error('Anime information required');
  }

  console.log(mal_id, name, status, image_url);

  res.status(200).json('hello world');
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

// generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateList,
  addToFavourites,
  deleteFromFavourites,
};
