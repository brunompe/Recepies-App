import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

export default function StartOrContinueButton({ pageId, ingredientList, webPage }) {
  const [buttonText, setButtonText] = useState('Iniciar Receita');

  const verifyLocalStorage = () => {
    const startedRecipes2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let arrayOfKeys = [];
    if (startedRecipes2 !== null) {
      if (webPage === 'meal') {
        arrayOfKeys = Object.keys(startedRecipes2.meals);
      } else {
        arrayOfKeys = Object.keys(startedRecipes2.cocktails);
      }
      const verifyLocal = arrayOfKeys.some((recipe) => recipe === pageId);
      if (verifyLocal) {
        setButtonText('Continuar Receita');
      } else {
        setButtonText('Iniciar Receita');
      }
    }
  };

  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let recipeObj = {};

  const caseNull = () => {
    if (webPage === 'meal') {
      recipeObj = {
        meals: {
          [pageId]: ingredientList,
        },
        cocktails: {
        },
      };
    } else {
      recipeObj = {
        meals: {
        },
        cocktails: {
          [pageId]: ingredientList,
        },
      };
    }
  };

  const onButtonClick = () => {
    if (startedRecipes === null) {
      caseNull();
    } else if (webPage === 'meal') {
      recipeObj = {
        meals: {
          ...startedRecipes.meals,
          [pageId]: ingredientList,
        },
        cocktails: {
          ...startedRecipes.cocktails,
        },
      };
    } else {
      recipeObj = {
        meals: {
          ...startedRecipes.meals,
        },
        cocktails: {
          ...startedRecipes.cocktails,
          [pageId]: ingredientList,
        },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeObj));
  };

  useEffect(() => {
    verifyLocalStorage();
  }, []);

  return (
    <div>
      <button
        onClick={ onButtonClick }
        data-testid="start-recipe-btn"
        type="button"
        className="recipeButton"
      >
        { buttonText }

      </button>
    </div>
  );
}

StartOrContinueButton.propTypes = {
  ingredientList: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  webPage: PropTypes.string.isRequired,
};
