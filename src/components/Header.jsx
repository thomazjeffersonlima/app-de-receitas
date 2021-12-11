import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../contexts/RecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import fetchRecipes from '../services/fetchApi';
import '../styles/Header.css';

export default function Header({ title, searchHidden }) {
  const history = useHistory();
  const {
    foodsRecipes,
    setFoodsRecipes,
    drinksRecipes,
    setDrinksRecipes,
  } = useContext(RecipesContext);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filter, setFilter] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const CATEGORY_LENGTH = 3;
    if (
      foodsRecipes.length === 1
      && Object.keys(foodsRecipes[0]).length > CATEGORY_LENGTH
    ) {
      history.push(`/comidas/${foodsRecipes[0].idMeal}`);
    }
    if (
      drinksRecipes.length === 1
      && Object.keys(drinksRecipes[0]).length > CATEGORY_LENGTH
    ) {
      history.push(`/bebidas/${drinksRecipes[0].idDrink}`);
    }
  }, [drinksRecipes, foodsRecipes, history]);

  const handleFilter = ({ target: { value, id } }) => {
    setRadioFilter(id);
    if (value === 'i') {
      setFilter(`filter.php?${value}`);
    } else {
      setFilter(`search.php?${value}`);
    }
  };

  const handleSearchInput = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleSearch = async () => {
    if (radioFilter === 'first-letter' && searchValue.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      const apiReturn = await fetchRecipes(title, `${filter}=${searchValue}`);
      if (!apiReturn || apiReturn === null) {
        return global.alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros.',
        );
      }
      if (title === 'Comidas') {
        setFoodsRecipes(apiReturn);
      } else {
        setDrinksRecipes(apiReturn);
      }
    }
  };

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <Link to="/perfil">
          <input
            type="image"
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {!searchHidden && (
          <input
            type="image"
            src={ searchIcon }
            alt="search icon"
            data-testid="search-top-btn"
            onClick={ () => setShowSearchBar(!showSearchBar) }
          />
        )}
      </div>
      {showSearchBar && (
        <div className="header-filter">
          <input
            type="text"
            data-testid="search-input"
            className="header-search-bar"
            onChange={ handleSearchInput }
          />
          <div className="header-options">
            <label htmlFor="ingredient">
              <input
                type="radio"
                name="filterOptions"
                id="ingredient"
                data-testid="ingredient-search-radio"
                value="i"
                onChange={ handleFilter }
              />
              Ingrediente
            </label>
            <label htmlFor="name">
              <input
                type="radio"
                name="filterOptions"
                id="name"
                data-testid="name-search-radio"
                value="s"
                onChange={ handleFilter }
              />
              Nome
            </label>
            <label htmlFor="first-letter">
              <input
                type="radio"
                name="filterOptions"
                id="first-letter"
                data-testid="first-letter-search-radio"
                value="f"
                onChange={ handleFilter }
              />
              Primeira Letra
            </label>
          </div>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleSearch }
          >
            Buscar
          </button>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchHidden: PropTypes.bool,
};

Header.defaultProps = {
  searchHidden: false,
};
