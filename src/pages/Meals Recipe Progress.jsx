import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';

function MealsRecipesProgress() {
  return (
    <div>
      Meals Recipes Progress
      <RecipeInProgress isMeal isDrink={ false } />
    </div>
  );
}

export default MealsRecipesProgress;
