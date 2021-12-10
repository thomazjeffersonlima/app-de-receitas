import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import fetchByCategory from '../services/fetchByCategory';

export default function DrinkCategories() {
  const [categories, setCategories] = useState([]);
  const { setDrinksRecipes, defaultDrinkRecipes } = useContext(RecipesContext);
  const [boolean, setBoolean] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((json) => setCategories(json.drinks));
  }, []);

  const handleClick = async ({ target: { value } }) => {
    const categoriesResponse = await fetchByCategory('Bebidas', value);

    if (boolean === true || selectedCategory !== value) {
      setDrinksRecipes(categoriesResponse);
      setBoolean(false);
    } else {
      setDrinksRecipes(defaultDrinkRecipes);
      setBoolean(true);
    }
    setSelectedCategory(value);
  };
  const categoriesLength = 5;

  return (
    <>
      {
        categories.length > 0 && categories
          .slice(0, categoriesLength).map(({ strCategory }, index) => (
            <button
              type="button"
              value={ strCategory }
              key={ index }
              onClick={ handleClick }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
      }
      <button
        type="button"
        onClick={ () => setDrinksRecipes(defaultDrinkRecipes) }
        data-testid="All-category-filter"
      >
        All

      </button>
    </>
  );
}
