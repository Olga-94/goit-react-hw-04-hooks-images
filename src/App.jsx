import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Api } from './Services/Api-service';
import { onErrorNotification } from './Services/Notification';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import LoadMoreButton from './Components/LoadMoreButton/LoadMoreButton';
import Spinner from './Components/Spinner/Spinner';
import Modal from './Components/Modal/Modal';

export default class App extends Component {
  static propTypes = { searchQuery: PropTypes.string };

  state = {
    searchQuery: '',
    page: 1,
    images: [],
    selectedImg: null,
    alt: null,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const images = await Api.getImages(searchQuery, page);

        if (!images.length) {
          throw new Error();
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));
      } catch (error) {
        onErrorNotification();
        this.setState({ status: 'rejected' });
      }

      this.state.page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    }
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }

    this.resetState();
    this.setState({ searchQuery });
  };

  loadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImg: largeImageUrl,
      alt: tags,
    });
  };

  closeModal = () => {
    this.setState({
      selectedImg: null,
    });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImg: null,
      alt: null,
      status: 'idle',
    });
  };

  render() {
    const { images, selectedImg, alt, status } = this.state;

    if (status === 'idle') {
      return <SearchBar onSubmit={this.handleFormSubmit} />;
    }

    if (status === 'pending') {
      return (
        <>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <Spinner />
          <ImageGallery
            images={images}
            selectedImage={this.handleSelectedImage}
          />
          {images.length > 0 && (
            <LoadMoreButton onClick={this.loadMoreBtnClick} />
          )}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery
            images={images}
            selectedImage={this.handleSelectedImage}
          />
          {selectedImg && (
            <Modal
              selectedImg={selectedImg}
              tags={alt}
              onClose={this.closeModal}
            />
          )}
          {images.length > 0 && (
            <LoadMoreButton onClick={this.loadMoreBtnClick} />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <SearchBar onSubmit={this.handleFormSubmit} />
        </>
      );
    }
  }
}
