import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipeContext from './RecipeContext';

export default function Provider({ children }) {
  const [login, setLogin] = useState([]);
  const contextValue = {
    login,
    setLogin,
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
