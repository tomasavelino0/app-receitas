import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchDrinks } from '../services/fetchAPI';

function Provider({ children }) {
  const [resultApi, setResultApi] = useState({
    drinks: [],
    meals: [],
  });
  const [recipes, setRecipes] = useState({
    drinks: [],
    meals: [],
  });

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then(async (data) => setResultApi({
        meals: data.meals,
        drinks: await fetchDrinks(),
      }));
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
