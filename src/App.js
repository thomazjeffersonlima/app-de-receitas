import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Details from './pages/Details';
import RecipesProvider from './providers/RecipesProvider';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreByArea from './pages/ExploreByArea';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RecipesProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas/:id" component={ Details } />
          <Route exact path="/bebidas/:id" component={ Details } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinkIngredients }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExploreByArea }
          />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodIngredients }
          />
        </RecipesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
