const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateList,
  addToFavourites,
  deleteFromFavourites,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.put('/list', protect, updateList);

router.put('/favourites/add', protect, addToFavourites);

router.put('/favourites/delete', protect, deleteFromFavourites);

module.exports = router;
