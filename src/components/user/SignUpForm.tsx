import React from 'react';
import User from '../../types/User';

interface SignUpFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user: User;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleChange, user }) => {
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
        <label className="md-text-1" htmlFor="first_name">
          First name
        </label>
        <input
          type="text"
          className="input--txt"
          id="first_name"
          name="first_name"
          value={user.user.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="md-text-1" htmlFor="last_name">
          Last name
        </label>
        <input
          type="text"
          className="input--txt"
          id="last_name"
          name="last_name"
          value={user.user.last_name}
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

export default SignUpForm;
