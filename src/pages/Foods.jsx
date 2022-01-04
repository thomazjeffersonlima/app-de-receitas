import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../contexts/RecipesContext';
import Footer from '../components/Footer';
import fetchRecipes from '../services/fetchApi';
import FoodCategories from '../components/FoodCategories';
import '../styles/RecipesCards.css';
import FoodRecipeCard from '../components/FoodRecipeCard';

export default function Foods() {
  const {
    foodsRecipes,
    setFoodsRecipes,
    setDefaultFoodRecipes,
  } = useContext(RecipesContext);

  const MAX_RECIPES = 12;

  useEffect(() => {
    async function responseApi() {
      const returnDefaultFoods = await fetchRecipes('Comidas', 'search.php?s=');
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
        {foodsRecipes && (
          <FoodRecipeCard
            recipes={ foodsRecipes }
            maxLength={ MAX_RECIPES }
            testId="recipe-card"
            titleTestId="card-name"
          />
        )}
      </div>
      <Footer />
    </>
  );
}
