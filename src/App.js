import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import RecipiesProvider from './providers/RecipiesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RecipiesProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
        </RecipiesProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
