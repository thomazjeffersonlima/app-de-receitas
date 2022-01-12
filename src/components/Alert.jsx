import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Alert.css';

export default function Alert({ msg }) {
  return (
    <div className="Alert-container">
      <p>{ msg }</p>
    </div>
  );
}

Alert.propTypes = {
  msg: PropTypes.string.isRequired,
};
