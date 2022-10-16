import PropTypes from 'prop-types';

import css from './serchbar.module.css';

const Searchbar = ({ onSearchFormSubmit, onSearchInputChange }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSearchFormSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          // required
          onChange={onSearchInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearchFormSubmit: PropTypes.func,
  onSearchInputChange: PropTypes.func,
};

export default Searchbar;
