import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bool } from 'prop-types';
import { fetchApiDrink, fetchApiFood } from '../services/fetchAPI';

function RecipeInProgress({ isMeal, isDrink }) {
  const { id } = useParams();
  const [mealAPI, setMealAPI] = useState([]);
  const [drinkAPI, setDrinkAPI] = useState([]);
  const [ingredientMeal, setIngredientMeal] = useState([]);
  const [ingredientDrink, setIngredientDrink] = useState([]);

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
        .filter((item) => item !== null && item !== '' && item.length < MAX_MEAL));
      setDrinkAPI(drink.drinks);
    };
    test();
  }, [id, isMeal]);

  console.log(mealAPI, drinkAPI);

  return (
    <section>
      <img data-testid="recipe-photo" src="https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270" alt="foto de um pastor alemão" />
      <h1 data-testid="recipe-title">Título</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <section>
        {isMeal
          && (ingredientMeal.map((meal, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `ingrediente${index}` }
            >
              {meal}
              <input type="checkbox" name={ `ingrediente${index}` } />
            </label>
          )))}
        {isDrink
          && (ingredientDrink.map((drink, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `ingrediente${index}` }
            >
              {drink}
              <input type="checkbox" name={ `ingrediente${index}` } />
            </label>
          )))}
      </section>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Receita Finalizada
      </button>
      <p data-testid="recipe-category">Categoria</p>
      <p data-testid="instructions">Instruções</p>
    </section>
  );
}

RecipeInProgress.propTypes = {
  isMeal: bool.isRequired,
  isDrink: bool.isRequired,
};

export default RecipeInProgress;
