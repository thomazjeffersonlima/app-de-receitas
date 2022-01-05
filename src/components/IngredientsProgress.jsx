import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsProgress({ ingredients }) {
  return (
    <div>
      {ingredients.map((ingredient) => (
        <div key={ ingredient }>
          <label htmlFor={ ingredient } data-testid="ingredient-step">
            <input type="checkbox" id={ ingredient } value={ ingredient } />
            { ingredient }
          </label>
        </div>
      ))}
    </div>
  );
}

IngredientsProgress.propTypes = {
  ingredients: PropTypes.arrayOf(Object).isRequired,
};
