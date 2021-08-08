// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Api } from './Services/Api-service';
import { StyledApp } from './App.styled';
import { onErrorNotification } from './Services/Notification';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import LoadMoreButton from './Components/LoadMoreButton/LoadMoreButton';
import Spinner from './Components/Spinner/Spinner';
import Modal from './Components/Modal/Modal';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchQuery) {
      return
    }

    async function getFetchImages() {
      setStatus('pending');
      try {
        const images = await Api.getImages(searchQuery, page);

           if (!images.length) {
          throw new Error();
        }

        setImages(prevImages => [...prevImages, ...images]);
        setStatus('resolved');

         if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
         }

        } catch (error) {
        onErrorNotification();
        setStatus('rejected');
      }
      }
    getFetchImages();

  }, [searchQuery, page]);
       
        
  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return
    }
    
    resetState();
    setSearchQuery(query);
  };

  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  }

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImg(largeImageUrl);
    setAlt(tags);
  }
  
  const closeModal = () => {
    setSelectedImg(null)
  }

  const resetState = () => {
    setSearchQuery('');
    setPage(1);
    setImages([]);
    setSelectedImg(null);
    setAlt(null);
    setStatus('idle');
  }

  if (status === 'idle') {
    return <SearchBar onSubmit={handleFormSubmit} />
  }

  if (status === 'pending') {
    return (
      <StyledApp>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
          <Spinner />
        {images.length > 0 &&
          <LoadMoreButton onClick={loadMoreBtnClick} />
        }
      </StyledApp>
    )
  }

  if (status === 'resolved') {
    return (
      <StyledApp>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
        {selectedImg &&
          <Modal selectedImg={selectedImg} tags={alt} onClose={closeModal} />
        }
        {images.length > 0 &&
          <LoadMoreButton onClick={loadMoreBtnClick} />}
      </StyledApp>
)
  }

  if (status === 'rejected') {
    return (
     <StyledApp>
       <SearchBar onSubmit={handleFormSubmit} />
     </StyledApp>
    )
  }
}



// export default class App extends Component {
//   static propTypes = { searchQuery: PropTypes.string };

//   state = {
//     searchQuery: '',
//     page: 1,
//     images: [],
//     selectedImg: null,
//     alt: null,
//     status: 'idle',
//   };

//   async componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;

//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.setState({ status: 'pending' });

//       try {
//         const images = await Api.getImages(searchQuery, page);

//         if (!images.length) {
//           throw new Error();
//         }

//         this.setState(prevState => ({
//           images: [...prevState.images, ...images],
//           status: 'resolved',
//         }));
//       } catch (error) {
//         onErrorNotification();
//         this.setState({ status: 'rejected' });
//       }

//       page > 1 &&
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//     }
//   }

//   handleFormSubmit = searchQuery => {
//     if (this.state.searchQuery === searchQuery) {
//       return;
//     }

//     this.resetState();
//     this.setState({ searchQuery });
//   };

//   loadMoreBtnClick = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handleSelectedImage = (largeImageUrl, tags) => {
//     this.setState({
//       selectedImg: largeImageUrl,
//       alt: tags,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       selectedImg: null,
//     });
//   };

//   resetState = () => {
//     this.setState({
//       searchQuery: '',
//       page: 1,
//       images: [],
//       selectedImg: null,
//       alt: null,
//       status: 'idle',
//     });
//   };

//   render() {
//     const { images, selectedImg, alt, status } = this.state;

//     if (status === 'idle') {
//       return <SearchBar onSubmit={this.handleFormSubmit} />;
//     }

//     if (status === 'pending') {
//       return (
//         <>
//           <SearchBar onSubmit={this.handleFormSubmit} />
//           <Spinner />
//           <ImageGallery
//             images={images}
//             selectedImage={this.handleSelectedImage}
//           />
//           {images.length > 0 && (
//             <LoadMoreButton onClick={this.loadMoreBtnClick} />
//           )}
//         </>
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <SearchBar onSubmit={this.handleFormSubmit} />
//           <ImageGallery
//             images={images}
//             selectedImage={this.handleSelectedImage}
//           />
//           {selectedImg && (
//             <Modal
//               selectedImg={selectedImg}
//               tags={alt}
//               onClose={this.closeModal}
//             />
//           )}
//           {images.length > 0 && (
//             <LoadMoreButton onClick={this.loadMoreBtnClick} />
//           )}
//         </>
//       );
//     }

//     if (status === 'rejected') {
//       return (
//         <>
//           <SearchBar onSubmit={this.handleFormSubmit} />
//         </>
//       );
//     }
//   }
// }
