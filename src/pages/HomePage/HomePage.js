import { useState, useEffect, Suspense, lazy } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Api from '../../Services/API';
import PageHeading from '../../components/PageHeading';
import s from '../MoviesPage/MoviesPage.module.css';
const MovieDetailsPage = lazy(() => import('../MovieDetailsPage'));
// import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const location = useLocation();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Api.fetchTrending().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <>
      {/* <PageHeading text="Trending today" /> */}
      {/* <MovieList movies={movies} /> */}
      <Suspense fallback={<Loader />}>
        <PageHeading text="Trending today" />
        <Switch>
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route
            exact
            path="/"
            render={() => (
              <>
                <ul className={s.list}>
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
                </ul>
              </>
            )}
          />
        </Switch>
      </Suspense>
    </>
  );
}
