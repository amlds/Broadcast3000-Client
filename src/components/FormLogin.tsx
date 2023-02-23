import React from 'react'

const FormLogin: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (!isLogin) {
      if(!passwordValidation(data.password)) {
        alert('Email invalide');
        return;
      }
      console.log('login');
    } else {
      console.log('inscription');
    }

    //fait la validation des champs du formulaire
/*     if (isLogin) {
      if (!emailValidation(data.email)) {
        alert('Email invalide');
        return;
      }
      if (!passwordValidation(data.password)) {
        alert('Mot de passe invalide');
        return;
      }
    } else {
      if (!usernameValidation(data.username)) {
        alert('Username invalide');
        return;
      }
      if (!emailValidation(data.email)) {
        alert('Email invalide');
        return;
      }
      if (!passwordValidation(data.password)) {
        alert('Mot de passe invalide');
        return;
      }
      if (!passwordConfirmValidation(data.password, data.passwordConfirm)) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
    } */

  };

  React.useEffect(() => {
    const button = document.querySelector('.button--link');
    if (button) {
      button.addEventListener('click', () => {
        setIsLogin(!isLogin);
      });
    }
  }, [isLogin]);

  //validatation mot de passe inscription, il faut 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
  const passwordValidation = (password: any) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const emailValidation = (email: any) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const usernameValidation = (username: string) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  };

  const passwordConfirmValidation = (password: string, passwordConfirm: string) => {
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
      <label htmlFor="password">Password
        <input className='input--txt' type="password" name="password" id="password-input" placeholder="·········" />
      </label>
      <label htmlFor="password">Confirm password
        <input className='input--txt' type="password" name="password" id="password-input" placeholder="·········" />
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
