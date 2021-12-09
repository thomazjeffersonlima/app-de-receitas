import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Details from './pages/Details';
import RecipiesProvider from './providers/RecipiesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RecipiesProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas/:id" component={ Details } />
          <Route exact path="/bebidas/:id" component={ Details } />
        </RecipiesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
