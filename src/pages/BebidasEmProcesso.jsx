import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';

export default function BebidasDetalhes({ match: { params } }) {
  const { id } = params;
  const [drinkDetail, setDrinkDetail] = useState('');
  const [render, setRender] = useState(false);
  const [ingredientList, setIngredientList] = useState(['1']);
  const [quantityList, setQuantityList] = useState([]);
  const [ingredientDone, setIngredientDone] = useState(0);
  const [disable, setDisable] = useState(true);

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
      setIngredientDone(ingredientDone + 1);
    } else {
      target.parentNode.className = '';
      setIngredientDone(ingredientDone - 1);
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

  const saveDoneRecipe = () => {
    // função para pegar data pega em
    // https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const mealObj = {
      id: drinkDetail.drinks[0].idDrink,
      type: 'bebida',
      area: '',
      category: drinkDetail.drinks[0].strCategory,
      alcoholicOrNot: drinkDetail.drinks[0].strAlcoholic,
      name: drinkDetail.drinks[0].strDrink,
      image: drinkDetail.drinks[0].strDrinkThumb,
      doneDate: `${dia}/${mes}/${ano}`,
      tags: '',
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

          <ShareButton foodType="drink" pageId={ id } testId="share-btn" />
          <FavButton
            id={ drinkDetail.drinks[0].idDrink }
            area=""
            type="bebida"
            category={ drinkDetail.drinks[0].strCategory }
            alcohol={ drinkDetail.drinks[0].strAlcoholic }
            name={ drinkDetail.drinks[0].strDrink }
            image={ drinkDetail.drinks[0].strDrinkThumb }
          />
          <Link to="/receitas-feitas">
            <button
              className="recipeButton"
              onClick={ saveDoneRecipe }
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ disable }
            >
              Finalizar Receita
            </button>
          </Link>
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
