import React, { useState } from 'react';
import Notiflix from 'notiflix';
// import { useApp } from 'contexts/AppContext';
import { PixabayApi } from '../api/fetchAPI';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import css from './app.module.css';

const pixabayApi = new PixabayApi();
console.log(pixabayApi);
export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedData, setLoadedData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadMoreBtn, setIsLoadMoreBtn] = useState(false);
  const [imgsPerPage, setImgsPerPage] = useState(0);
  const [currentImgUrl, setCurrentImgUrl] = useState(2);

  const onSearchInputChange = event => {
    let {
      target: { value },
    } = event;
    setSearchQuery(value.trim());
  };
  const onImgsPerPageInputChange = event => {
    let {
      target: { value },
    } = event;
    setImgsPerPage(value.trim());
  };
  const onSearchFormSubmit = async event => {
    event.preventDefault();
    //* зчитую інпут
    pixabayApi.searchQuery = searchQuery.trim();
    //* скидую лічильник
    pixabayApi.page = 1;
    //* встановлюю кількість картинок у запиті
    pixabayApi.per_page = imgsPerPage
    // * Якщо відправляться пусте поле запит не відбудеться
    if (searchQuery.trim() === '') {
      Notiflix.Notify.info('Please type your query');
      return;
    }
    // *Варіант через async/await
    try {
      const { data } = await pixabayApi.fetchPhotosByQuery();
      setLoadedData(data.hits);
      setIsLoader(true);
      setIsLoadMoreBtn(true);
      console.log(data);

      if (data.totalHits === 0) {
        setIsLoadMoreBtn(false);
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
        //* ховаю кнопку
        setIsLoadMoreBtn(false);
        //* виводжу повідомлення про кінець запитів
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );

        return;
      }
      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page) {
        // *Якщо ТІЛЬКИ одна сторінка то тільки відмальовуємо
        setIsLoadMoreBtn(false);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        return;
      }
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } catch (err) {
      //* помилка піде у лог
      console.log(err);
    } finally {
      setIsLoader(false);
    }
  };
  const onLoadMoreBtnClick = async event => {
    //* Варіант через async/await
    try {
      pixabayApi.page += 1;

      const { data } = await pixabayApi.fetchPhotosByQuery();

      console.log(data);

      //* показую лоадер

      setLoadedData(prev => [...prev, ...data.hits]);
      setIsLoader(true);
      setIsLoadMoreBtn(true);

      if (pixabayApi.page < data.totalHits / pixabayApi.per_page + 1) {
        Notiflix.Notify.success(`Loaded next ${pixabayApi.per_page} images `);
        return;
      }
      if (pixabayApi.page >= data.totalHits / pixabayApi.per_page + 1) {
        setIsLoadMoreBtn(false);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoader(false);
    }
  };
  const handleToggleModal = el => {
    setIsOpenModal(!isOpenModal);
    setCurrentImgUrl(el);
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
    <div className={css.App}>
      <Searchbar
        onSearchFormSubmit={onSearchFormSubmit}
        onSearchInputChange={onSearchInputChange}
        onImgsPerPageInputChange={onImgsPerPageInputChange}
      />

      {loadedData.length !== 0 && (
        <ImageGallery
          loadedData={loadedData}
          onToggleModal={handleToggleModal}
        />
      )}
      {isLoader && <Loader />}
      {isLoadMoreBtn && <Button onLoadMoreBtnClick={onLoadMoreBtnClick} />}
      {isOpenModal && (
        <Modal
          currentImgUrl={currentImgUrl}
          onToggleModalByBtn={handleToggleModal}
          onToggleModalByOverlay={handleToggleModalOverlay}
          onCloseModalByEsc={handleToggleModalByEsc}
        />
      )}
    </div>
  );
};
// * <Searchbar/>, <ImageGallery/>, <ImageGalleryItem/>, <Loader/>, <Button/> і <Modal/>
