import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipiesContext from '../contexts/RecipiesContext';
import Footer from '../components/Footer';
import fetchRecipies from '../services/fetchApi';

export default function Foods() {
  const { foodsRecipies, setFoodsRecipies } = useContext(RecipiesContext);
  const maxLength = 12;

  useEffect(() => {
    async function responseApi() {
      const returnDefaultFoods = await fetchRecipies('Comidas', 'search.php?s=');
      setFoodsRecipies(returnDefaultFoods);
    }
    responseApi();
  }, []);

  return (
    <>
      <Header title="Comidas" />
      <div>
        {
          foodsRecipies.slice(0, maxLength).map(({ strMealThumb, strMeal }, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img src={ strMealThumb } alt="" data-testid={ `${index}-card-img` } />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}
