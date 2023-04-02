import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import User from '../../types/User';

interface FormUserProps {
  isLogin: boolean;
  onSubmit: (user: User) => void;
}

const FormUser: React.FC<FormUserProps> = ({ isLogin, onSubmit }) => {
  const [user, setUser] = React.useState<User>({
    user: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(user);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  };

  return (
    <form onSubmit={handleSubmit}>
      {isLogin ? (
        <LoginForm handleChange={handleChange} user={user} />
      ) : (
        <SignUpForm handleChange={handleChange} user={user} />
      )}
      <button className="button md-text-1">{isLogin ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default FormUser;
