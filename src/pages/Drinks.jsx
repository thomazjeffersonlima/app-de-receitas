import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipiesContext from '../contexts/RecipiesContext';

export default function Drinks() {
  const { drinksRecipies } = useContext(RecipiesContext);
  return (
    <>
      <Header title="Bebidas" />
      <div>
        {
          drinksRecipies.slice(0, 12).map(({ strDrinkThumb, strDrink }, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img src={ strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
              <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
            </div>
          ))
        }
      </div>
    </>
  );
}
