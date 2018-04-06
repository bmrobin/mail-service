import React from 'react';
import * as propTypes from 'prop-types';
import './error.css';

export default function Error(props) {
  return (
    <p className="error">{props.message}</p>
  );
}

Error.propTypes = {
  message: propTypes.string.isRequired
};
