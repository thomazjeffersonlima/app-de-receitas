import React, { useContext } from 'react';
import RecipiesContext from '../contexts/RecipiesContext';
import rockGlass from '../images/rockGlass.svg';

export default function Login() {
  const {
    isValidEmail,
    setValidEmail,
    isValidPassword,
    setValidPassword,
  } = useContext(RecipiesContext);

  const handleEmail = ({ target: { value } }) => {
    // Regex reference https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (regex.test(value)) {
      setValidEmail(true);
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

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <form>
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
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
