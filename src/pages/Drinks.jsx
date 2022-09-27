import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

const MIN = 11;

function Drinks() {
  const { recipes } = useContext(RecipesContext);
  const recipesFiltered = recipes.drinks.filter((_, index) => index <= MIN);

  return (
    <section>
      <Header isRenderSearch isRenderProfile title="Drinks" />
      {recipesFiltered.length > 0 ? (recipesFiltered.map((recipe, index) => (
        <section key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            width="16%"
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt="xx"
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h2>
        </section>
      ))) : <Recipes isRenderMeals={ false } isRenderMealsCategory={ false } />}
      <Footer />
    </section>
  );
}

export default Drinks;
