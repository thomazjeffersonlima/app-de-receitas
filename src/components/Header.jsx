import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipiesContext from '../contexts/RecipiesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import fetchRecipies from '../services/fetchApi';
import '../styles/Header.css';

export default function Header({ title }) {
  const history = useHistory();
  const {
    foodsRecipies,
    setFoodsRecipies,
    drinksRecipies,
    setDrinksRecipies,
  } = useContext(RecipiesContext);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filter, setFilter] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (foodsRecipies.length === 1) {
      history.push(`/comidas/${foodsRecipies[0].idMeal}`);
    }
    if (drinksRecipies.length === 1) {
      history.push(`/bebidas/${drinksRecipies[0].idDrink}`);
    }
  }, [foodsRecipies, drinksRecipies, history]);

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
      const apiReturn = await fetchRecipies(title, `${filter}=${searchValue}`);
      console.log(apiReturn);
      if (!apiReturn || apiReturn === null) {
        return global
          .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      return (title === 'Comidas')
        ? setFoodsRecipies(apiReturn) : setDrinksRecipies(apiReturn);
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
        <input
          type="image"
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        />
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
};
