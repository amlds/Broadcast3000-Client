import React from 'react';

import '../assets/views/login.scss';

import FromLogin from '../components/FormLogin';

const Login: React.FC = () => {
  return (
    <main>
      <img className='background' src='./images/backgroundLogin.png' alt='backgroundLogin'></img>
      <section className='login__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <div className="text">
          <h3>Hello there !</h3>
          <p>Here is the best app to broadcast and manage your devices on campus. Please login to start.</p>
        </div>
        <FromLogin />
      </section>
    </main>
  );
};

export default Login;
