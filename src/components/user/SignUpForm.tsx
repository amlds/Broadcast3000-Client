import React from 'react';
import User from '../../types/User';
import InfosBubble from '../InfosBubble';

interface SignUpFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  user: User;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleChange, user }) => {

  const [passwordStrength, setPasswordStrength] = React.useState<string>('Weak');

  const checkPasswordStrength = (password: string) => {
    // Vérifiez ici la force du mot de passe et définissez la valeur de setPasswordStrength
    console.log(password.match(/[!@#$%^&*(),.?":{}|<>]/))
    console.log(password.match(/\d+/))
    console.log(password.match(/[A-Z]/))
    console.log(password.length)
    if (password.match(/[!@#$%^&*(),.?":{}|<>]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g) && password.length >= 8) {
      setPasswordStrength('Strong');
    } else if (password.match(/[!@#$%^&*(),.?":{}|<>]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g) && password.length <= 8) {
      setPasswordStrength('Strong');
    } else if (password.match(/[!@#$%^&*(),.?":{}|<>]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }

    if(password.length < 8) {
      setPasswordStrength('Weak');
    } else if (password.match(/[!@#$%^&*(),.?":{}|<>]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g)) {
      setPasswordStrength('Strong');
    } else if (password.match(/[!@#$%^&*(),.?":{}|<>]/g) && password.match(/\d+/g) && password.match(/[A-Z]/g) && password.length <= 12) {
      setPasswordStrength('very strong');
    }
  };


  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    checkPasswordStrength(password);
    handleChange(event);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    if (confirmPassword !== user.user.password) {
      // Gérer ici l'erreur de non-correspondance entre les deux mots de passe
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
          id="password"
          name="password"
          value={user.user.password}
          onChange={(event) => {
            handleChange(event);
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
          type="password"
          className="input--txt"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleConfirmPasswordChange}
          required
        />
      </div>
    </>
  );
};

export default SignUpForm;
