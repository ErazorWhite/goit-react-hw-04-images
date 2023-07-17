import { Overlay, ModalWrapper } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ src, alt, closeModal }) => {
  
  useEffect(() => {
    const handleEsc = e => {
      closeModal();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <img src={src} alt={alt} />
      </ModalWrapper>
    </Overlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
