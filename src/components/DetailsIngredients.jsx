import PropTypes from 'prop-types';
import React from 'react';
import IngredientsProgress from './IngredientsProgress';

export default function DetailsIngredients({
  inProgress,
  ingredients,
  id,
  recipeType,
  completedIngredients,
  setCompletedIngredients,
  measure,
}) {
  return (
    <div>
      <p>Ingredientes</p>
      {inProgress ? (
        <IngredientsProgress
          ingredients={ ingredients }
          id={ id }
          recipeType={ recipeType }
          completedIngredients={ completedIngredients }
          setCompletedIngredients={ setCompletedIngredients }
        />
      ) : (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${measure[index]}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

DetailsIngredients.propTypes = {
  completedIngredients: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measure: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeType: PropTypes.string.isRequired,
  setCompletedIngredients: PropTypes.func.isRequired,
};
