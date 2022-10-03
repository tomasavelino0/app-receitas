import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { bool } from 'prop-types';
import { fetchApiDrink, fetchApiFood } from '../services/fetchAPI';
import '../styles/RecipeInProgress.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { saveFavoriteRecipes, removeFavorite } from '../services/localStorage';

const copy = require('clipboard-copy');

function RecipeInProgress({ isMeal, isDrink }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [mealAPI, setMealAPI] = useState([]);
  const [drinkAPI, setDrinkAPI] = useState([]);
  const [ingredientMeal, setIngredientMeal] = useState([]);
  const [ingredientDrink, setIngredientDrink] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [isCopy, setIsCopy] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const MIN_MEAL = 9;
  const MAX_MEAL = 28;
  const MIN_DRINK = 17;
  const MAX_DRINK = 32;

  useEffect(() => {
    const test = async () => {
      if (isMeal) {
        const meal = await fetchApiFood(id);
        setMealAPI(meal.meals);
        const ingredientMealResults = Object.fromEntries(Object.entries(meal.meals[0])
          .slice(MIN_MEAL, MAX_MEAL));
        return setIngredientMeal(Object.values(ingredientMealResults)
          .filter((item) => item !== '' && item !== null));
      }
      const drink = await fetchApiDrink(id);
      const ingredientDrinkResults = Object.fromEntries(Object.entries(drink.drinks[0])
        .slice(MIN_DRINK, MAX_DRINK));
      setIngredientDrink(Object.values(ingredientDrinkResults)
        .filter((item) => item !== null && item !== '' && item.length < MAX_DRINK));
      setDrinkAPI(drink.drinks);
    };
    test();
  }, [id, isMeal]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const i = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setIsChecked(i);
    }
  }, []);

  localStorage.setItem('isFavorite', JSON.stringify(isFavorite));

  const setIngredientInLocalStorage = () => localStorage
    .setItem('inProgressRecipes', JSON.stringify(isChecked));

  const handleChange = ({ target }) => {
    const { checked, name } = target;
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const isIngredientChecked = (ingredient) => isChecked && isChecked[ingredient];

  const copyURL = () => {
    const MAX = 3;
    const URL = pathname.split('/').slice(0, MAX).join('/');
    copy(`http://localhost:3000${URL}`);
    setIsCopy(true);
  };

  const handleFavoriteFood = () => {
    let favorites = {};
    if (pathname.includes('meals')) {
      favorites = {
        id: mealAPI[0].idMeal,
        type: 'meal',
        nationality: mealAPI[0].strArea,
        category: mealAPI[0].strCategory,
        alcoholicOrNot: '',
        name: mealAPI[0].strMeal,
        image: mealAPI[0].strMealThumb,
      };
      saveFavoriteRecipes(favorites);
      setFavorite((prevState) => !prevState);
      if (isFavorite) {
        return removeFavorite(mealAPI[0].idMeal);
      }
    }
    if (pathname.includes('drinks')) {
      favorites = {
        id: drinkAPI[0].idDrink,
        type: 'drinks',
        nationality: drinkAPI[0].strArea,
        category: drinkAPI[0].strCategory,
        alcoholicOrNot: drinkAPI[0].strAlcoholic,
        name: drinkAPI[0].strDrink,
        image: drinkAPI[0].strDrinkThumb,
      };
      saveFavoriteRecipes(favorites);
      setFavorite((prevState) => !prevState);
    }
    if (isFavorite) {
      return removeFavorite(drinkAPI[0].idDrink);
    }
  };

  const isLocalStorageFavorite = JSON.parse(localStorage.getItem('isFavorite'));

  return (
    <section>
      {isMeal
        && (mealAPI.map((meal, index) => (
          <section key={ index }>
            <img
              width="16%"
              data-testid="recipe-photo"
              src={ meal.strMealThumb }
              alt={ `foto de ${meal.strMeal}` }
            />
            <h1 data-testid="recipe-title">{meal.strMeal}</h1>
            <p data-testid="recipe-category">{meal.strCategory}</p>
            <p data-testid="instructions">{meal.strInstructions}</p>
          </section>
        )))}
      {isDrink
        && (drinkAPI.map((drink, index) => (
          <section key={ index }>
            <img
              width="16%"
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt={ `foto de ${drink.strDrink}` }
            />
            <h1 data-testid="recipe-title">{drink.strDrink}</h1>
            <p data-testid="recipe-category">{drink.strCategory}</p>
            <p data-testid="instructions">{drink.strInstructions}</p>
          </section>
        )))}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyURL }
      >
        Compartilhar
      </button>
      {isCopy && <span>Link copied!</span>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteFood }
        src={ isLocalStorageFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          src={ isLocalStorageFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="FavoritesIcon"
        />
      </button>
      <section>
        {isMeal
          && (ingredientMeal.map((meal, index) => (
            <label
              className={ isIngredientChecked(`ingrediente${index}`)
                ? 'RIP-checkbox' : 'empty' }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `ingrediente${index}` }
            >
              {meal}
              <input
                checked={ isIngredientChecked(`ingrediente${index}`) }
                type="checkbox"
                name={ `ingrediente${index}` }
                onChange={ handleChange }
                onClick={ setIngredientInLocalStorage() }
              />
            </label>
          )))}
        {isDrink
          && (ingredientDrink.map((drink, index) => (
            <label
              key={ index }
              className={ isIngredientChecked(`ingrediente${index}`)
                ? 'RIP-checkbox' : 'empty' }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `ingrediente${index}` }
            >
              {drink}
              <input
                checked={ isIngredientChecked(`ingrediente${index}`) }
                type="checkbox"
                name={ `ingrediente${index}` }
                onChange={ handleChange }
                onClick={ setIngredientInLocalStorage() }
              />
            </label>
          )))}
      </section>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Receita Finalizada
      </button>
    </section>
  );
}

RecipeInProgress.propTypes = {
  isMeal: bool.isRequired,
  isDrink: bool.isRequired,
};

export default RecipeInProgress;
