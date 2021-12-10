import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import BarraBuscar from './BarraBuscar';

export default function Header({ pageName, haveSearch, webPage, history }) {
  const [toggleInput, setToggleInput] = useState(false);
  return (
    <header>
      <Link to="/Perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icone de perfil"
        />
      </Link>
      <h1 data-testid="page-title">{ pageName }</h1>
      <div className="searchDiv">
        {haveSearch && (
          <button type="button" onClick={ () => { setToggleInput(!toggleInput); } }>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Icone de busca"
            />
          </button>
        )}
        {toggleInput && (
          <div>
            <BarraBuscar webPage={ webPage } history={ history } />
          </div>
        )}
      </div>

    </header>
  );
}

Header.propTypes = {
  haveSearch: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  webPage: PropTypes.string.isRequired,
};
