import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/displayCardDetalhes.css';

function DisplayCardDetalhes({ nome, URL, index, id, webPage, dataTest }) {
  return (
    <Link to={ `/${webPage}/${id}` }>
      <div className="wrap-div-detalhes" data-testid={ `${index}-recipe-card` }>
        <img
          className="displayCard-img-detalhes"
          data-testid={ `${index}-card-img` }
          src={ URL }
          alt={ index }
        />
        <h2 className="displayCard-h2-detalhes" data-testid={ dataTest }>{nome}</h2>
      </div>
    </Link>
  );
}

DisplayCardDetalhes.propTypes = {
  URL: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  webPage: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};

export default DisplayCardDetalhes;
