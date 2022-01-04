import PropTypes from 'prop-types';
import React from 'react';

function DisplayCard({ nome, URL, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h1 data-testid={ `${index}-card-name` }>{nome}</h1>
      <img data-testid={ `${index}-card-img` } src={ URL } alt={ index } />
    </div>
  );
}

DisplayCard.propTypes = {
  URL: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};

export default DisplayCard;
