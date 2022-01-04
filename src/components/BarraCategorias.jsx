import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context/RecipeContext';

export default function BarraCategorias({ webPage }) {
  const { fetchData } = useContext(RecipeContext);
  const [firstFive, setFirstFive] = useState(['carregando...']);
  const arr = [];
  const renderButtons = () => {
    if (webPage === 'themealdb' && fetchData.meals[0].strCategory !== undefined) {
      for (let index = 0; index <= 4; index += 1) {
        const categoria = fetchData.meals[index].strCategory;
        arr.push(categoria);
      }
    } else if (webPage === 'thecocktaildb' && fetchData.drink[0].strCategory !== undefined) {
      for (let index = 0; index <= 4; index += 1) {
        const categoria = fetchData.drink[index].strCategory;
        arr.push(categoria);
      }
    }
    setFirstFive(arr);
  };

  useEffect(() => {
    if (firstFive.length < 4) {
      renderButtons();
    }
  }, [firstFive]);

  return (
    <div>
      {firstFive.map((category) => (
        <button key={ category } data-testid={ `${category}-category-filter` }>
          {category}
        </button>
      ))}
    </div>
  );
}
