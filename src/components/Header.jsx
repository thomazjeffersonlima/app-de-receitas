import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/">
        <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
      </Link>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
