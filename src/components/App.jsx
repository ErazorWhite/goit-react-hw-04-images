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
  const [perPage] = useState(12);
  const [totalImages, setTotalImages] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);

  useEffect(() => {
    getPictures();
    prevSearchQueryRef.current = searchQuery;
  }, [page, searchQuery]);

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
