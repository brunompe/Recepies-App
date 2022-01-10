import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardReceitasFavoritas from '../components/CardReceitasFavoritas';

export default function ReceitasFavoritas() {
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [recipesToRender, setRecipesToRender] = useState(favRecipes);
  const [mealsDone, setMealsDone] = useState([]);
  const [drinksDone, setDrinksDone] = useState([]);

  const filterMealAndDrink = () => {
    if (favRecipes !== null) {
      const onlyMeals = favRecipes.filter((recipe) => recipe.type === 'comida');
      const onlyDrinks = favRecipes.filter((recipe) => recipe.type === 'bebida');
      setMealsDone(onlyMeals);
      setDrinksDone(onlyDrinks);
    }
  };

  useEffect(() => {
    filterMealAndDrink();
  }, []);

  useEffect(() => {

  }, [favRecipes]);

  const onButtonClick = (buttonType) => {
    if (buttonType === 'meal') {
      setRecipesToRender(mealsDone);
    } else if (buttonType === 'drink') {
      setRecipesToRender(drinksDone);
    } else {
      setRecipesToRender(favRecipes);
    }
  };

  return (
    <div>
      <Header pageName="Receitas Favoritas" />

      <button
        onClick={ () => onButtonClick() }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => onButtonClick('meal') }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>

      <button
        onClick={ () => onButtonClick('drink') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      { favRecipes !== null && recipesToRender.map((recipe, index) => (
        <div key={ index }>
          <CardReceitasFavoritas
            key={ index }
            area={ recipe.area }
            pageId={ recipe.id }
            foodType={ recipe.type }
            index={ index }
            category={ recipe.category }
            name={ recipe.name }
            data={ recipe.doneDate }
            tags={ recipe.tags }
            image={ recipe.image }
            alcoholicOrNot={ recipe.alcoholicOrNot }
          />
        </div>
      ))}

    </div>
  );
}
