import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { StyledUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures }) => {
  return (
    <StyledUl>
      {pictures.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            imageSrc={webformatURL}
            largeImageURL={largeImageURL}
            imageAlt={tags}
          />
        );
      })}
    </StyledUl>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};
