import React from 'react';
import Header from '../components/Header';
import CardReceitasFeitas from '../components/CardReceitasFeitas';

export default function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header pageName="Receitas Feitas" />

      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      { doneRecipes.map((recipe, index) => (
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
      ))}
    </div>
  );
}
