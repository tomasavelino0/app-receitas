import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Provider from '../context/Provider';

function Meals() {
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
      <Provider>
        <Recipes isRenderMeals />
      </Provider>
      <Footer />
    </section>
  );
}

export default Meals;
