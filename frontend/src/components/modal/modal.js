import React, { useRef, useEffect } from 'react';
import styles from './modal.module.css';

const Modal = ({ children, onClose, open }) => {
  const modalReference = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalReference.current &&
        !modalReference.current.contains(e.target) &&
        open
      ) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [modalReference, open]);

  return (
    <div className={`${styles.backdrop} ${open && styles.open}`}>
      <div
        className={`${styles.modal} ${open && styles.open}`}
        ref={modalReference}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
