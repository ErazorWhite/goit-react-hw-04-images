import { StyledLi, StyledImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({imageSrc, imageAlt, largeImageURL}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <>
      <StyledLi onClick={openModal}>
        <StyledImg src={imageSrc} alt={imageAlt} />
      </StyledLi>
      {isModalOpen && (
        <Modal closeModal={closeModal} src={largeImageURL} alt={imageAlt} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
