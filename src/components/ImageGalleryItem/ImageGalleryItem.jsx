import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import ModalPortal from 'components/ModalPortal/ModalPortal';
import css from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ imgUrl, onToggleModal }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleToggleModal = el => {
    setIsOpenModal(!isOpenModal);
  };
  const handleToggleModalOverlay = evt => {
    let { target, currentTarget } = evt;
    if (target === currentTarget) {
      handleToggleModal();
    }
  };
  const handleToggleModalByEsc = evt => {
    let { code } = evt;
    if (code === 'Escape') {
      handleToggleModal();
      window.removeEventListener('keydown', handleToggleModalByEsc);
    }
  };
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        onClick={() => {
          setIsOpenModal(true);
        }}
        src={imgUrl}
        alt="Modal_PHOTO"
      />

      {isOpenModal && (
        <ModalPortal>
          <Modal
            currentImgUrl={imgUrl}
            onToggleModalByBtn={handleToggleModal}
            onToggleModalByOverlay={handleToggleModalOverlay}
            onCloseModalByEsc={handleToggleModalByEsc}
          />
        </ModalPortal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string,
  onToggleModal: PropTypes.func,
};

export default ImageGalleryItem;
