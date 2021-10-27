import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      {/* {movies.length && ( */}
      <ul>
        {movies.map(movie => (
          <li className={s.title} key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.original_title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* )} */}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape),
};
