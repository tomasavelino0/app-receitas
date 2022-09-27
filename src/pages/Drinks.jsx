import Footer from '../components/Footer';
import Header from '../components/Header';
import Provider from '../context/Provider';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <section>
      <Header isRenderSearch isRenderProfile title="Meals" />
      <Provider>
        <Recipes isRenderMeals={ false } />
      </Provider>
      <Footer />
    </section>
  );
}

export default Drinks;
