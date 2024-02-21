import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in...');
  };

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
