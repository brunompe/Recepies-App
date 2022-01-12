import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarBebidas() {
  const [foodId, setFoodId] = useState('1');

  const getRandomId = async () => {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const response = await data.json();
    await setFoodId(response.drinks[0].idDrink);
  };

  useEffect(() => {
    getRandomId();
  }, []);

  return (
    <div>
      <Header pageName="Explorar Bebidas" />
      <div className="main-div-explorer">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="explorer-btn"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${foodId}` }>
          <button
            className="explorer-btn"
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}
