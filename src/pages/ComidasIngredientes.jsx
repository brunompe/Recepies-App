import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import RecipeContext from '../context/RecipeContext';

export default function ComidasIngredientes({ history }) {
  const { setFetchData } = useContext(RecipeContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [render, setRender] = useState(false);

  const fetchIngredients = async () => {
    const ONZE = 11;
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const response = await data.json();
    const onlyTwelve = response.meals.filter((_, index) => index <= ONZE);
    const onlyNames = onlyTwelve.map((curr) => curr.strIngredient);
    setIngredientsList(onlyNames);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (ingredientsList.length !== 0) {
      setRender(true);
    }
  }, [ingredientsList]);

  const redirectFunction = async (name) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    const result = await data.json();
    setFetchData(result);
    history.push('/comidas');
  };

  return (
    <div>
      <Header pageName="Explorar Ingredientes" />
      { render === true && (
        ingredientsList.map((name, index) => (
          <button
            onClick={ () => redirectFunction(name) }
            key={ index }
            type="button"
          >
            <IngredientCard
              name={ name }
              index={ index }
              pageType="themealdb"
            />
          </button>
        ))
      )}
      <Footer />
    </div>
  );
}

ComidasIngredientes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
