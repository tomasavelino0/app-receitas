import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Recipes({ isRenderMeals = true }) {
  const [recipesRender, setRecipesRender] = useState([]);
  const [drinksRender, setDrinksRender] = useState([]);
  const { resultApi } = useContext(RecipesContext);
  const { meals, drinks } = resultApi;
  useEffect(() => {
    const maxRecipesRender = 12;
    const array12Meals = [];
    const array12Drinks = [];
    meals.forEach((recipe, i) => {
      if (i < maxRecipesRender) {
        array12Meals.push(recipe);
      }
    });
    drinks.forEach((drink, i) => {
      if (i < maxRecipesRender) {
        array12Drinks.push(drink);
      }
    });
    setDrinksRender(array12Drinks);
    setRecipesRender(array12Meals);
  }, [meals, drinks]);

  return (
    <main>
      {isRenderMeals && (recipesRender.map((recipe, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
          <img
            width="16%"
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
        </section>
      )))}
      {!isRenderMeals && (drinksRender.map((drink, index) => (
        <section data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
          <img
            width="16%"
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </section>
      ))

      )}
    </main>
  );
}

Recipes.propTypes = {
  isRenderMeals: PropTypes.bool.isRequired,
};

export default Recipes;
