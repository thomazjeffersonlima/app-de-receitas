import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipiesContext from '../contexts/RecipiesContext';
import Footer from '../components/Footer';
import fetchRecipies from '../services/fetchApi';

export default function Drinks() {
  const { drinksRecipies, setDrinksRecipies } = useContext(RecipiesContext);
  const maxLength = 12;

  useEffect(() => {
    async function responseApi() {
      const returnDefaultFoods = await fetchRecipies('Bebidas', 'search.php?s=');
      setDrinksRecipies(returnDefaultFoods);
    }
    responseApi();
  }, []);

  return (
    <>
      <Header title="Bebidas" />
      <div>
        {
          drinksRecipies.slice(0, maxLength).map(({ strDrinkThumb, strDrink }, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img src={ strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
              <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}
