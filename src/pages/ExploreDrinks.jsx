import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomRecipe from '../services/fetchRandomRecipe';

export default function ExploreDrinks() {
  const [randomDrinkRecipe, setRandomDrinkRecipe] = useState({});

  useEffect(() => {
    async function getRandomRecipe() {
      const randomRecipeFetch = await fetchRandomRecipe('drinks');
      setRandomDrinkRecipe(randomRecipeFetch);
    }
    getRandomRecipe();
  }, []);

  return (
    <>
      <Header title="Explorar Bebidas" searchHidden />
      <div className="explore-btn-container">
        <Link
          to="/explorar/bebidas/ingredientes"
        >
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        {randomDrinkRecipe && (
          <Link to={ `/bebidas/${randomDrinkRecipe.idDrink}` }>
            <button type="button" data-testid="explore-surprise">
              Me Surpreenda!
            </button>
          </Link>
        )}
      </div>
      <Footer />
    </>
  );
}
