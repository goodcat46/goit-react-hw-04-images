import React from 'react';
// import PropTypes from 'prop-types';
import { Oval } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = props => {
  return (
    <div>
      <Oval
        height="40"
        width="40"
        radius="9"
        color="green"
        ariaLabel="oval"
        // wrapperStyle
        // wrapperClass
      />
    </div>
  );
};

// Loader.propTypes = {};

export default Loader;
