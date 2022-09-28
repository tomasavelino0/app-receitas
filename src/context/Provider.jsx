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
  }, []);

  const state = {
    resultApi,
    recipes,
    setRecipes,
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
