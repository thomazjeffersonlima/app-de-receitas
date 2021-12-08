import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
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
      {showSearchBar && (
        <div>
          <input type="text" data-testid="search-input" />
          <div>
            <label htmlFor="ingredient">
              <input
                type="radio"
                name="filterOptions"
                id="ingredient"
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>
            <label htmlFor="name">
              <input
                type="radio"
                name="filterOptions"
                id="name"
                data-testid="name-search-radio"
              />
              Nome
            </label>
            <label htmlFor="first-letter">
              <input
                type="radio"
                name="filterOptions"
                id="first-letter"
                data-testid="first-letter-search-radio"
              />
              Primeira Letra
            </label>
          </div>
          <button type="button" data-testid="exec-search-btn">
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
