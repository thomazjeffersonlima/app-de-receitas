import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../contexts/RecipesContext';
import Footer from '../components/Footer';
import fetchRecipes from '../services/fetchApi';
import '../styles/RecipesCards.css';
import DrinkCategories from '../components/DrinkCategories';

export default function Drinks() {
  const { drinksRecipes, setDrinksRecipes,
    setDefaultDrinkRecipes } = useContext(RecipesContext);
  const maxLength = 12;

  useEffect(() => {
    async function responseApi() {
      const returnDefaultDrinks = await fetchRecipes(
        'Bebidas',
        'search.php?s=',
      );
      setDefaultDrinkRecipes(returnDefaultDrinks);
      setDrinksRecipes(returnDefaultDrinks);
    }
    responseApi();
  }, [setDefaultDrinkRecipes, setDrinksRecipes]);

  return (
    <>
      <Header title="Bebidas" />
      <DrinkCategories />
      <div className="recipes-cards">
        {drinksRecipes && drinksRecipes
          .slice(0, maxLength)
          .map(({ strDrinkThumb, strDrink, idDrink }, index) => (
            <Link key={ index } to={ `/bebidas/${idDrink}` }>
              <div
                data-testid={ `${index}-recipe-card` }
                className="recipe-card"
              >
                <img
                  src={ strDrinkThumb }
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{strDrink}</p>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}
