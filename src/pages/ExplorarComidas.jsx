import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidas() {
  const [foodId, setFoodId] = useState('1');

  const getRandomId = async () => {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const response = await data.json();
    await setFoodId(response.meals[0].idMeal);
  };

  useEffect(() => {
    getRandomId();
  }, []);

  return (
    <div>
      <Header pageName="Explorar Comidas" />
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>

      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/comidas/${foodId}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}
