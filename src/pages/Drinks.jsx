import Footer from '../components/Footer';
import Header from '../components/Header';
import Provider from '../context/Provider';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <section>
      <Header isRenderSearch isRenderProfile title="Drinks" />
      {recipesFiltered.map((recipe, index) => (
        <section key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            width="16%"
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt="xx"
          />
          <h2 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h2>
        </section>
      ))}
      <Header isRenderSearch isRenderProfile title="Meals" />
      <Provider>
        <Recipes isRenderMeals={ false } />
      </Provider>
      <Footer />
    </section>
  );
}

export default Drinks;
