import PropTypes from 'prop-types';
import React from 'react';
import RecipiesContext from '../contexts/RecipiesContext';

export default function RecipiesProvider({ children }) {
  return <RecipiesContext.Provider>{children}</RecipiesContext.Provider>;
}

RecipiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
