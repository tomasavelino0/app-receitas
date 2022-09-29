import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';

function MealsRecipesProgress() {
  return (
    <div>
      Meals Recipes Progress
      <RecipeInProgress isMeal={ true } />
    </div>
  );
}

export default MealsRecipesProgress;
