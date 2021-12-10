import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};
