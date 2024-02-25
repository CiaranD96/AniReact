import axios from 'axios';

// get user anime favourites
const getFavourites = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get('/api/users/favourites', config);

  return response.data;
};

// add an anime to favourites list
const addToFavourites = async (favourite, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    '/api/users/favourites/add',
    favourite,
    config
  );

  return response.data;
};

// remove anime from favourites
const removeFromFavoutires = async (mal_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    '/api/users/favourites/delete',
    { mal_id },
    config
  );

  return response.data;
};

const favouritesService = {
  getFavourites,
  addToFavourites,
  removeFromFavoutires,
};

export default favouritesService;
