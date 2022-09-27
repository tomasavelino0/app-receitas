import React, { useContext } from 'react';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

const MIN = 11;

function Meals() {
  const { recipes } = useContext(RecipesContext);
  const recipesFiltered = recipes.meals.filter((_, index) => index <= MIN);

  return (
    <section>
      <Header isRenderSearch isRenderProfile title="Meals" />
      {recipesFiltered.map((recipe, index) => (
        <section key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt="xx"
          />
          <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h1>
        </section>
      ))}
    </section>
      <Footer />
    </div>
  );
}

export default Meals;
