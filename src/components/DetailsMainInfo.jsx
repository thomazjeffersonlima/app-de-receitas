import PropTypes from 'prop-types';
import React from 'react';

export default function DetailsMainInfo({
  isCopied,
  recipeType,
  recipe: {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
  },
}) {
  return (
    <>
      {isCopied && (
        <div className="copied-message">
          <p>Link copiado!</p>
        </div>
      )}
      <img
        src={ recipeType === 'comida' ? strMealThumb : strDrinkThumb }
        alt="recipe thumb"
        data-testid="recipe-photo"
        className="details-img"
      />
      <h2 data-testid="recipe-title">
        {recipeType === 'comida' ? strMeal : strDrink}
      </h2>
      <p data-testid="recipe-category">
        {recipeType === 'comida' ? strCategory : strAlcoholic}
      </p>
    </>
  );
}

DetailsMainInfo.propTypes = {
  isCopied: PropTypes.bool.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
};
