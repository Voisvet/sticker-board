import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <p>Hello from login</p>
      <Link to='/app'>Login</Link>
    </div>
  );
};

export default Login;
