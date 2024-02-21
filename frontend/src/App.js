import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/layout/Navbar';
import Home from './pages/Home';
import Anime from './pages/anime/Anime';
import SearchResults from './pages/anime/SearchResults';
import SeasonalAnime from './pages/anime/SeasonalAnime';
import TopAnime from './pages/anime/TopAnime';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import PrivateRoute from './components/auth/PrivateRoute';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <Router>
        <NavBar></NavBar>
        <div className='page-wrapper'>
          <Routes>
            {/* public routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/anime/:animeId' element={<Anime />} />
            <Route
              path='/anime/search-results/:searchQuery'
              element={<SearchResults />}
            />
            <Route path='/anime/seasonal' element={<SeasonalAnime />} />
            <Route path='/anime/top' element={<TopAnime />} />
            {/* private routes */}
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
