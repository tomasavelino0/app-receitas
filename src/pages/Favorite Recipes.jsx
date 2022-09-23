import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header isRenderSearch={ false } isRenderProfile title="Favorite Recipes" />
    </div>
  );
}

export default FavoriteRecipes;
