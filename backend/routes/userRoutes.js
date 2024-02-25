const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateList,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.put('/list', protect, updateList);

module.exports = router;
