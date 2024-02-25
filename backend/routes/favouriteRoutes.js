const express = require('express');
const router = express.Router();

const {
  getFavourites,
  addToFavourites,
  deleteFromFavourites,
} = require('../controllers/favouritesController');

const { protect } = require('../middleware/authMiddleware');

router.get('/favourites', protect, getFavourites);

router.put('/favourites/add', protect, addToFavourites);

router.put('/favourites/delete', protect, deleteFromFavourites);

module.exports = router;
