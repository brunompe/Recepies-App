import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavButtonRedirect from './FavButtonRedirect';
import '../css/cardReceitasFeitas.css';

export default function CardReceitasFavoritas({
  pageId, foodType, index, category, name, data, image, alcoholicOrNot, area,
}) {
  return (
    <div>
      {foodType === 'comida' ? (
        <div className="main-div-done">
          <Link to={ `/comidas/${pageId}` }>
            <img
              className="imgSize"
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="Recipe"
            />
          </Link>
          <div>
            <div className="info-div">
              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${area} - ${category}`}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ data }</p>

              <ShareButton
                pageId={ pageId }
                foodType="meal"
                testId={ `${index}-horizontal-share-btn` }
              />
              <FavButtonRedirect
                id={ pageId }
                type={ foodType }
                area={ area }
                category={ category }
                alcohol={ alcoholicOrNot }
                name={ name }
                image={ image }
                dataTest={ `${index}-horizontal-favorite-btn` }
              />

            </div>

          </div>
        </div>
      ) : (
        <div className="main-div-done">
          <Link to={ `/bebidas/${pageId}` }>
            <img
              className="imgSize"
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="Recipe"
            />
          </Link>
          <div className="info-div">
            <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
            <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{data}</p>

            <div>
              <ShareButton
                pageId={ pageId }
                foodType="drink"
                testId={ `${index}-horizontal-share-btn` }
              />
              <FavButtonRedirect
                id={ pageId }
                type={ foodType }
                area={ area }
                category={ category }
                alcohol={ alcoholicOrNot }
                name={ name }
                image={ image }
                dataTest={ `${index}-horizontal-favorite-btn` }
              />
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

CardReceitasFavoritas.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  foodType: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};
