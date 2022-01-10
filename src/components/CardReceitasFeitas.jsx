import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

export default function CardReceitasFeitas({
  pageId, foodType, index, category, name, data, tags, image, alcoholicOrNot, area,
}) {
  // console.log(tags);
  // const newTag = tags.split(',');
  return (
    <div>
      {foodType === 'comida' ? (
        <div>
          <Link to={ `/comidas/${pageId}` }>
            <img
              className="imgSize"
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="Recipe"
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ data }</p>
          <button
            type="button"
            data-testid={ `${index}-${tags[0]}-horizontal-tag` }
          >
            {tags[0]}

          </button>
          {tags.length > 1 && (
            <button
              type="button"
              data-testid={ `${index}-${tags[1]}-horizontal-tag` }
            >
              {tags[1]}

            </button>
          )}

          <ShareButton
            pageId={ pageId }
            foodType="meal"
            testId={ `${index}-horizontal-share-btn` }
          />
        </div>
      ) : (
        <div>
          <Link to={ `/bebidas/${pageId}` }>
            <img
              className="imgSize"
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="Recipe"
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{data}</p>

          <ShareButton
            pageId={ pageId }
            foodType="drink"
            testId={ `${index}-horizontal-share-btn` }
          />
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
