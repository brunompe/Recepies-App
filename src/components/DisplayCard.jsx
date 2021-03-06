import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/displayCard.css';

function DisplayCard({ nome, URL, index, id, webPage, dataTest }) {
  return (
    <Link to={ `/${webPage}/${id}` }>
      <div className="wrap-div" data-testid={ `${index}-recipe-card` }>
        <img
          className="displayCard-img"
          data-testid={ `${index}-card-img` }
          src={ URL }
          alt={ index }
        />
        <h2 className="displayCard-h1" data-testid={ dataTest }>{nome}</h2>
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
  dataTest: PropTypes.string.isRequired,
};

export default DisplayCard;
