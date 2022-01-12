import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import '../css/barraCategorias.css';

export default function BarraCategorias({ webPage }) {
  const { categories, fetchData, setFetchData, initialValue } = useContext(RecipeContext);
  const [firstFive, setFirstFive] = useState(['carregando...']);
  const [toggleCategory, setToggleCategory] = useState('');
  const arr = ['All'];
  const FOUR = 4;
  const ZERO = 0;

  // Função para gerar os botões de categorias:
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

  // função de fetch por Categoria
  const fetchFoodByCategory = async (category) => {
    if (webPage === 'themealdb') {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const mealList = await fetch(URL);
      setToggleCategory(category);
      const mealListJson = await mealList.json();
      if (toggleCategory !== category) {
        await setFetchData({ ...fetchData, meals: mealListJson.meals });
      } else {
        await setToggleCategory('');
        await setFetchData(initialValue);
      }
    }

    if (webPage === 'thecocktaildb') {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const drinkList = await fetch(URL);
      setToggleCategory(category);
      const drinkListJson = await drinkList.json();
      await setFetchData({ ...fetchData, drinks: drinkListJson.drinks });
      if (toggleCategory !== category) {
        await setFetchData({ ...fetchData, drinks: drinkListJson.drinks });
      } else {
        await setToggleCategory('');
        await setFetchData(initialValue);
      }
    }
  };

  // Função dos botões da barra de categorias:
  const onButtonClick = async (category) => {
    if (category === 'All') {
      await setFetchData(initialValue);
    } else {
      await fetchFoodByCategory(category);
    }
  };

  useEffect(() => {
    if (firstFive.length <= FOUR && categories.length !== 0) {
      renderButtons();
    }
  }, [categories]);

  return (
    <div className="main-div-category">
      {firstFive.map((category) => (
        <button
          className="category-btn"
          type="button"
          key={ category }
          data-testid={ `${category}-category-filter` }
          onClick={ () => onButtonClick(category) }
        >
          {category}
        </button>
      ))}
      {/* <button></button> */}
    </div>
  );
}

BarraCategorias.propTypes = {
  webPage: PropTypes.string.isRequired,
};
