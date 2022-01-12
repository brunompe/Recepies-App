import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import '../css/header.css';

export default function BarraBuscar({ webPage, history }) {
  const { fetchData, setFetchData } = useContext(RecipeContext);
  const [radioValue, setRadioValue] = useState('');
  const [searchBar, setSearchBar] = useState('');

  const fetchRecipes = async (URL) => {
    const recipes = await fetch(URL);
    const recipesJson = await recipes.json();

    if ((recipesJson.meals === null) || (recipesJson.drinks === null)) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      await setFetchData(fetchData);
    } else {
      await setFetchData(recipesJson);
    }
  };

  useEffect(() => {
    if (webPage === 'themealdb' && fetchData.meals.length === 1) {
      history.push(`/comidas/${fetchData.meals[0].idMeal}`);
    }
    if (webPage === 'thecocktaildb' && fetchData.drinks.length === 1) {
      history.push(`/bebidas/${fetchData.drinks[0].idDrink}`);
    }
  }, [fetchData]);

  const onButtonClick = (web) => {
    let URL = '';
    switch (radioValue) {
    case 'ingrediente':
      URL = `https://www.${web}.com/api/json/v1/1/filter.php?i=${searchBar}`;
      break;
    case 'nome':
      URL = `https://www.${web}.com/api/json/v1/1/search.php?s=${searchBar}`;
      break;
    case 'primeiraLetra':
      if (searchBar.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        URL = `https://www.${web}.com/api/json/v1/1/search.php?f=${searchBar}`;
      }
      break;
    default:
    }
    fetchRecipes(URL);
  };

  return (
    <div>
      <input
        id="search-input"
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => {
          setSearchBar(target.value);
        } }
      />
      <div className="filter-and-btn">
        <div className="filter-only">
          <label htmlFor="ingrediente">
            Ingrediente
            <input
              id="ingrediente"
              data-testid="ingredient-search-radio"
              type="radio"
              value="ingrediente"
              name="radioHeader"
              onClick={ ({ target }) => {
                setRadioValue(target.value);
              } }
            />
          </label>

          <label htmlFor="Nome">
            Nome
            <input
              id="Nome"
              value="nome"
              data-testid="name-search-radio"
              type="radio"
              name="radioHeader"
              onClick={ ({ target }) => {
                setRadioValue(target.value);
              } }
            />
          </label>

          <label htmlFor="PrimeiraLetra">
            Primeira letra
            <input
              data-testid="first-letter-search-radio"
              id="PrimeiraLetra"
              value="primeiraLetra"
              type="radio"
              name="radioHeader"
              onClick={ ({ target }) => {
                setRadioValue(target.value);
              } }
            />
          </label>

        </div>

        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => onButtonClick(webPage) }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

BarraBuscar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  webPage: PropTypes.string.isRequired,
};
