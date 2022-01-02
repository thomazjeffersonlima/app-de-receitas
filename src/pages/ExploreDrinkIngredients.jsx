import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDrinksIngredients } from '../services/fetchIngredients';
import '../styles/Ingredients.css';

export default function ExploreDrinkIngredients() {
  const [drinksIngredients, setDrinksIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      const ingredients = await fetchDrinksIngredients();
      setDrinksIngredients(ingredients);
    }
    getIngredients();
  }, []);

  const MAX_INGREDIENTS = 12;

  return (
    <>
      <Header title="Explorar Ingredientes" searchHidden />
      <div className="ingredients-container">
        {drinksIngredients
          .slice(0, MAX_INGREDIENTS)
          .map(({ strIngredient1 }, index) => (
            <div
              key={ index }
              className="ingredient-card"
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt=""
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strIngredient1}</p>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}
