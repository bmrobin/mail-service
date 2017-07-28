import React from 'react';
import './error.css';

export default function Error(props) {
  return (
    <p className="error">{props.message}</p>
  );
}
