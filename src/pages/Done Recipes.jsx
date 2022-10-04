import React from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRicepesCard';

function DoneRecipes() {
  return (
    <div>
      <Header isRenderSearch={ false } isRenderProfile title="Done Recipes" />
      <DoneRecipesCard />
    </div>
  );
}

export default DoneRecipes;
