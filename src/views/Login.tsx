import React from 'react';

import '../assets/views/login.scss';

import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';
import UserService from '../services/UserService';
import User from '../types/User';

import FormUser from '../components/FormUser';

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const navigate = useNavigate();
  const { setToken } = React.useContext(TokenContext);

  const handleSubmit = async (user: User) => {
    const token = await UserService.loginUser(user);
    return token;
  };

  const handleSignIn = async (user: User) => {
    const res = await UserService.signInUser(user);
    return res;
  };

  const formUser = (
    <FormUser
      isLogin={isLogin}
      handleSubmit={handleSubmit}
      handleSignIn={handleSignIn}
      setUser={(user: User) => {
        setToken(user);
        navigate('/');
      }}
    />
  );

  const formCreateUser = (
    <FormUser
      isLogin={isLogin}
      handleSubmit={handleSubmit}
      handleSignIn={handleSignIn}
      setUser={(user: User) => {
        setToken(user);
        navigate('/');
      }}
    />
  );

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      {isLogin ? (
        formUser
      ) : (
        formCreateUser
      )}
      <p className='alignText'>{isLogin ? 'You do not have an account ?' : 'Already have an account?'}
        <button
          className='button--link md-text-1'
          onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Log in here' : 'Sign up here'}
        </button>
      </p>
    </div>
  );
};

export default Login;
