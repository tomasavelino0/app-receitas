import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinksRecipesProgress() {
  return (
    <div>
      Drinks Recipes Progress
      <RecipeInProgress isMeal={ false } isDrink />
    </div>
  );
}

export default DrinksRecipesProgress;
