import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import DisplayCard from '../components/DisplayCard';

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
      {results.legth === 2}
      {results.length > 2 && results.map((result, index) => (
        <DisplayCard
          key={ result.strDrink }
          nome={ result.strDrink }
          URL={ result.strDrinkThumb }
          index={ index }
        />))}
      <Footer />
    </div>
  );
}

Bebibas.propTypes = {
  history: PropTypes.string.isRequired,
};
