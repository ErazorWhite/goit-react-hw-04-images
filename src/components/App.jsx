import { StyledAppContainer } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Buton/Button';
import { SearchBar } from './SearchBar/SearchBar';
import { getPicturesByQuery } from 'services/PixabayAPI';
import { Loader } from './Loader/SkeletonImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useRef } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const prevSearchQueryRef = useRef(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12); // 'setPerPage' is declared but its value is never -_-
  const [totalImages, setTotalImages] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // 'error' is declared but its value is never read. -_-

  // 1. React Hook useEffect has a missing dependency: 'getPictures'. Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps
  // Ок, добавил getPictures в массив зависимостей
  // 2. 'getPictures' was used before it was defined.eslintno-use-before-define
  // Ок, вынес getPictures выше useEffect
  // 3. The 'getPictures' function makes the dependencies of useEffect Hook (at line 52) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'getPictures' in its own useCallback() Hook.eslintreact-hooks/exhaustive-deps
  // Чертов линтер, из-за всех этих warning у меня github build крашит

  // Нагуглил два решения:
  // а) "scripts": {
  //      "build": "CI=false && react-scripts build",  // Add CI=False here
  // б) env:
  //      CI: false;

  // Compiled with warnings.
  // Хз хорошо это или не очень

  useEffect(() => {
    getPictures();
    prevSearchQueryRef.current = searchQuery;
  }, [page, searchQuery]);

  const getPictures = async () => {
    try {
      setIsLoading(true);
      const normalizedSearchQuery = searchQuery.toLowerCase().trim();

      const { hits, totalHits } = await getPicturesByQuery(
        normalizedSearchQuery,
        page,
        perPage
      );

      if (!totalHits) {
        toast("We didn't find the pictures you are looking for :(");
        return;
      }
      setPictures(prevPictures => [...prevPictures, ...hits]);
      setTotalImages(totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getQuery = ({ searchQuery }) => {
    if (prevSearchQueryRef.current === searchQuery) {
      toast('Try to enter something else!');
      return;
    }
    resetPageNewSearch(searchQuery);
  };

  const resetPageNewSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPictures([]);
    setTotalImages(0);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <StyledAppContainer>
      <ToastContainer />
      <SearchBar onSubmit={getQuery} />
      <ImageGallery pictures={pictures} />
      {isLoading && <Loader count={perPage} />}
      {!isLoading && pictures.length !== totalImages && (
        <Button onClick={handleLoadMoreClick} />
      )}
    </StyledAppContainer>
  );
};
