import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

const MIN = 11;

function Drinks() {
  const { recipes } = useContext(RecipesContext);
  const recipesFiltered = recipes.drinks.filter((_, index) => index <= MIN);

  return (
    <section>
      <Header isRenderSearch isRenderProfile title="Drinks" />
      {recipesFiltered.map((recipe, index) => (
        <section key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt="xx"
          />
          <h1 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h1>
        </section>
      ))}
      <Footer />
    </section>
  );
}

export default Drinks;
