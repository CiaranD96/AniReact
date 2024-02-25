import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser, reset } from '../../redux/auth/authSlice';
import { getAnimeFavourites } from '../../redux/favourites/favouritesSlice';

import Spinner from '../../components/layout/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirect when user logs in
    if (isSuccess || user) {
      dispatch(getAnimeFavourites());
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(loginUser(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className='login-page-container'>
      <header>
        <h2 className='title'>Log in to Ani React</h2>
      </header>
      <form onSubmit={handleLogin} className='form login-form'>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-input'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='form-input'
            value={password}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn'>
          Login
        </button>
        <p>
          Don't have an account?
          <Link to='/register' className='navbar-link'>
            {' '}
            <u>Click Here</u>
          </Link>{' '}
          to register
        </p>
      </form>
    </div>
  );
};

export default Login;
