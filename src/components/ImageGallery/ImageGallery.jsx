import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';

const ImageGallery = ({ onToggleModal, loadedData }) => {
  return (
    <ul className={css.ImageGallery}>
      {loadedData.map(el => (
        <ImageGalleryItem
          key={el.id}
          imgUrl={el.webformatURL}
          onToggleModal={onToggleModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onToggleModal: PropTypes.func,
  loadedData: PropTypes.array,
};

export default ImageGallery;
