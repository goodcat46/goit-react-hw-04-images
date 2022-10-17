import ReactDOM from 'react-dom';

console.log(ReactDOM);
const ModalPortal = props => {
  const modalRef = document.getElementById('modal');
  return ReactDOM.createPortal(props.children, modalRef);
};

ModalPortal.propTypes = {};

export default ModalPortal;
