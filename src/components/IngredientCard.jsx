import PropTypes from 'prop-types';
import React from 'react';
import '../css/ingredients.css';

export default function IngredientCard({ index, name, pageType }) {
  return (
    <div
      className="main-div-ingredients-card"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.${pageType}.com/images/ingredients/${name}-Small.png` }
        alt="ingredient"
      />
      <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
};
