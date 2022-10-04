import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchMeals,
  fetchDrinks,
  fetchMealsCategorys,
  fetchDrinksCategory } from '../services/fetchAPI';

function Provider({ children }) {
  const [resultApi, setResultApi] = useState({
    drinks: [],
    meals: [],
    mealsCategorys: [],
    drinkCategorys: [],
  });
  const [recipes, setRecipes] = useState({
    drinks: [],
    meals: [],
  });
  const [doneRecipe, setDoneRecipe] = useState([]);

  const setRecipe = () => {
    const doneRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    setDoneRecipe(doneRecipes);
  };

  useEffect(() => {
    const func = async () => {
      setResultApi({
        meals: await fetchMeals(),
        drinks: await fetchDrinks(),
        mealsCategorys: await fetchMealsCategorys(),
        drinkCategorys: await fetchDrinksCategory(),
      });
    };
    func();
    setRecipe();
  }, []);

  const state = {
    resultApi,
    recipes,
    setRecipes,
    doneRecipe,
  };

  return (
    <RecipesContext.Provider value={ state }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: node.isRequired,
};

export default Provider;
