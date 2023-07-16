import { Component } from 'react';
import { StyledAppContainer } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Buton/Button';
import { SearchBar } from './SearchBar/SearchBar';
import { getPicturesByQuery } from 'services/PixabayAPI';
import { Loader } from './Loader/SkeletonImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    perPage: 12,
    pictures: [],
    isLoading: false,
    error: null,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (page !== prevState.page || searchQuery !== prevState.searchQuery) {
      this.getPictures();
    }
  }

  getQuery = ({ searchQuery }) => {
    if (this.state.searchQuery === searchQuery) {
      toast("Try to enter something else!");
      return;
    }
    this.setState({ searchQuery, page: 1, pictures: [], totalImages: 0 });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getPictures = async () => {
    const { searchQuery, page, perPage } = this.state;
    try {
      this.setState({ isLoading: true });
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

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...hits],
        totalImages: totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { pictures, isLoading, totalImages, perPage } = this.state;
    return (
      <StyledAppContainer>
        <ToastContainer />
        <SearchBar onSubmit={this.getQuery} />
        <ImageGallery pictures={pictures} />
        {isLoading && <Loader count={perPage} />}
        {!isLoading && pictures.length !== totalImages && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
      </StyledAppContainer>
    );
  }
}
