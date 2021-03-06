import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/perfil.css';

export default function Perfil({ history }) {
  const email = JSON.parse(localStorage.getItem('user'));

  const redirectRout = (route) => {
    if (route === '/') {
      localStorage.clear();
      history.push(route);
    } else {
      history.push(route);
    }
  };

  return (
    <div>
      <Header pageName="Perfil" />
      {email !== null && (
        <div>
          <div className="email-div">
            <h3>Email da(o) Usuária(o):</h3>
            <h1 data-testid="profile-email">{email.email}</h1>
          </div>
          <div className="button-div-profile">
            <button
              data-testid="profile-done-btn"
              type="button"
              onClick={ () => redirectRout('/receitas-feitas') }
            >
              Receitas Feitas
            </button>

            <button
              data-testid="profile-favorite-btn"
              type="button"
              onClick={ () => redirectRout('/receitas-favoritas') }
            >
              Receitas Favoritas
            </button>

            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ () => redirectRout('/') }
            >
              Sair
            </button>
          </div>
        </div>

      )}

      <Footer />
    </div>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
