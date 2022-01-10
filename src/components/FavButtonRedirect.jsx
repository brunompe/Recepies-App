import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavButton({
  id, type, area, category, alcohol, name, image, dataTest,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState(whiteHeartIcon);
  let verifyFav = false;

  const saveLocalStorage = () => {
    const recipeObj = {
      id,
      type,
      area,
      category,
      alcoholicOrNot: alcohol,
      name,
      image,
    };

    const initialRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (initialRecipes !== null) {
      verifyFav = initialRecipes.some((recipe) => recipe.id === id);
      if (verifyFav) {
        const newRecipes = initialRecipes.filter((recipe) => recipe.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
      }
    }
    if (!verifyFav) {
      if (initialRecipes === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([recipeObj]));
      } else {
        const arrObj = [
          ...initialRecipes,
          recipeObj,
        ];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrObj));
      }
    }
  };

  const favorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setIcon(blackHeartIcon);
    } else {
      setIcon(whiteHeartIcon);
    }
    saveLocalStorage();
  };

  useEffect(() => {
    const initialRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (initialRecipes !== null) {
      const verifyInitial = initialRecipes.some((recipe) => recipe.id === id);
      if (verifyInitial) {
        setIcon(blackHeartIcon);
        setIsFavorite(true);
      }
    }
  }, []);

  return (
    <div>
      <Link to="/redirect">
        <button
          className="favButton"
          type="button"
          data-testid={ dataTest }
          src={ icon }
          onClick={ favorite }
        >
          <img src={ icon } alt="heart" />
        </button>

      </Link>
    </div>
  );
}

FavButton.propTypes = {
  alcohol: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};
