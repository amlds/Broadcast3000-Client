import React from 'react'

const FormLogin: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  React.useEffect(() => {
    const button = document.querySelector('.button--link');
    if (button) {
      button.addEventListener('click', () => {
        setIsLogin(!isLogin);
      });
    }
  }, [isLogin]);

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
      <label htmlFor="password">Validate password
        <input className='input--txt' type="password" name="password" id="password-input" placeholder="·········" />
      </label>
      <button className='button--primary' type="submit">Sign up</button>
      <p>Already register ? <button className='button--link md-text-1'>Log in here</button></p>
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
      <p>Not register yet ? <button className='button--link md-text-1'>Sign up here</button></p>
    </form>
  );

  return (
    <div className='form__login'>
      {isLogin ? formulairesLogin : formulairesInscription}
    </div>
  );
};

export default FormLogin;
