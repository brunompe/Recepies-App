import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

export default function Footer() {
  return (
    <footer
      className="main-footer"
      data-testid="footer"
    >
      <Link to="/bebidas">
        <img
          className="footer-icon"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Icone de bebida"
        />
      </Link>

      <Link to="/explorar">
        <img
          className="footer-icon"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Icone de explorar"
        />
      </Link>

      <Link to="/comidas">
        <img
          className="footer-icon"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Icone de comida"
        />
      </Link>
    </footer>
  );
}
