import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <button className='close-button' onClick={onClose}>
            ×
          </button>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
