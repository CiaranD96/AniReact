import axios from "axios";

// get anime watch list
const getAnimeWatchList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/users/watchlist", config);

  return response.data;
};

// add anime to watch list
const addAnimeToWatchList = async (anime, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put("/api/users/watchlist/add", anime, config);

  return response.data;
};

const watchListService = {
  getAnimeWatchList,
  addAnimeToWatchList,
};

export default watchListService;
