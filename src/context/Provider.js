import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipeContext from './RecipeContext';

export default function Provider({ children }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [fetchData, setFetchData] = useState({ meals: ['x', 'y'], drinks: ['x', 'y'] });
  const [categories, setCategories] = useState([]);
  const [initialValue, setInitialValue] = useState();
  const contextValue = {
    login,
    setLogin,
    password,
    setPassword,
    fetchData,
    setFetchData,
    categories,
    setCategories,
    initialValue,
  };

  const fetchInitialData = async () => {
    const foodData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodJson = await foodData.json();
    const drinkData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkJson = await drinkData.json();
    const allData = { meals: foodJson.meals, drinks: drinkJson.drinks };
    await setFetchData(allData);
    setInitialValue(allData);
  };

  // Função para gerar a lista de categorias de "BarraCategorias"
  const fetchCategories = async () => {
    const foodCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const foodCatJson = await foodCategories.json();
    const drinkCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const drinkCatJson = await drinkCategories.json();
    const allCategories = { meals: foodCatJson.meals, drinks: drinkCatJson.drinks };
    setCategories(allCategories);
  };

  useEffect(() => {
    fetchInitialData();
    fetchCategories();
  }, []);

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};
