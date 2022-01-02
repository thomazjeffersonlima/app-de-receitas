import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchFoodsIngredients } from '../services/fetchIngredients';
import fetchRecipes from '../services/fetchApi';
import '../styles/Ingredients.css';
import RecipesContext from '../contexts/RecipesContext';

export default function ExploreByFoodIngredients() {
  const history = useHistory();

  const [foodsIngredients, setFoodsIngredients] = useState([]);
  const { setFoodsRecipes } = useContext(RecipesContext);

  useEffect(() => {
    async function getIngredients() {
      const ingredientsFetch = await fetchFoodsIngredients();
      setFoodsIngredients(ingredientsFetch);
    }
    getIngredients();
  }, []);

  const handleIngredientClick = async ({ target: { name } }) => {
    const ingredientRecipe = await fetchRecipes(
      'Comidas',
      `filter.php?i=${name}`,
    );
    setFoodsRecipes(ingredientRecipe);

    history.push('/comidas');
  };

  const MAX_INGREDIENTS = 12;

  return (
    <>
      <Header title="Explorar Ingredientes" searchHidden />
      <div className="ingredients-container">
        {foodsIngredients
          .slice(0, MAX_INGREDIENTS)
          .map(({ strIngredient }, index) => (
            <button
              key={ index }
              type="button"
              className="ingredient-card"
              name={ strIngredient }
              onClick={ handleIngredientClick }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt="ingredient"
                name={ strIngredient }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` } name={ strIngredient }>
                {strIngredient}
              </p>
            </button>
          ))}
      </div>
      <Footer />
    </>
  );
}
