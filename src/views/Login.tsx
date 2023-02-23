import React from 'react';

import '../assets/views/login.scss';

import FromLogin from '../components/FormLogin';

const Login: React.FC = () => {
  // Etat du formulaire de login (email, password) et de la validation du formulaire (isValid) :
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    isValid: false,
  });

  // Fonction qui permet de mettre à jour l'état du formulaire de login :
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Fonction qui permet de valider le formulaire de login :
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForm({ ...form, isValid: true });
  };

  // Fonction qui permet de se connecter :
  const handleLogin = () => {
    console.log('Login');
  };


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
