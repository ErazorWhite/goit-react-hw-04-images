import { AiOutlineSearch } from 'react-icons/ai';
import { StyledHeader } from './SearchBar.styled';
import { Formik, ErrorMessage } from 'formik';
import {
  StyledForm,
  StyledSearchFormButton,
  StyledSearchFormInput,
} from './SearchBar.styled';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

let searchValidationSchema = Yup.object().shape({
  searchQuery: Yup.string().required('Required!'),
});

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <StyledHeader>
      <Formik
        initialValues={{ searchQuery: '' }}
        validationSchema={searchValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <StyledSearchFormButton type="submit" disabled={isSubmitting}>
              <AiOutlineSearch style={{ width: 28, height: 28 }} />
            </StyledSearchFormButton>

            <StyledSearchFormInput
              type="text"
              autoComplete="off"
              autoFocus
              name="searchQuery"
              placeholder="Search images and photos"
            />
            <ErrorMessage style={{color:"red", marginRight: "5px"}} name="searchQuery" component="div" />
          </StyledForm>
        )}
      </Formik>
    </StyledHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
