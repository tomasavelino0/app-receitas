import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Recipes({ isRenderMeals = true, isRenderMealsCategory = true }) {
  const [recipesRender, setRecipesRender] = useState([]);
  const [drinksRender, setDrinksRender] = useState([]);
  const [mealsCategoryRender, setCategoryRender] = useState([]);
  const [drinkCategoryRender, setDrinkCategoryRender] = useState([]);

  const { resultApi } = useContext(RecipesContext);
  const { meals, drinks, mealsCategorys, drinkCategorys } = resultApi;
  useEffect(() => {
    const maxCategory = 5;
    const arrayMealsCategory = [];
    const arrayDrinkCategorys = [];

    setCategoryRender(arrayMealsCategory);
    setDrinkCategoryRender(arrayDrinkCategorys);
    const maxRecipesRender = 12;
    const array12Meals = [];
    const array12Drinks = [];

    drinkCategorys.forEach((category, i) => {
      if (i < maxCategory) {
        arrayDrinkCategorys.push(category);
      }
    });

    mealsCategorys.forEach((category, i) => {
      if (i < maxCategory) {
        arrayMealsCategory.push(category);
      }
    });
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
  }, [meals, drinks, mealsCategorys, drinkCategorys]);

  return (
    <main>
      <div>
        {isRenderMealsCategory && (mealsCategoryRender.map((category, i) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ i }
            type="button"
          >
            {category.strCategory}
            {' '}
          </button>
        )))}
        {!isRenderMealsCategory && (drinkCategoryRender.map((category, i) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ i }
            type="button"
          >
            {category.strCategory}

          </button>
        )))}
      </div>

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
  isRenderMealsCategory: PropTypes.bool.isRequired,
};

export default Recipes;
