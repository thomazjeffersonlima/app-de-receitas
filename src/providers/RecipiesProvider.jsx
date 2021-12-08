import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipiesContext from '../contexts/RecipiesContext';

export default function RecipiesProvider({ children }) {
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);

  const contextValue = {
    isValidEmail,
    setValidEmail,
    isValidPassword,
    setValidPassword,
  };

  return (
    <RecipiesContext.Provider value={ contextValue }>
      {children}
    </RecipiesContext.Provider>
  );
}

RecipiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
