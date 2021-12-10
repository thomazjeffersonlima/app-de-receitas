import React, { useState, useEffect } from 'react';

export default function FoodCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((json) => setCategories(json.meals));
  }, []);
  const categoriesLength = 5;

  return (
    categories.slice(0, categoriesLength).map(({ strCategory }, index) => (
      <button
        type="button"
        value={ strCategory }
        key={ index }
        data-testid={ `${strCategory}-category-filter` }
      >
        { strCategory }
      </button>
    ))
  );
}
