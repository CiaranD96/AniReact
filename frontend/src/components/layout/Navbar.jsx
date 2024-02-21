import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser, reset } from '../../redux/auth/authSlice.js';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

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

        {user ? (
          <button className='btn' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to='/login' className='navbar-link'>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
