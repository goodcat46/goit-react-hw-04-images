// import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types'
console.log(ReactDOM);
const ModalPortal = props => {
  const modalRef = document.getElementById('modal');
  return ReactDOM.createPortal(props.children, modalRef);
};

ModalPortal.propTypes = {};

export default ModalPortal;
