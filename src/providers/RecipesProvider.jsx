import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from '../contexts/RecipesContext';

export default function RecipesProvider({ children }) {
  const [defaultFoodRecipes, setDefaultFoodRecipes] = useState([]);
  const [defaultDrinkRecipes, setDefaultDrinkRecipes] = useState([]);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [foodsRecipes, setFoodsRecipes] = useState([]);
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  const contextValue = {
    defaultFoodRecipes,
    setDefaultFoodRecipes,
    defaultDrinkRecipes,
    setDefaultDrinkRecipes,
    isValidEmail,
    setValidEmail,
    isValidPassword,
    setValidPassword,
    foodsRecipes,
    setFoodsRecipes,
    drinksRecipes,
    setDrinksRecipes,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
