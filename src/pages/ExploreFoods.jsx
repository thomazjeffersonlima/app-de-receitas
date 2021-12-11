import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomRecipe from '../services/fetchRandomRecipe';

export default function ExploreFoods() {
  const [randomMealRecipe, setRandomMealRecipe] = useState({});

  useEffect(() => {
    async function getRandomRecipe() {
      const randomRecipeFetch = await fetchRandomRecipe('meals');
      setRandomMealRecipe(randomRecipeFetch);
    }
    getRandomRecipe();
  }, []);

  return (
    <>
      <Header title="Explorar Comidas" searchHidden />
      <div>
        <Link
          to="/explorar/comidas/ingredientes"
        >
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area ">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        {randomMealRecipe && (
          <Link to={ `/comidas/${randomMealRecipe.idMeal}` }>
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
