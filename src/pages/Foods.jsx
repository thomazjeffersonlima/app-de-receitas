import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Foods({ location: { pathname } }) {
  return (
    <>
      <Header title={ pathname.replace('/', '') } />
      <div>Comidas</div>
    </>
  );
}

Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
