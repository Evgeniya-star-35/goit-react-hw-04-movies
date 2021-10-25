// import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../_pages/HomePage/HomePage';
import MoviesPage from '../_pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../_pages/MovieDetailsPage/MovieDetailsPage';
import Cast from '../_pages/Cast/Cast';
import NotFoundMovie from '../_pages/NotFoundMovie/NotFoundMovie';
import Reviews from '../_pages/Reviews/Reviews';
import Container from '../Container';
// import Searchbar from '../Searchbar';
// import MyLoader from '../Loader';
// import Button from '../Button';
// import { fetchPictures } from '../../Services/picturesApi';
// import scrollPageDown from '../../helpers/Scroll';
// import NoFound from '../NoFound';
// import ImageGallery from '../ImageGallery';
// import Modal from '../Modal';

function App() {
  // const [page, setPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [largeImage, setLargeImage] = useState({});

  // useEffect(() => {
  //   if (!searchQuery) return;
  //   setLoading(true);
  //   const fetchImages = async () => {
  //     try {
  //       const hits = await fetchPictures(searchQuery, page);
  //       setImages(prevImages => [...prevImages, ...hits]);
  //       if (page !== 1) {
  //         scrollPageDown();
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, [page, searchQuery]);

  // const handleOnLoadClick = () => {
  //   setLoading(true);
  //   setPage(prevPage => prevPage + 1);
  //   setLoading(false);
  // };

  // const handleClickImages = largeImage => {
  //   setLargeImage(largeImage);
  //   toggleModal();
  // };
  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  // const fetchImagesBySubmit = searchQuery => {
  //   setSearchQuery(searchQuery);
  //   setImages([]);
  //   setPage(1);
  //   setLoading(true);
  // };

  return (
    <Container>
      <ToastContainer autoClose={4000} />
      {/* <Searchbar onSubmit={fetchImagesBySubmit} />
      {loading && <MyLoader />}
      {images.length !== 0 ? (
        <ImageGallery images={images} onOpenModal={handleClickImages} />
      ) : (
        searchQuery !== '' && <NoFound />
      )}
      {loading && !showModal && <MyLoader />}
      {!loading && images[0] && <Button onClick={handleOnLoadClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          {loading && <MyLoader />}
          <img src={largeImage.largeImageURL} alt={largeImage.tags} />
        </Modal>
      )} */}
      <Switch>
        {/* <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies">
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route path="/movies/:movieId/cast">
          <Cast />
        </Route>
        <Route path="/movies/:movieId/reviews">
          <Reviews />
        </Route>
        <Route>
          <NotFoundMovie />
        </Route> */}
      </Switch>
    </Container>
  );
}

export default App;
