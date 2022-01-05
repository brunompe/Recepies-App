import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function DisplayCard({ nome, URL, index, id, webPage }) {
  return (
    <Link to={ `/${webPage}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <h1 data-testid={ `${index}-card-name` }>{nome}</h1>
        <img data-testid={ `${index}-card-img` } src={ URL } alt={ index } />
      </div>
    </Link>
  );
}

DisplayCard.propTypes = {
  URL: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  webPage: PropTypes.string.isRequired,
};

export default DisplayCard;
