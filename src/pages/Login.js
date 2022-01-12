import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import '../css/login.css';

export default function Login() {
  const {
    login,
    setLogin,
    password,
    setPassword,
  } = useContext(RecipeContext);
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
    <div className="main-div-login">
      <div className="login-box">
        <div>
          <h1>App de Receitas</h1>
        </div>
        <div>
          <form>
            <input
              placeholder="E-mail da Pessoa Usuária"
              data-testid="email-input"
              type="text"
              onChange={ handleChangeLogin }
            />

            <input
              placeholder="Senha da Pessoa Usuária"
              data-testid="password-input"
              type="text"
              onChange={ handleChangePassword }
            />
            <Link to="/comidas">
              <button
                // className="login-btn"
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
      </div>
    </div>
  );
}
