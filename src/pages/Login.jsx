import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { saveEmail } from '../services/localStorage';
import '../styles/Login.css';
import logo from '../images/logo_Recipes_App.png';
import tomate from '../images/tomate_Img.png';

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
    <main className="login-container">
      <div className="login-logo">
        <img src={ logo } alt="logo" />
      </div>
      <img className="login-tomate" src={ tomate } alt="tomate" />
      <h2>LOGIN</h2>
      <label htmlFor="emailInput" className="labelLogin">
        <input
          onChange={ emailInputChange }
          className="emailLogin"
          name="emailInput"
          data-testid="email-input"
          type="email"
          placeholder="Email"
        />
      </label>
      <label htmlFor="passwordInput" className="labelLogin">
        <input
          onChange={ passWordChange }
          className="passwordLogin"
          name="passwordInput"
          data-testid="password-input"
          type="password"
          placeholder="Password"
        />
      </label>
      <div className="login-button-container">
        <button
          className="buttonLogin"
          disabled={ loginButton }
          type="button"
          data-testid="login-submit-btn"
          onClick={ loginStorageHandle }
        >
          Enter

        </button>
      </div>
    </main>
  );
}

export default Login;
