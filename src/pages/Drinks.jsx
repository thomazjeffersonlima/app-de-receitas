import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../contexts/RecipesContext';
import Footer from '../components/Footer';
import fetchRecipes from '../services/fetchApi';
import DrinkCategories from '../components/DrinkCategories';
import '../styles/RecipesCards.css';
import DrinksRecipesCards from '../components/DrinksRecipesCards';

export default function Drinks() {
  const {
    drinksRecipes,
    setDrinksRecipes,
    setDefaultDrinkRecipes,
  } = useContext(RecipesContext);
  const MAX_LENGTH = 12;

  useEffect(() => {
    async function responseApi() {
      const returnDefaultDrinks = await fetchRecipes(
        'Bebidas',
        'search.php?s=',
      );
      setDefaultDrinkRecipes(returnDefaultDrinks);
      if (drinksRecipes.length === 0) {
        setDrinksRecipes(returnDefaultDrinks);
      }
    }
    responseApi();
  }, [setDefaultDrinkRecipes, setDrinksRecipes]);

  return (
    <>
      <Header title="Bebidas" />
      <DrinkCategories />
      <div className="recipes-cards">
        {drinksRecipes && (
          <DrinksRecipesCards
            recipes={ drinksRecipes }
            maxRecipes={ MAX_LENGTH }
            testId="recipe-card"
            titleTestId="card-name"
          />
        )}
      </div>
      <Footer />
    </>
  );
}
