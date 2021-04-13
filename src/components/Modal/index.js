import React from 'react';
import ReactModal from 'react-modal';
import './styles.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};

const Modal = ({ children, isOpen }) => {
  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      {children}
    </ReactModal>
  );
};

export default Modal;
