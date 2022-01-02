import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../contexts/RecipesContext';
import Footer from '../components/Footer';
import fetchRecipes from '../services/fetchApi';
import FoodCategories from '../components/FoodCategories';
import '../styles/RecipesCards.css';

export default function Foods() {
  const { foodsRecipes, setFoodsRecipes,
    setDefaultFoodRecipes } = useContext(RecipesContext);

  const MAX_RECIPES = 12;

  useEffect(() => {
    async function responseApi() {
      const returnDefaultFoods = await fetchRecipes(
        'Comidas',
        'search.php?s=',
      );
      setDefaultFoodRecipes(returnDefaultFoods);
      if (foodsRecipes.length === 0) {
        setFoodsRecipes(returnDefaultFoods);
      }
    }
    responseApi();
  }, [setDefaultFoodRecipes, setFoodsRecipes]);

  return (
    <>
      <Header title="Comidas" />
      <FoodCategories />
      <div className="recipes-cards">
        {foodsRecipes && foodsRecipes
          .slice(0, MAX_RECIPES)
          .map(({ strMealThumb, strMeal, idMeal }, index) => (
            <Link key={ index } to={ `/comidas/${idMeal}` }>
              <div
                data-testid={ `${index}-recipe-card` }
                className="recipe-card"
              >
                <img
                  src={ strMealThumb }
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` } className="recipe-name">
                  {strMeal}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}
