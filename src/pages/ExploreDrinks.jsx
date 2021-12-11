import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  return (
    <>
      <Header title="Explorar Comidas" searchHidden />
      <div>
        <Link to="/">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
