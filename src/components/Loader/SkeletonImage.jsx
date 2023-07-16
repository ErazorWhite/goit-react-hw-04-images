import ContentLoader from 'react-content-loader';
import { StyledUl } from 'components/ImageGallery/ImageGallery.styled';
import { StyledLi } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import scss from './SkeletomImage.module.scss';
import PropTypes from 'prop-types';

export const Loader = ({ count }) => {
  const skeletonArray = Array.from({ length: count });
  return (
    <StyledUl>
      {skeletonArray.map((_, index) => (
        <StyledLi key={index}>
          <Skeleton />
        </StyledLi>
      ))}
    </StyledUl>
  );
};

Loader.propTypes = {
  count: PropTypes.number.isRequired,
};

export const Skeleton = props => (
  <ContentLoader
    className={scss.styledLoader}
    speed={2}
    width={360}
    height={260}
    viewBox="0 0 360 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="360" height="260" />
  </ContentLoader>
);
