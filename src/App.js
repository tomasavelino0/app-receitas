import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/Done Recipes';
import FavoriteRecipes from './pages/Favorite Recipes';
import DrinksRecipes from './pages/Drinks Recipes';
import MealsRecipes from './pages/Meals Recipes';
import DrinksRecipesProgress from './pages/Drinks Recipes Progress';
import MealsRecipesProgress from './pages/Meals Recipe Progress';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/drinks/:id/in-progress" component={ DrinksRecipesProgress } />
        <Route exact path="/meals/:id/in-progress" component={ MealsRecipesProgress } />
        <Route exact path="/drinks/:id" component={ DrinksRecipes } />
        <Route exact path="/meals/:id" component={ MealsRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals" component={ Meals } />
        {/* <Route exact path="/" component={ login } /> */}
      </Switch>
    </main>
  );
}

export default App;
