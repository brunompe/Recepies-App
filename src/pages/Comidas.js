import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import DisplayCard from '../components/DisplayCard';
import BarraCategorias from '../components/BarraCategorias';

export default function Comidas({ history }) {
  const { fetchData } = useContext(RecipeContext);
  let results = [];
  const DOZE = 12;
  const ONZE = 11;
  if (fetchData.meals.length > DOZE) {
    for (let index = 0; index <= ONZE; index += 1) {
      results.push(fetchData.meals[index]);
    }
  } else {
    results = fetchData.meals;
  }

  return (
    <div>
      <Header pageName="Comidas" haveSearch webPage="themealdb" history={ history } />
      <BarraCategorias webPage="themealdb" />
      {results.map((result, index) => (
        <DisplayCard
          webPage="comidas"
          key={ result.strMeal }
          nome={ result.strMeal }
          URL={ result.strMealThumb }
          id={ result.idMeal }
          index={ index }
          dataTest={ `${index}-card-name` }
        />))}
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.string.isRequired,
};
