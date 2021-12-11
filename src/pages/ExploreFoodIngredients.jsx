import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchFoodsIngredients } from '../services/fetchIngredients';

export default function ExploreByFoodIngredients() {
  const [foodsIngredients, setFoodsIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      const ingredientsFetch = await fetchFoodsIngredients();
      setFoodsIngredients(ingredientsFetch);
    }
    getIngredients();
  }, []);

  const MAX_INGREDIENTS = 12;

  return (
    <>
      <Header title="Explorar Ingredients" searchHidden />
      <div className="ingredients-container">
        {foodsIngredients
          .slice(0, MAX_INGREDIENTS)
          .map(({ strIngredient }, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-card` }>
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt=""
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
}
