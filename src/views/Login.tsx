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
    <main>
      <img className='background' src='./images/backgroundLogin.png' alt='backgroundLogin'></img>
      <section className='login__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <div className="text">
          <h3>Hello there !</h3>
          <p>Here is the best app to broadcast and manage your devices on campus. Please login to start.</p>
        </div>
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
      </section>
    </main>
  );
};

export default Login;
