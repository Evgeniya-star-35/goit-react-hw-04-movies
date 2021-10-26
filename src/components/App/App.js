import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import Container from '../Container';
import AppBar from '../AppBar/AppBar';
import NotFoundMovie from '../../pages/NotFoundMovie/NotFoundMovie';

// import NoFound from '../NoFound';

function App() {
  return (
    <Container>
      <ToastContainer autoClose={4000} />

      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies">
          <MoviesPage />
        </Route>

        {/* <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route> */}
        <Route>
          <NotFoundMovie />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
