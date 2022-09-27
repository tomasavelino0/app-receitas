import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Provider from '../context/Provider';

function Meals() {
  return (
    <section>
      <Header isRenderSearch isRenderProfile title="Meals" />
      <Provider>
        <Recipes isRenderMeals />
      </Provider>
      <Footer />
    </section>
  );
}

export default Meals;
