import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DisplayCard from '../components/DisplayCard';
import ShareButton from '../components/ShareButton';
import FavButton from '../components/FavButton';
import StartOrContinueButton from '../components/StartOrContinueButton';

export default function ComidasDetalhes({ match: { params } }) {
  const { id } = params;
  const [mealDetail, setMealDetail] = useState('');
  const [render, setRender] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [quantityList, setQuantityList] = useState([]);
  const [recomendation, setRecomedation] = useState([]);

  const fetchDetalhes = async () => {
    const SIX = 6;
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const Json = await data.json();

    const dataReco = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const recoJson = await dataReco.json();
    const newJson = recoJson.drinks.filter((_, index) => index < SIX);

    await setRecomedation(newJson);
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
            src={ mealDetail.meals[0].strMealThumb }
            alt="meal img"
          />
          <h1 data-testid="recipe-title">{mealDetail.meals[0].strMeal}</h1>

          <h3 data-testid="recipe-category">{mealDetail.meals[0].strCategory}</h3>

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
            {mealDetail.meals[0].strInstructions}
          </p>

          <ShareButton foodType="meal" pageId={ id } testId="share-btn" />

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

          <iframe
            data-testid="video"
            title={ mealDetail.meals[0].strYoutube }
            src={ mealDetail.meals[0].strYoutube }
          />

          <div>
            <p>Recomendadas</p>
            { recomendation.map((element, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                { index < 2 ? (
                  <DisplayCard
                    webPage="comidas"
                    key={ element.strDrink }
                    nome={ element.strDrink }
                    URL={ element.strDrinkThumb }
                    id={ element.idDrink }
                    index={ index }
                    dataTest={ `${index}-recomendation-title` }
                  />

                ) : (
                  <div className="oculto">
                    <DisplayCard
                      webPage="comidas"
                      key={ element.strDrink }
                      nome={ element.strDrink }
                      URL={ element.strDrinkThumb }
                      id={ element.idDrink }
                      index={ index }
                      dataTest={ `${index}-recomendation-title` }
                    />
                  </div>

                )}
              </div>
            ))}
          </div>
          <Link to={ `/comidas/${id}/in-progress` }>

            <StartOrContinueButton
              pageId={ id }
              webPage="meal"
              ingredientList={ ingredientList }
            />

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
