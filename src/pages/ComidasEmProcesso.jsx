import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ComidasDetalhes({ match: { params } }) {
  const { id } = params;
  const [mealDetail, setMealDetail] = useState('');
  const [render, setRender] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [quantityList, setQuantityList] = useState([]);

  const fetchDetalhes = async () => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const Json = await data.json();

    await setMealDetail(Json);
    await setRender(true);
  };

  const renderIngredients = () => {
    const firstIng = 9;
    const lastIng = 29;
    const list = Object.entries(mealDetail.meals[0]);
    console.log(list);
    const onlyIngredients = list.slice(firstIng, lastIng);
    console.log(onlyIngredients);
    const firstFilter = onlyIngredients.filter((curr) => curr[1] !== null);
    const test = firstFilter.filter((curr) => curr[1].length !== 0);
    const final = test.map((curr) => curr[1]);
    setIngredientList(final);
  };

  const renderQuantity = () => {
    const firstIng = 29;
    const lastIng = 49;
    const list = Object.entries(mealDetail.meals[0]);
    console.log(list);
    const onlyQuantity = list.slice(firstIng, lastIng);
    console.log(onlyQuantity);
    const firstFilter = onlyQuantity.filter((curr) => curr[1] !== null);
    const test = firstFilter.filter((curr) => curr[1].length !== 1);
    console.log(test);
    const final = test.map((curr) => curr[1]);
    console.log(final);
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

  const classChange = ({ target }) => {
    if (target.checked === true) {
      target.parentNode.className = 'recepiesRisk';
    } else {
      target.parentNode.className = '';
    }
  };

  return (
    <div>
      {render === true && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ mealDetail.meals[0].strMealThumb }
            alt="meal img"
          />
          <h1 data-testid="recipe-title">{mealDetail.meals[0].strMeal}</h1>

          <h3 data-testid="recipe-category">{mealDetail.meals[0].strCategory}</h3>

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
            {mealDetail.meals[0].strInstructions}
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
            Finalizar receita
          </button>
        </div>
      )}

    </div>
  );
}

ComidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
