import React from 'react';

import '../assets/views/login.scss';

import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';
import UserService from '../services/UserService';
import User from '../types/User';

import FormUser from '../components/user/FormUser';

const Login = () => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);
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

  const message = () => {
    if (token === '' || token.error) {
      messageRef.current!.classList.add('show');
      messageRef.current!.classList.remove('hidden')
      messageRef.current!.innerHTML = 'Email or password is incorrect';
    } else {
      messageRef.current!.classList.add('hidden');
      messageRef.current!.classList.remove('show')
      navigate('/dashboard');
    }
  }

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
              message();
            }}> {isLogin ? 'Log in here' : 'Sign up here'}
          </button>
        </p>
      </section>
    </main>
  );
};

export default Login;
