import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';

import User from '../types/User';
import UserService from '../services/UserService';

interface IFormLoginProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setValidateLogin: React.Dispatch<React.SetStateAction<boolean>>;
  messagePassword: React.RefObject<HTMLParagraphElement>;
  messagePasswordValidate: React.RefObject<HTMLParagraphElement>;
}

interface IFormLoginState {
  user: User;
}

const connect = async (user: User) => {
  const token = await UserService.loginUser(user);
  return token;
}

const signin = async (user: User) => {
  const res = await UserService.signInUser(user);
  return res;
}

const FormLogin: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [validateLogin, setValidateLogin] = React.useState(false);
  const messagePassword = React.useRef<HTMLParagraphElement>(null);
  const messagePasswordValidate = React.useRef<HTMLParagraphElement>(null);
  const Navigate = useNavigate();
  const { token, setToken } = React.useContext(TokenContext);

  React.useEffect(() => {
    console.log(token);
    if(token !== '') {
      Navigate('/dashboard');
    }
  }, [token]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if (!isLogin) {
      if(!passwordValidation(data.password)) {
        messagePassword.current!.innerHTML = '(Il faut 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)';
        return;
      }
      if(!passwordConfirmValidation(data.password, data.passwordConfirm)) {
        messagePasswordValidate.current!.innerHTML = '(Mot de passe pas indentique)';
        return;
      }
    }
    getLogin();
    navigateTo();
  };

  const getLogin = () => {
    setValidateLogin(true);
  };

  const navigateTo = () => {
    Navigate('/dashboard')
  }

  React.useEffect(() => {
    const form = document.querySelector('form');
    if (form) {
      form.reset();
    }
    const button = document.querySelector('.button--link');
    if (button) {
      button.addEventListener('click', () => {
        setIsLogin(!isLogin);
      });
    }
  }, [isLogin]);

  const passwordValidation = (password: any) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const passwordConfirmValidation = (password: any, passwordConfirm: any) => {
    return password === passwordConfirm;
  };

  const formulairesInscription = (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="username">Username
        <input className='input--txt' type="text" name="username" id="username-input" placeholder="LeWagonLaitier" />
      </label>
      <label htmlFor="email">Email
        <input className='input--txt' type="email" name="email" id="email-input" placeholder="LeWagonLaitier@lewagon.com" />
      </label>
      <label htmlFor="password">Password <span ref={messagePassword} className='messageError'></span>
        <input className='input--txt' type="password" name="new-password" id="password-input" placeholder="·········" />

      </label>
      <label htmlFor="password">Confirm password <span ref={messagePasswordValidate} className='messageError'></span>
        <input className='input--txt' type="password" name="new-passwordValidate" id="password-validate-input" placeholder="·········" />
      </label>
      <button className='button--primary' type="submit">Sign up</button>
      <p className='alignText'>Already register ? <button className='button--link md-text-1'>Log in here</button></p>
    </form>
  );

  const formulairesLogin = (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="email">Email
        <input className='input--txt' type="email" name="email" id="email-input" placeholder="LeWagonLaitier@lewagon.org" />
      </label>
      <label htmlFor="password">Password
        <input className='input--txt' type="password" name="password" id="password-input" placeholder="·········" />
      </label>
      <button className='button--primary' type="submit">Log in</button>
      <p className='alignText'>Not register yet ? <button className='button--link md-text-1'>Sign up here</button></p>
    </form>
  );

  return (
    <div className='form__login'>
      {isLogin ? formulairesLogin : formulairesInscription}
    </div>
  );
};

export default FormLogin;
