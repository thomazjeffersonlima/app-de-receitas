import PropTypes from 'prop-types';
import React from 'react';

export default function RecipesDoneFilter(props) {
  const { setObjectoFilter } = props;

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setObjectoFilter({
          filterAll: true,
          filterFood: false,
          filterDrink: false,
        }) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setObjectoFilter({
          filterAll: false,
          filterFood: true,
          filterDrink: false,
        }) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setObjectoFilter({
          filterAll: false,
          filterFood: false,
          filterDrink: true,
        }) }
      >
        Drinks
      </button>
    </div>
  );
}

RecipesDoneFilter.propTypes = {
  setObjectoFilter: PropTypes.shape().isRequired,
};
