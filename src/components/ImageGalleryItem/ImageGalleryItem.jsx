import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ imgUrl, onToggleModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        onClick={() => {
          onToggleModal(imgUrl);
        }}
        src={imgUrl}
        alt="photo_"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string,
  onToggleModal: PropTypes.func,
};

export default ImageGalleryItem;
