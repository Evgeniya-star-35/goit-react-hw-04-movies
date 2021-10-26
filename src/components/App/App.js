import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Container from '../Container';
import AppBar from '../AppBar/AppBar';
import NotFoundMovie from '../../pages/NotFoundMovie/NotFoundMovie';

function App() {
  return (
    <Suspense fallback={<Loader />}>
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
          <Route>
            <NotFoundMovie />
          </Route>
        </Switch>
      </Container>
    </Suspense>
  );
}

export default App;
