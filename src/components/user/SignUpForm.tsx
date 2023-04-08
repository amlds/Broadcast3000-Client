import React from 'react';
import User from '../../types/User';
import InfosBubble from '../InfosBubble';

interface SignUpFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user: User;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleChange, user }) => {
  const [passwordStrength, setPasswordStrength] = React.useState<string>('Weak');
  const messageRef = React.useRef<HTMLDivElement>(null);

  const checkPasswordStrength = (password: string) => {
    if(password.length < 8) {
      setPasswordStrength('Weak');
    } else if (password.match(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g) && password.length >= 12) {
      setPasswordStrength('very-strong');
    } else if (password.match(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g) && password.length >= 10) {
      setPasswordStrength('Strong');
    } else if (password.match(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g)) {
      setPasswordStrength('good');
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    checkPasswordStrength(password);
    handleChange(event);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    if (confirmPassword === '') {
      messageRef.current!.classList.remove('show');
      messageRef.current!.innerHTML = '';
    } else if (confirmPassword !== user.user.password) {
      messageRef.current!.classList.add('show');
      messageRef.current!.innerHTML = 'Passwords do not match';
    } else {
      messageRef.current!.classList.remove('show');
      messageRef.current!.innerHTML = '';
    }
    handleChange(event);
  };

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
          <div className='align-row'>
            Password
            <InfosBubble text="Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character." />
          </div>
        </label>
        <input
          type="password"
          className="input--txt"
          id="password-indic"
          name="password"
          autoComplete='new-password'
          value={user.user.password}
          onChange={(event) => {
            handleChange(event);
            handlePasswordChange(event);
            checkPasswordStrength(event.target.value);
          }}
          required
        />
        <div className={`password-strength-indicator ${passwordStrength.toLowerCase()}`} />
      </div>
      <div className="form-group">
        <label className="md-text-1" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          type="ConfirmPassword"
          className="input--txt"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleConfirmPasswordChange}
          required
        />
        <p className='messageRef'ref={messageRef} />
      </div>
    </>
  );
};

export default SignUpForm;
