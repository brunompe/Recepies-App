import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Login() {
  const { login, setLogin, password, setPassword } = useContext(RecipeContext);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeLogin = ({ target }) => {
    const { value } = target;
    setLogin(value);
  };

  const handleChangePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };
  const NUMBER_SIX = 6;
  const verifyData = () => {
    if (login.includes('.com') && login.includes('@') && password.length > NUMBER_SIX) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onButtonClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login }));
  };

  useEffect(() => {
    verifyData();
  }, [login, password]);
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          data-testid="email-input"
          type="text"
          onChange={ handleChangeLogin }
        />

        <input
          data-testid="password-input"
          type="text"
          onChange={ handleChangePassword }
        />
        <Link to="/comidas">
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ isDisabled }
            onClick={ onButtonClick }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}
