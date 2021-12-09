import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipiesContext from '../contexts/RecipiesContext';
import rockGlass from '../images/rockGlass.svg';
import '../styles/Login.css';

export default function Login({ history }) {
  const {
    isValidEmail,
    setValidEmail,
    isValidPassword,
    setValidPassword,
  } = useContext(RecipiesContext);

  const [emailValue, setEmailValue] = useState('');

  const handleEmail = ({ target: { value } }) => {
    // Regex reference https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (regex.test(value)) {
      setValidEmail(true);
      setEmailValue(value);
    } else {
      setValidEmail(false);
    }
  };

  const handlePassword = ({ target: { value } }) => {
    const PASSWORD_LENGTH = 6;
    if (value.length > PASSWORD_LENGTH) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: emailValue }));

    history.push('/comidas');
  };

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <form className="login-form">
        <input
          type="email"
          name="email-input"
          data-testid="email-input"
          autoComplete="false"
          onChange={ handleEmail }
        />
        <input
          type="password"
          name="password-input"
          data-testid="password-input"
          onChange={ handlePassword }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !(isValidEmail && isValidPassword) }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
