import React from 'react';
import  Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import '../assets/views/login.scss';

import UserService from '../services/UserService';
import User from '../types/User';

import FormUser from '../components/user/FormUser';

const Login = () => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);
  const [isLogin, setIsLogin] = React.useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (user: User) => {
    const response = await UserService.loginUser(user);
    Cookies.set('token', response.token);
    navigateToDashboard();
  };

  const handleSignUp = async (user: User) => {
    const token = await UserService.signInUser(user);
    Cookies.set('token', token);
    navigateToDashboard();
  };

  const navigateToDashboard = () => {
    const token = Cookies.get('token');
    console.log(token);
    if(token !== '' && token !== undefined && token !== null){
      navigate('/dashboard')
    }
  }

  React.useEffect(() => {
    const token = Cookies.get('token');
    if(token !== '' && token !== undefined && token !== null){
      navigate('/dashboard')
    }
  }, [navigate])


  return (
    <main>
      <img className='background' src='./images/backgroundLogin.png' alt='backgroundLogin'></img>
      <section className='login__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <div className="text">
          <h3>Hello there !</h3>
          <p>Here is the best app to broadcast and manage your devices on campus. Please login to start.</p>
        </div>
        <p className='messageRef hidden' ref={messageRef}></p>
        <FormUser
          isLogin={isLogin}
          onSubmit={isLogin ? handleSubmit : handleSignUp}
        />
        <p className='alignText'>{isLogin ? 'You do not have an account ?' : 'Already have an account?'}
          <button
            className='button--link md-text-1'
            onClick={() =>  {
              setIsLogin(!isLogin);
            }}> {isLogin ? 'Log in here' : 'Sign up here'}
          </button>
        </p>
      </section>
    </main>
  );
};

export default Login;
