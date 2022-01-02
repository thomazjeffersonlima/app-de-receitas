import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDrinksIngredients } from '../services/fetchIngredients';
import fetchRecipes from '../services/fetchApi';
import '../styles/Ingredients.css';
import RecipesContext from '../contexts/RecipesContext';

export default function ExploreDrinkIngredients() {
  const history = useHistory();

  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const { setDrinksRecipes } = useContext(RecipesContext);

  useEffect(() => {
    async function getIngredients() {
      const ingredients = await fetchDrinksIngredients();
      setDrinksIngredients(ingredients);
    }
    getIngredients();
  }, []);

  const handleIngredientClick = async ({ target: { name } }) => {
    const ingredientRecipe = await fetchRecipes(
      'Bebidas',
      `filter.php?i=${name}`,
    );
    console.log(ingredientRecipe);
    setDrinksRecipes(ingredientRecipe);

    history.push('/bebidas');
  };

  const MAX_INGREDIENTS = 12;

  return (
    <>
      <Header title="Explorar Ingredientes" searchHidden />
      <div className="ingredients-container">
        {drinksIngredients
          .slice(0, MAX_INGREDIENTS)
          .map(({ strIngredient1 }, index) => (
            <button
              key={ index }
              type="button"
              className="ingredient-card"
              name={ strIngredient1 }
              onClick={ handleIngredientClick }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt=""
                name={ strIngredient1 }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` } name={ strIngredient1 }>
                {strIngredient1}
              </p>
            </button>
          ))}
      </div>
      <Footer />
    </>
  );
}
