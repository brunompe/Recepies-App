import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function BebidasDetalhes({ match: { params } }) {
  const { id } = params;
  const [drinkDetail, setDrinkDetail] = useState('');
  const [render, setRender] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [quantityList, setQuantityList] = useState([]);

  const fetchDetalhes = async () => {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const Json = await data.json();
    await setDrinkDetail(Json);
    await setRender(true);
  };

  const renderIngredients = () => {
    const list = Object.entries(drinkDetail.drinks[0]);
    const filteredList = list.filter((curr) => curr[0].includes('strIngredient'));
    const test = filteredList.filter((crr) => crr[1] !== null);
    const testFilted = test.filter((curr) => curr[1].length !== 0);
    const final = testFilted.map((curr) => curr[1]);
    setIngredientList(final);
  };

  const classChange = ({ target }) => {
    if (target.checked === true) {
      target.parentNode.className = 'recepiesRisk';
    } else {
      target.parentNode.className = '';
    }
  };

  const renderQuantity = () => {
    const firstIng = 32;
    const lastIng = 46;
    const list = Object.entries(drinkDetail.drinks[0]);
    const onlyQuantity = list.slice(firstIng, lastIng);
    const test = onlyQuantity.filter((curr) => curr[1] !== null);
    const testFilted = test.filter((curr) => curr[1].length !== 1);
    const final = testFilted.map((curr) => curr[1]);
    setQuantityList(final);
  };

  useEffect(() => {
    if (render === true) {
      renderIngredients();
      renderQuantity();
    }
  }, [render]);

  useEffect(() => {
    fetchDetalhes();
  }, []);

  return (
    <div>
      {render === true && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ drinkDetail.drinks[0].strDrinkThumb }
            alt="meal img"
          />
          <h1 data-testid="recipe-title">{drinkDetail.drinks[0].strDrink}</h1>
          <h3 data-testid="recipe-category">{ drinkDetail.drinks[0].strAlcoholic }</h3>

          {ingredientList.map((ingrediente, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ index }
              htmlFor={ index }
            >
              <input
                id={ index }
                type="checkbox"
                key={ ingrediente }
                onClick={ classChange }

              />
              { ingrediente }
              {' '}
              -
              {' '}
              { quantityList[index] }
              {' '}
            </label>
          ))}

          <p
            data-testid="instructions"
          >
            {drinkDetail.drinks[0].strInstructions}
          </p>

          <button
            type="button"
            data-testid="share-btn"
          >
            Compartilhar
          </button>

          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favoritar
          </button>
          <button
            className="recipeButton"
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </div>
      )}

    </div>
  );
}

BebidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
