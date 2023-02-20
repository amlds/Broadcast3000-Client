import React from 'react';

import '../../assets/views/login.scss';

import FromLogin from '../components/FormLogin';

const Login: React.FC = () => {
  return (
    <main>
      <img className='background' src='./images/backgroundLogin.png' alt='backgroundLogin'></img>
      <section className='login__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <FromLogin />
      </section>
    </main>
  );
};

export default Login;
