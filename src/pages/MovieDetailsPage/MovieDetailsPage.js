import React, { useState, useEffect, lazy, Suspense } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
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
import moviePhoto from '../../images/movie.jpg';
import NotFound from '../NotFoundMovie';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "Reviews" */),
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

  const createVisibleCast = () => {
    if (isVisibleReviews === true) {
      setIsVisibleReviews(false);
    }
    setIsVisibleCast(true);
  };

  const createVisibleReviews = () => {
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
      {movie ? (
        <>
          <img
            src={
              movie.poster_path
                ? `${posterUrl}${movie.poster_path}`
                : moviePhoto
            }
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
          {<h3 className={s.titleGenre}>Genres</h3>}
          {
            <span className={s.spanGenre}>
              {movie.genres.map(genre => genre.name).join(' ')}
            </span>
          }
          <hr />
          <p className={s.addInfo}>Additional information</p>
          <span role="img" aria-label="camera">
            &nbsp;🎥
          </span>

          <ul className={s.navList}>
            <li className={s.navItem}>
              <NavLink
                className={s.link}
                activeClassName={s.activeLink}
                to={`${url}/cast`}
                onClick={createVisibleCast}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.navItem}>
              <NavLink
                className={s.link}
                activeClassName={s.activeLink}
                to={`${url}/reviews`}
                onClick={createVisibleReviews}
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
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default MovieDetailsPage;
