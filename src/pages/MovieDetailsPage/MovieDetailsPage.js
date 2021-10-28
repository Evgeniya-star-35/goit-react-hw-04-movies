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

import Api from '../../Services/API';
import GetMovieInfo from '../../components/InfoAboutMovie';
import s from './MovieDetailsPage.module.css';
import NotFound from '../NotFoundMovie';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "Reviews" */),
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
    history.push(location?.state?.from ?? '/');
  };
  return (
    <>
      <button className={s.btn} onClick={goBack}>
        <span className={s.text}>⏪Go Back</span>
      </button>
      {movie ? (
        <>
          <GetMovieInfo movie={movie} />

          <ul className={s.navList}>
            <li className={s.navItem}>
              <NavLink
                className={s.link}
                activeClassName={s.activeLink}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location?.state?.from ?? '/' },
                }}
                onClick={createVisibleCast}
              >
                Cast
              </NavLink>
            </li>
            <li className={s.navItem}>
              <NavLink
                className={s.link}
                activeClassName={s.activeLink}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location?.state?.from ?? '/' },
                }}
                onClick={createVisibleReviews}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />

          <Suspense fallback={<Loader />}>
            <Route path={`${path}/cast`}>
              {movie && isVisibleCast && <Cast />}
            </Route>

            <Route path={`${path}/reviews`}>
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
