import { StyledButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <StyledButton onClick={onClick}>Load more</StyledButton>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};