import React from 'react';

import '../assets/views/login.scss';

import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';
import UserService from '../services/UserService';
import User from '../types/User';

import FormUser from '../components/user/FormUser';

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const navigate = useNavigate();
  const { token , setToken } = React.useContext(TokenContext);

  const handleSubmit = async (user: User) => {
    console.log(user);
    const response = await UserService.loginUser(user);
    setToken(response);
  };

  const handleSignUp = async (user: User) => {
    console.log(user);
    const token = await UserService.signInUser(user);
    setToken(token);
  };

  React.useEffect(() => {
    if (token.error) {
      console.log(token.error);
    } else {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <main>
      <img className='background' src='./images/backgroundLogin.png' alt='backgroundLogin'></img>
      <section className='login__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <div className="text">
          <h3>Hello there !</h3>
          <p>Here is the best app to broadcast and manage your devices on campus. Please login to start.</p>
        </div>
        <FormUser
          isLogin={isLogin}
          onSubmit={isLogin ? handleSubmit : handleSignUp}
        />
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
