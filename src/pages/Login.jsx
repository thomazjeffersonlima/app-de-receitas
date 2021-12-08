import React from 'react';
import rockGlass from '../images/rockGlass.svg';

export default function Login() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <form>
        <input type="email" name="email-input" data-testid="email-input" />
        <input type="password" name="password-input" data-testid="password-input" />
        <button type="button" data-testid="login-submit-btn">Entrar</button>
      </form>
    </div>
  );
}
