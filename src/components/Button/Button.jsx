import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ onLoadMoreBtnClick }) => {
  return (
    <button
      className={css.Button}
      onClick={() => {
        onLoadMoreBtnClick();
      }}
      type="button"
    >
      Load more
    </button>
  );
};

Button.propTypes = { onLoadMoreBtnClick: PropTypes.func };

export default Button;
