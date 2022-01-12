import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import '../css/cardReceitasFeitas.css';

export default function CardReceitasFeitas({
  pageId, foodType, index, category, name, data, tags, image, alcoholicOrNot, area,
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
          <div className="info-div">
            <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${area} - ${category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ data }</p>
            <button
              type="button"
              data-testid={ `${index}-${tags[0]}-horizontal-tag` }
            >
              {tags.split(',')[0]}

            </button>
            {tags.length > 1 && (
              <button
                type="button"
                data-testid={ `${index}-${tags[1]}-horizontal-tag` }
              >
                {tags.split(',')[1]}

              </button>
            )}

            <ShareButton
              pageId={ pageId }
              foodType="meal"
              testId={ `${index}-horizontal-share-btn` }
            />

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
            <ShareButton
              pageId={ pageId }
              foodType="drink"
              testId={ `${index}-horizontal-share-btn` }
            />
          </div>
        </div>

      )}
    </div>
  );
}

CardReceitasFeitas.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  foodType: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
