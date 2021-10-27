import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './MoviesPage.module.css';

/* components */
import Api from '../../Services/API';
import PageHeading from '../../components/PageHeading';
const MovieDetailsPage = lazy(() => import('../MovieDetailsPage'));
const MovieList = lazy(() => import('../../components/MovieList'));
const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const changeHandler = e => {
    const inputQuery = e.target.value;
    setQuery(inputQuery);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please,enter the correct request!');
      return;
    }

    history.push({ ...location, search: `?query=${query}` });
    setQuery('');
  };

  useEffect(() => {
    const movie = queryString.parse(location.search).query;
    if (!movie) {
      setMovies([]);
      setQuery('');
    }

    if (location.search) {
      Api.fetchSearchMovies(movie).then(res => setMovies(res));
      setQuery(movie);
    }
  }, [location.search]);

  return (
    <Suspense fallback={<Loader />}>
      <PageHeading text="Find the movie you want!" />
      <Switch>
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route
          exact
          path="/movies"
          render={() => (
            <>
              <form onSubmit={submitHandler} className={s.searchForm}>
                <input
                  placeholder="enter movie"
                  value={query}
                  onChange={changeHandler}
                />
                <button type="submit">
                  <span>Search</span>
                </button>
              </form>
              <>
                <MovieList movies={movies} />
              </>
              {/* <ul className={s.list}>
                {movies.map(movie => (
                  <Link
                    key={movie.id}
                    to={{
                      pathname: `/movies/${movie.id}`,
                      state: {
                        from: location,
                      },
                    }}
                    className={s.link}
                  >
                    <li className={s.title}>{movie.title || movie.name}</li>
                  </Link>
                ))}
              </ul> */}
            </>
          )}
        />
      </Switch>
    </Suspense>
  );
};

export default MoviesPage;
