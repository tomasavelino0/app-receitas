import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchCategory } from '../services/fetchAPI';

function Recipes({ isRenderMeals = true, isRenderMealsCategory = true }) {
  const [recipesRender, setRecipesRender] = useState([]);
  const [drinksRender, setDrinksRender] = useState([]);
  const [mealsCategoryRender, setCategoryRender] = useState([]);
  const [drinkCategoryRender, setDrinkCategoryRender] = useState([]);
  const [isCategory, setIsCategory] = useState(true);
  const history = useHistory();

  const { resultApi } = useContext(RecipesContext);
  const { meals, drinks, mealsCategorys, drinkCategorys } = resultApi;
  useEffect(() => {
    const maxCategory = 4;
    const maxRecipes = 11;

    setDrinkCategoryRender(drinkCategorys
      .filter((_, index) => index <= maxCategory));

    setCategoryRender(mealsCategorys
      .filter((_, index) => index <= maxCategory));

    if (isCategory) {
      setRecipesRender(meals.filter((_, index) => index <= maxRecipes));
      setDrinksRender(drinks.filter((_, index) => index <= maxRecipes));
    }
  }, [meals, drinks, mealsCategorys, drinkCategorys, isCategory]);

  const handleClickMeal = async ({ target }) => {
    const MAX = 11;
    const category = target.innerText;
    console.log(category);
    const results = await fetchCategory(category, 'meal');
    console.log(results);
    setRecipesRender(results.meals.filter((_, index) => index <= MAX));
    setIsCategory((prevState) => !prevState);
  };

  const handleClickDrinks = async ({ target }) => {
    const MAX = 11;
    const category = target.innerText;
    const results = await fetchCategory(category, 'cocktail');
    setDrinksRender(results.drinks.filter((_, index) => index <= MAX));
    setIsCategory((prevState) => !prevState);
  };

  const handleClickAll = () => {
    const MAX = 11;
    if (isRenderMeals) {
      setRecipesRender(meals.filter((_, index) => index <= MAX));
    }
    setDrinksRender(drinks.filter((_, index) => index <= MAX));
  };

  const changeRouterMeals = (id) => history.push(`/meals/${id}`);

  const changeRouterDrinks = (id) => history.push(`/drinks/${id}`);

  return (
    <main>
      <div>
        {isRenderMealsCategory && (mealsCategoryRender.map((category, i) => (
          <button
            key={ i }
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            onClick={ handleClickMeal }
          >
            {category.strCategory}
            {' '}
          </button>
        )))}
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleClickAll }
        >
          All

        </button>
        {!isRenderMealsCategory && (drinkCategoryRender.map((category, i) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ i }
            type="button"
            onClick={ handleClickDrinks }
          >
            {category.strCategory}

          </button>
        )))}
      </div>
      {isRenderMeals && (recipesRender.map((recipe, index) => (
        <button
          type="button"
          className="meals-card"
          onClick={ () => changeRouterMeals(recipe.idMeal) }
          data-testid={ `${index}-recipe-card` }
          key={ recipe.idMeal }
        >
          <img
            width="16%"
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
        </button>
      )))}
      {!isRenderMeals && (drinksRender.map((drink, index) => (
        <button
          onClick={ () => changeRouterDrinks(drink.idDrink) }
          className="card-drink"
          type="button"
          data-testid={ `${index}-recipe-card` }
          key={ drink.idDrink }
        >
          <img
            width="16%"
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </button>
      )))}
    </main>
  );
}

Recipes.propTypes = {
  isRenderMeals: PropTypes.bool.isRequired,
  isRenderMealsCategory: PropTypes.bool.isRequired,
};

export default Recipes;
