import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { registerUser, reset } from '../../redux/auth/authSlice';

import Spinner from '../../components/layout/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirect when logged in
    if (isSuccess || user) {
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

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(registerUser(userData));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className='register-page-container'>
      <header>
        <h2 className='title'>Register With Ani React</h2>
      </header>
      <form onSubmit={handleRegister} className='form register-form'>
        <div className='form-group'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            className='form-input'
            value={name}
            onChange={onChange}
          />
        </div>
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
        <div className='form-group'>
          <label htmlFor='password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            name='password2'
            id='password2'
            className='form-input'
            value={password2}
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn'>
          Register
        </button>
        <p>
          Already have an account?
          <Link to='/login' className='navbar-link'>
            {' '}
            <u>Click Here</u>
          </Link>{' '}
          to log in
        </p>
      </form>
    </div>
  );
};

export default Register;
