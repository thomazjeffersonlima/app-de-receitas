import PropTypes from 'prop-types';
import React from 'react';

export default function RecipesDoneFilter(props) {
  const { setFiltro } = props;

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFiltro('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFiltro('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFiltro('bebida') }
      >
        Drinks
      </button>
    </div>
  );
}

RecipesDoneFilter.propTypes = {
  setFiltro: PropTypes.func.isRequired,
};
