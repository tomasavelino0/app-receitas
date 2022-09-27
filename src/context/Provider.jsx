import React, { useState } from 'react';
import { node } from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [recipes, setRecipes] = useState({
    drinks: [],
    meals: [],
  });

  const state = {
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
