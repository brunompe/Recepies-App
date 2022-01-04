import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipeContext from './RecipeContext';

export default function Provider({ children }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [fetchData, setFetchData] = useState({ meals: ['x', 'y'], drinks: ['x', 'y'] });
  const contextValue = {
    login,
    setLogin,
    password,
    setPassword,
    fetchData,
    setFetchData,
  };

  const fetchInitialData = async () => {
    const foodData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foodJson = await foodData.json();
    const drinkData = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinkJson = await drinkData.json();
    const allData = { meals: foodJson.meals, drinks: drinkJson.drinks };
    await setFetchData(allData);
  };

  useEffect(() => {
    fetchInitialData();
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
