import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DisplayCard from '../components/DisplayCard';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';
import StartOrContinueButton from '../components/StartOrContinueButton';

export default function BebidasDetalhes({ match: { params } }) {
  const { id } = params;
  const [drinkDetail, setDrinkDetail] = useState('');
  const [render, setRender] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [quantityList, setQuantityList] = useState([]);
  const [recomendation, setRecomedation] = useState([]);

  const fetchDetalhes = async () => {
    const SIX = 6;
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const Json = await data.json();

    const dataReco = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const recoJson = await dataReco.json();
    const newJson = recoJson.meals.filter((_, index) => index < SIX);

    await setRecomedation(newJson);
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
          <ul>
            {ingredientList.map((ingrediente, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingrediente }
              >
                { ingrediente }
                {' '}
                -
                {' '}
                { quantityList[index] }
                {' '}

              </li>
            ))}

          </ul>
          <p
            data-testid="instructions"
          >
            {drinkDetail.drinks[0].strInstructions}
          </p>

          <ShareButton foodType="drink" pageId={ id } />

          <FavButton
            id={ drinkDetail.drinks[0].idDrink }
            area=""
            type="bebida"
            category={ drinkDetail.drinks[0].strCategory }
            alcohol={ drinkDetail.drinks[0].strAlcoholic }
            name={ drinkDetail.drinks[0].strDrink }
            image={ drinkDetail.drinks[0].strDrinkThumb }
          />

          <div>
            <p>Recomendadas</p>
            { recomendation.map((element, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                { index < 2 ? (
                  <DisplayCard
                    webPage="bebidas"
                    key={ element.strMeal }
                    nome={ element.strMeal }
                    URL={ element.strMealThumb }
                    id={ element.idMeal }
                    index={ index }
                    dataTest={ `${index}-recomendation-title` }
                  />

                ) : (
                  <div className="oculto">
                    <DisplayCard
                      webPage="bebidas"
                      key={ element.strMeal }
                      nome={ element.strMeal }
                      URL={ element.strMealThumb }
                      id={ element.idMeal }
                      index={ index }
                      dataTest={ `${index}-recomendation-title` }
                    />
                  </div>

                )}
              </div>
            ))}
          </div>
          <Link to={ `/bebidas/${id}/in-progress` }>
            {/* <button
              className="recipeButton"
              type="button"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button> */}
            <StartOrContinueButton pageId={ id } ingredientList={ ingredientList } />
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
