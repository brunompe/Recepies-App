import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardReceitasFeitas from '../components/CardReceitasFeitas';

export default function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipesToRender, setRecipesToRender] = useState(doneRecipes);
  const [mealsDone, setMealsDone] = useState([]);
  const [drinksDone, setDrinksDone] = useState([]);

  const filterMealAndDrink = () => {
    if (doneRecipes !== null) {
      const onlyMeals = doneRecipes.filter((recipe) => recipe.type === 'comida');
      const onlyDrinks = doneRecipes.filter((recipe) => recipe.type === 'bebida');
      setMealsDone(onlyMeals);
      setDrinksDone(onlyDrinks);
    }
  };

  useEffect(() => {
    filterMealAndDrink();
  }, []);

  const onButtonClick = (buttonType) => {
    if (buttonType === 'meal') {
      setRecipesToRender(mealsDone);
    } else if (buttonType === 'drink') {
      setRecipesToRender(drinksDone);
    } else {
      setRecipesToRender(doneRecipes);
    }
  };
  return (
    <div>
      <Header pageName="Receitas Feitas" />

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

      { doneRecipes !== null && recipesToRender.map((recipe, index) => (
        <div key={ index }>
          <CardReceitasFeitas
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
