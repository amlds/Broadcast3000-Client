import React from 'react'

const FormLogin: React.FC = () => {
  return (
    <form>
      <label htmlFor="email">Email
        <input className='input--txt' type="email" name="email" id="email-input" placeholder="Alumni drink" />
      </label>
      <label htmlFor="password">Password
        <input className='input--txt' type="password" name="password" id="password-input" placeholder="Alumni drink" />
      </label>
      <input className='input--file' type="file" accept='.jpg,.png' name="image" id="image" />
      <button className='button--primary' type="submit">Log in</button>
    </form>
  );
};

export default FormLogin;
