import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipiesContext from '../contexts/RecipiesContext';

export default function Foods() {
  const { foodsRecipies } = useContext(RecipiesContext);
  const maxLength = 12;
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
    </>
  );
}
