import React from 'react';
import User from '../../types/User';

interface LoginFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user: User;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleChange, user }) => {
  return (
    <>
      <div className="form-group">
        <label className="md-text-1" htmlFor="email">
          Email address
        </label>
        <input
          type="email"
          className="input--txt"
          id="email"
          name="email"
          value={user.user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="md-text-1" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="input--txt"
          id="password"
          name="password"
          value={user.user.password}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
};

export default LoginForm;
