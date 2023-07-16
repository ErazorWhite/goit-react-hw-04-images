import { StyledLi, StyledImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { imageSrc, imageAlt, largeImageURL } = this.props;
    const { isModalOpen } = this.state;
    const { openModal, closeModal } = this;

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
}

ImageGalleryItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
