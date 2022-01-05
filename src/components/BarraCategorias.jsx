import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

export default function BarraCategorias({ webPage }) {
  const { categories } = useContext(RecipeContext);
  const [firstFive, setFirstFive] = useState(['carregando...']);
  const arr = [];
  const FOUR = 4;
  const ZERO = 0;

  const renderButtons = () => {
    if (webPage === 'themealdb') {
      for (let index = ZERO; index <= FOUR; index += 1) {
        const categoria = categories.meals[index].strCategory;
        arr.push(categoria);
      }
    } if (webPage === 'thecocktaildb') {
      for (let index = ZERO; index <= FOUR; index += 1) {
        const categoria = categories.drinks[index].strCategory;
        arr.push(categoria);
      }
    }
    setFirstFive(arr);
  };

  useEffect(() => {
    if (firstFive.length <= FOUR && categories.length !== 0) {
      renderButtons();
    }
  }, [categories]);

  return (
    <div>
      {firstFive.map((category) => (
        <button
          type="button"
          key={ category }
          data-testid={ `${category}-category-filter` }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

BarraCategorias.propTypes = {
  webPage: PropTypes.string.isRequired,
};
