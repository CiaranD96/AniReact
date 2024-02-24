import axios from 'axios';

// register user
const register = async (userData) => {
  const response = await axios.post('/api/users', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post('/api/users/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem('user');
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

const authService = {
  register,
  login,
  logout,
  addToFavourites,
};

export default authService;
