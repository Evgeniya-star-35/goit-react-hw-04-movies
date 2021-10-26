import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import s from './MovieList.module.css';

export default function MovieList({ movies }) {
  const { url } = useRouteMatch();

  return (
    <div>
      {movies.length && (
        <ul>
          {movies.map(movie => (
            <Link key={movie.id} to={`${url}/${movie.id}`} className={s.link}>
              <li className={s.title}>{movie.original_title || movie.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape),
};
