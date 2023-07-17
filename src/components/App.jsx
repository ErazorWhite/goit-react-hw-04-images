import { StyledAppContainer } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Buton/Button';
import { SearchBar } from './SearchBar/SearchBar';
import { getPicturesByQuery } from 'services/PixabayAPI';
import { Loader } from './Loader/SkeletonImage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useCallback } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [totalImages, setTotalImages] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const getPictures = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const normalizedSearchQuery = searchQuery.toLowerCase();

      const { hits, totalHits } = await getPicturesByQuery(
        normalizedSearchQuery,
        page,
        perPage
      );

      if (!totalHits) {
        setError("We didn't find the pictures you are looking for :(");
        return;
      }
      setPictures(prevPictures => [...prevPictures, ...hits]);
      setTotalImages(totalHits);
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [page, perPage, searchQuery]);

  useEffect(() => {
    if (!searchQuery) return;
    getPictures();
  }, [page, searchQuery, getPictures]);

  const getQuery = ({ searchQuery: query }) => {
    const newQuery = query.toLowerCase();
    if (newQuery === searchQuery) {
      toast('Try to enter something else!');
      return;
    }
    resetPageNewSearch(newQuery);
  };

  const resetPageNewSearch = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPictures([]);
    setTotalImages(0);
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <StyledAppContainer>
      <SearchBar onSubmit={getQuery} />
      <ImageGallery pictures={pictures} />
      {isLoading && <Loader count={perPage} />}
      {!isLoading && pictures.length !== totalImages && (
        <Button onClick={handleLoadMoreClick} />
      )}
    </StyledAppContainer>
  );
};
