import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import saveEmail from '../services/localStorage';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginButton, setLoginButton] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const enableButton = () => {
      const minCaractersPassword = 6;
      const mailformat = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      const enable = [
        passwordInput.length > minCaractersPassword,
        emailInput.match(mailformat),
      ].every(Boolean);
      setLoginButton(!enable);
    };
    enableButton();
  }, [emailInput, passwordInput]);

  const emailInputChange = ({ target }) => {
    const { value } = target;
    setEmailInput(value);
  };

  const passWordChange = ({ target }) => {
    const { value } = target;
    setPasswordInput(value);
  };

  const loginStorageHandle = () => {
    saveEmail({ email: emailInput });
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <main>
      <label htmlFor="emailInput">
        <input
          onChange={ emailInputChange }
          name="emailInput"
          data-testid="email-input"
          type="email"
        />
      </label>
      <label htmlFor="passwordInput">
        <input
          onChange={ passWordChange }
          name="passwordInput"
          data-testid="password-input"
          type="password"
        />
      </label>
      <button
        disabled={ loginButton }
        type="button"
        data-testid="login-submit-btn"
        onClick={ loginStorageHandle }
      >
        Enter

      </button>
    </main>
  );
}

export default Login;
