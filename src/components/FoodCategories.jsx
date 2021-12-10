import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import fetchByCategory from '../services/fetchByCategory';

export default function FoodCategories() {
  const [categories, setCategories] = useState([]);
  const { setFoodsRecipes } = useContext(RecipesContext);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((json) => setCategories(json.meals));
  }, []);
  const categoriesLength = 5;

  const handleClick = async ({ target: { value } }) => {
    const categoriesResponse = await fetchByCategory('Comidas', value);
    setFoodsRecipes(categoriesResponse);
  };

  return (
    categories.slice(0, categoriesLength).map(({ strCategory }, index) => (
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
  );
}
