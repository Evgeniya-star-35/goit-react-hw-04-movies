import PropTypes from 'prop-types';
import { posterUrl } from '../../Services/API';
import moviePhoto from '../../images/movie.jpg';

import s from './InfoAboutMovie.module.css';

export default function GetMovieInfo({ movie }) {
  return (
    <>
      <img
        src={
          movie.poster_path ? `${posterUrl}${movie.poster_path}` : moviePhoto
        }
        alt={movie.title}
        className={s.poster}
      />
      <h3 className={s.title}>{movie.original_title || movie.name}</h3>
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
    </>
  );
}
GetMovieInfo.propTypes = {
  movie: PropTypes.object,
};
