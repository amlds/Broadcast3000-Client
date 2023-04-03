import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import User from '../../types/User';

interface FormUserProps {
  isLogin: boolean;
  onSubmit: (user: User) => void;
}

const FormUser: React.FC<FormUserProps> = ({ isLogin, onSubmit }) => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);
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
    if (user.user.password.match(/[!@#$%^&*(),.?":{}|<>]/g) && user.user.password.match(/\d+/g) && user.user.password.match(/[A-Z]/g)) {
      console.log('Form submitted successfully');
    } else {
      console.log('Password does not meet the requirements');
      messageRef.current!.classList.add('show');
      messageRef.current!.innerHTML = 'Password does not meet the requirements';
    }
    onSubmit(user);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      user: {
        ...user.user,
        [event.target.name]: event.target.value,
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='message' ref={messageRef}></p>
      {isLogin ? (
        <LoginForm handleChange={handleChange} user={user} />
      ) : (
        <SignUpForm handleChange={handleChange} user={user} />
      )}
      <button className="button--primary">{isLogin ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default FormUser;
