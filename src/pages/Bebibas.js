import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import DisplayCard from '../components/DisplayCard';
import BarraCategorias from '../components/BarraCategorias';

export default function Bebibas({ history }) {
  const { fetchData } = useContext(RecipeContext);
  let results = [];
  const DOZE = 12;
  const ONZE = 11;
  if (fetchData.drinks.length > DOZE) {
    for (let index = 0; index <= ONZE; index += 1) {
      results.push(fetchData.drinks[index]);
    }
  } else {
    results = fetchData.drinks;
  }

  return (
    <div>
      <Header pageName="Bebidas" haveSearch webPage="thecocktaildb" history={ history } />
      <BarraCategorias webPage="thecocktaildb" />
      {results.length > 2 && results.map((result, index) => (
        <DisplayCard
          webPage="bebidas"
          id={ result.idDrink }
          key={ result.strDrink }
          nome={ result.strDrink }
          URL={ result.strDrinkThumb }
          index={ index }
          dataTest={ `${index}-card-name` }
        />))}
      <Footer />
    </div>
  );
}

Bebibas.propTypes = {
  history: PropTypes.string.isRequired,
};
