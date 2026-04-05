const express = require("express");
const router = express.Router();

const {
  getWatchList,
  addToWatchList,
} = require("../controllers/watchListController");

const { protect } = require("../middleware/authMiddleware");

router.get("/watchlist", protect, getWatchList);

router.put("/watchlist/add", protect, addToWatchList);

module.exports = router;
