import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Details.css';

export default function IngredientsProgress({ ingredients, id, recipeType }) {
  const handleClick = (checked, ingredient) => {
    const inProgressRecipesFromStorage = localStorage.getItem('inProgressRecipes');

    let inProgressRecipes = {
      cocktails: {},
      meals: {},
    };

    if (inProgressRecipesFromStorage !== null) {
      inProgressRecipes = JSON.parse(inProgressRecipesFromStorage);
    }
    if (recipeType === 'comida') {
      if (checked) {
        const previousList = inProgressRecipes.meals[id] || [];
        inProgressRecipes.meals[id] = [...previousList, ingredient];
      } else {
        const previousList = inProgressRecipes.meals[id] || [];
        const filteredList = previousList.filter((item) => item !== ingredient);
        inProgressRecipes.meals[id] = filteredList;
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <div key={ ingredient }>
          <label
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            className="ingredient-checked"
          >
            <input
              type="checkbox"
              id={ ingredient }
              value={ ingredient }
              onClick={ (event) => handleClick(event.target.checked, ingredient) }
            />
            { ingredient }
          </label>
        </div>
      ))}
    </div>
  );
}

IngredientsProgress.propTypes = {
  ingredients: PropTypes.arrayOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
};
