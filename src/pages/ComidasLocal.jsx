import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ComidasLocal() {
  const [areas, setAreas] = useState([]);
  const [render, setRender] = useState(false);
  // const [inputValue, setInputValue] = useState('All');
  const [mealList, setMealList] = useState([]);
  const DOZE = 12;

  const fetchAreasAndMeals = async () => {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const response = await data.json();
    const areaList = response.meals.map((area) => area.strArea);
    setAreas(['All', ...areaList]);

    const initialMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const initialMealsJson = await initialMeals.json();
    const onlyTwelve = initialMealsJson.meals.filter((_, index) => index < DOZE);
    setMealList(onlyTwelve);
  };

  const onInputChange = async ({ target: { value } }) => {
    const inputValue = value;
    console.log(inputValue);

    if (inputValue === 'All') {
      const foodData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const initialMealsJson = await foodData.json();
      const onlyTwelve = initialMealsJson.meals.filter((_, index) => index < DOZE);
      setMealList(onlyTwelve);
    } else {
      const foodData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${inputValue}`);
      const initialMealsJson = await foodData.json();
      const onlyTwelve = initialMealsJson.meals.filter((_, index) => index < DOZE);
      setMealList(onlyTwelve);
    }
  };

  useEffect(() => {
    fetchAreasAndMeals();
  }, []);

  useEffect(() => {
    if (areas.length !== 0 && mealList.length !== 0) {
      setRender(true);
    }
  }, [areas, mealList]);

  return (
    <div>
      <Header pageName="Explorar Origem" haveSearch />
      {render && (
        <select
          data-testid="explore-by-area-dropdown"
          name="dropDown"
          id="drop-down-categories"
          onChange={ onInputChange }
        >
          {areas.map((area, index) => (
            <option
              key={ index }
              value={ area }
              data-testid={ `${area}-option` }
            >
              { area }
            </option>
          ))}
        </select>
      )}
      {render && (
        mealList.map((meal, index) => (
          <Link key={ index } to={ `/comidas/${meal.idMeal}` }>

            <div data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h3>
              <img
                data-testid={ `${index}-card-img` }
                className="imgSize"
                src={ meal.strMealThumb }
                alt="Food"
              />
            </div>

          </Link>
        ))
      )}
      <Footer />
    </div>
  );
}
