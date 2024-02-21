import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to='/' className='navbar-brand'>
          Ani React
        </Link>
      </div>
      <div className='navbar-links'>
        <Link to='/anime/top' className='navbar-link'>
          Top Anime
        </Link>
        <Link to='/anime/seasonal' className='navbar-link'>
          Seasonal Anime
        </Link>
        <Link to='/login' className='navbar-link'>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
