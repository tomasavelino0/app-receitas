import React from 'react';

function RecipeInProgress() {
  return (
    <section>
      <img data-testid="recipe-photo" src="https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270" alt="foto de um pastor alemão" />
      <h1 data-testid="recipe-title">Título</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Receita Finalizada
      </button>
      <p data-testid="recipe-category">Categoria</p>
      <p data-testid="instructions">Instruções</p>
    </section>
  );
}

export default RecipeInProgress;
