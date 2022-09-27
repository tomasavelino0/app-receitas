import React, { useContext } from 'react';
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
            width="16%"
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt="xx"
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
        </section>
      ))}
      <Footer />
    </section>
  );
}

export default Meals;
