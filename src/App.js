import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/layout/Navbar';
import Home from './pages/Home';
import Anime from './pages/anime/Anime';
import SearchResults from './pages/anime/SearchResults';
import SeasonalAnime from './pages/anime/SeasonalAnime';
import TopAnime from './pages/anime/TopAnime';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div>
      <Router>
        <NavBar></NavBar>
        <div className='page-wrapper'>
          <Routes>
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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
