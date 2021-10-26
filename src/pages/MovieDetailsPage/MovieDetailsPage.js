import React, { useState, useEffect, lazy, Suspense } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import {
  NavLink,
  Route,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
/* instruments */
import Api from '../../Services/API';
import { posterUrl } from '../../Services/API';
import s from './MovieDetailsPage.module.css';
import Loader from 'react-loader-spinner';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "Reviews" */),
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [isVisibleCast, setIsVisibleCast] = useState(false);
  const [isVisibleReviews, setIsVisibleReviews] = useState(false);

  useEffect(() => {
    Api.fetchMovieById(movieId)
      .then(setMovie)
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);

  const makeVisibleCast = () => {
    if (isVisibleReviews === true) {
      setIsVisibleReviews(false);
    }
    setIsVisibleCast(true);
  };

  const makeVisibleReviews = () => {
    if (isVisibleCast === true) {
      setIsVisibleCast(false);
    }

    setIsVisibleReviews(true);
  };
  const goBack = () => {
    if (location.state && location.state.from) {
      return history.push(location.state.from);
      // return history.push(location?.state?.from || routes.home);
    }
    history.push('/');
  };
  return (
    <>
      <button className={s.btn} onClick={goBack}>
        <span className={s.text}>Go Back</span>
      </button>
      {movie && (
        <>
          <img
            src={`${posterUrl}${movie.poster_path}`}
            alt={movie.title}
            className={s.poster}
          />
          <h3 className={s.title}>
            {movie.original_title || movie.name}(
            {movie.release_date.split('-')[0]})
          </h3>
          <span className={s.span}>User Score: {movie.vote_average * 10}%</span>
          <h2 className={s.titleOver}>Overview</h2>
          <span className={s.review}>{movie.overview}</span>
          {<h3>Genres</h3>}
          {<span>{movie.genres.map(genre => genre.name).join(' ')}</span>}
          <hr />
          <span>Additional information</span>
          <span role="img" aria-label="face emoji">
            💥
          </span>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                }}
                onClick={makeVisibleCast}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                }}
                onClick={makeVisibleReviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />

          <Suspense fallback={<Loader />}>
            <Route path={`${path}/:cast`}>
              {movie && isVisibleCast && <Cast />}
            </Route>

            <Route path={`${path}/:reviews`}>
              {movie && isVisibleReviews && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
