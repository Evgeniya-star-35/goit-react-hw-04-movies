import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, Switch, Route, useLocation, useHistory } from 'react-router-dom';
/* instruments */
import Api from '../../../Services/API';
import { posterUrl } from '../../../Services/API';
import s from './MovieDetailsPage.module.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
/*components */
const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "Reviews" */),
);

const MovieDetailsPage = props => {
  const [movieInfo, setMovieInfo] = useState({});
  const [error, setError] = useState(false);

  const movieId = props.match.params.movieId;
  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    Api.fetchMovieById(movieId)
      .then(res => {
        setMovieInfo(res.data);
      })
      .catch(err => {
        setError(true);
      });
  }, [movieId]);

  const goBack = () => {
    history.push({ ...location.state.from });
  };

  const {
    poster_path,
    title,
    name,
    vote_average,
    overview,
    genres,
    release_date,
  } = movieInfo;
  return (
    <>
      <button onClick={goBack}>&#8592; Go back</button>
      {error && (
        <>
          <p>something gone wrong</p>
        </>
      )}
      {movieInfo.genres && (
        <>
          <article className={s.movieCard}>
            <img
              src={`${posterUrl}${poster_path}`}
              alt={title || name}
              className={s.poster}
            />
            <section className={s.movieCardInfo}>
              <h3 className={s.title}>{`${title || name} (${
                release_date.split('-')[0]
              })`}</h3>
              <p className={s.score}>user score - {`${vote_average * 10}%`}</p>
              <h4>Overview</h4>
              <p>{overview}</p>
              <h5>Genres</h5>
              <ul className={s.genreList}>
                {genres.map(el => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ul>
            </section>
          </article>
          <section className={s.additionalInfo}>
            <p>Additional Information</p>
            <ul className={s.adInfoList}>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movieId}/cast`,
                    state: {
                      from: location.state.from,
                    },
                  }}
                  className={s.link}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movieId}/reviews`,
                    state: {
                      from: location.state.from,
                    },
                  }}
                  className={s.link}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense fallback={<Loader type="TailSpin" color="#red" />}>
              <Switch>
                <Route path={`${props.match.path}/cast`} component={Cast} />
                <Route
                  path={`${props.match.path}/reviews`}
                  component={Reviews}
                />
              </Switch>
            </Suspense>
          </section>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
