import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';

export default function ComidasDetalhes({ match: { params } }) {
  const { id } = params;
  const [mealDetail, setMealDetail] = useState('');
  const [render, setRender] = useState(false);
  const [ingredientList, setIngredientList] = useState(['1']);
  const [quantityList, setQuantityList] = useState([]);
  const [ingredientDone, setIngredientDone] = useState(0);
  const [disable, setDisable] = useState(true);

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
    const onlyIngredients = list.slice(firstIng, lastIng);
    const firstFilter = onlyIngredients.filter((curr) => curr[1] !== null);
    const test = firstFilter.filter((curr) => curr[1].length !== 0);
    const final = test.map((curr) => curr[1]);
    setIngredientList(final);
  };

  const renderQuantity = () => {
    const firstIng = 29;
    const lastIng = 49;
    const list = Object.entries(mealDetail.meals[0]);
    const onlyQuantity = list.slice(firstIng, lastIng);
    const firstFilter = onlyQuantity.filter((curr) => curr[1] !== null);
    const test = firstFilter.filter((curr) => curr[1].length !== 1);
    const final = test.map((curr) => curr[1]);
    setQuantityList(final);
  };

  useEffect(() => {
    if (render === true) {
      renderIngredients();
      renderQuantity();
      if (ingredientDone === ingredientList.length) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [render, ingredientDone]);

  useEffect(() => {
    fetchDetalhes();
  }, []);

  const classChange = ({ target }) => {
    if (target.checked === true) {
      target.parentNode.className = 'recepiesRisk';
      setIngredientDone(ingredientDone + 1);
    } else {
      target.parentNode.className = '';
      setIngredientDone(ingredientDone - 1);
    }
  };

  const saveDoneRecipe = () => {
    // função para pegar data pega em
    // https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const mealObj = {
      id: mealDetail.meals[0].idMeal,
      type: 'comida',
      area: mealDetail.meals[0].strArea,
      category: mealDetail.meals[0].strCategory,
      alcoholOrNot: '',
      name: mealDetail.meals[0].strMeal,
      image: mealDetail.meals[0].strMealThumb,
      doneDate: `${dia}/${mes}/${ano}`,
      tags: mealDetail.meals[0].strTags,
    };

    if (doneRecipes !== null) {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, mealObj]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([mealObj]));
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

          <ShareButton pageId={ id } foodType="meal" testId="share-btn" />
          <FavButton
            id={ mealDetail.meals[0].idMeal }
            type="comida"
            area={ mealDetail.meals[0].strArea }
            category={ mealDetail.meals[0].strCategory }
            alcohol=""
            name={ mealDetail.meals[0].strMeal }
            image={ mealDetail.meals[0].strMealThumb }
            dataTest="favorite-btn"

          />
          <Link to="/receitas-feitas">
            <button
              className="recipeButton"
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ disable }
              onClick={ saveDoneRecipe }
            >
              Finalizar receita
            </button>
          </Link>
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
