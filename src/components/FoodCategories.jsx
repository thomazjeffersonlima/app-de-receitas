import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../contexts/RecipesContext';
import fetchByCategory from '../services/fetchByCategory';
import '../styles/FoodDrinkCategories.css';

export default function FoodCategories() {
  const [categories, setCategories] = useState([]);
  const { setFoodsRecipes, defaultFoodRecipes } = useContext(RecipesContext);
  const [boolean, setBoolean] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((json) => setCategories(json.meals));
  }, []);

  const handleClick = async ({ target: { value } }) => {
    const categoriesResponse = await fetchByCategory('Comidas', value);

    if (boolean === true || selectedCategory !== value) {
      setFoodsRecipes(categoriesResponse);
      setBoolean(false);
    } else {
      setFoodsRecipes(defaultFoodRecipes);
      setBoolean(true);
    }
    setSelectedCategory(value);
  };
  const categoriesLength = 5;

  return (
    <section className="food-categories">
      {
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
      }
      <button
        type="button"
        onClick={ () => setFoodsRecipes(defaultFoodRecipes) }
        data-testid="All-category-filter"
      >
        All

      </button>
    </section>
  );
}
