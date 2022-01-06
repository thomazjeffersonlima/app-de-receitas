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

  const checkIngredient = (ingredient) => {
    const inProgressRecipesFromStorage = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesFromStorage === null) {
      return false;
    }
    const inProgressRecipes = JSON.parse(inProgressRecipesFromStorage);
    if (recipeType === 'comida') {
      const previousList = inProgressRecipes.meals[id] || [];
      return previousList.includes(ingredient);
    }
    // recupera a informação
    // checar se ta no localStorage (se existe ou é nulo. Se for nulo, significa que não começou ainda a receita e todos os intens são desmarcados)
    // faz um parse
    // pega a lista de ingredientes marcados
    // checar se o ingreditente está na lista ou não
    return false;
  };

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
          <input
            className="check-with-label"
            type="checkbox"
            id={ ingredient }
            value={ ingredient }
            onClick={ (event) => handleClick(event.target.checked, ingredient) }
            defaultChecked={ checkIngredient(ingredient) }
          />
          <label
            htmlFor={ ingredient }
            className="label-for-check"
          >
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
