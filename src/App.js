import React from 'react';
import './App.css';
import Login from './pages/Login';
import RecipiesProvider from './providers/RecipiesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipiesProvider>
      <Login />
    </RecipiesProvider>
  );
}

export default App;
