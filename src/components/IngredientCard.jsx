import PropTypes from 'prop-types';
import React from 'react';

export default function IngredientCard({ index, name, pageType }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.${pageType}.com/images/ingredients/${name}-Small.png` }
        alt="ingredient"
      />
      <h1 data-testid={ `${index}-card-name` }>{ name }</h1>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
};
