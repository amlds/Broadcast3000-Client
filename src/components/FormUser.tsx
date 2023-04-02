import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';

import User from '../types/User';

const FormUser: React.FC<{
  isLogin: boolean;
  handleSubmit: (user: User) => Promise<User>;
  handleSignIn: (user: User) => Promise<User>;
  setUser: (user: User) => void;
}> = ({ isLogin, handleSubmit, handleSignIn, setUser }) => {
  const [user, setUserState] = React.useState<User>({
    user: {
      email: '',
      password: '',
    }
  });

  const [error, setError] = React.useState<string>('');

  const navigate = useNavigate();
  const { setToken } = React.useContext(TokenContext);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const token = await handleSubmit(user);
        setToken(token);
        navigate('/');
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      try {
        const res = await handleSignIn(user);
        setUser(res);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="input--txt"
        value={user.user.email}
        onChange={handleChange}
        placeholder="LeWagonLaitier@lewagon.org"
      />
      <label htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="input--txt"
        value={user.user.password}
        onChange={handleChange}
        placeholder="·········"
      />
      {error && <p className="form__error">{error}</p>}
      <button className="button--primary" type="submit">
        {isLogin ? 'Login' : 'Sign In'}
      </button>
    </form>
  );
};

export default FormUser;
