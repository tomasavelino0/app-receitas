import React, { useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../context/RecipesContext';

function DoneRecipesCard() {
  const { doneRecipe } = useContext(RecipesContext);
  console.log(doneRecipe);

  return (
    <section>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>

      {doneRecipe.map((recipe, index) => (recipe.type === 'meal'
        ? (
          <section key={ index }>
            <img
              width="16%"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </h3>
            <p
              data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
            >
              {recipe.tags[0]}

            </p>
            <p
              data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
            >
              {recipe.tags[1]}

            </p>
            <h3
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}

            </h3>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
          </section>)
        : (
          <section key={ index }>
            <img
              width="16%"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}
            </h3>
            <h3
              data-testid={ `${index}-horizontal-done-date` }
            >
              há poucos minutos atrás

            </h3>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
          </section>)))}
    </section>
  );
}

export default DoneRecipesCard;
