import React from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const Modal = ({ currentImgUrl, onToggleModalByBtn, onToggleModalByOverlay, onCloseModalByEsc }) => {
  window.addEventListener('keydown',onCloseModalByEsc)
  return (
    <div className={css.Overlay} onClick={(evt)=>{
      onToggleModalByOverlay(evt)
    }}>
      <div className={css.Modal}>
        <img src={currentImgUrl} alt="img_" />
      </div>
      <button
        className={css.closeModal}
        onClick={() => {
          onToggleModalByBtn();
        }}
      >
        Close
      </button>
    </div>
  );
};

Modal.propTypes = {
  currentImgUrl: PropTypes.string,
  onToggleModalByBtn: PropTypes.func,
  onToggleModalByOverlay: PropTypes.func,
};

export default Modal;
