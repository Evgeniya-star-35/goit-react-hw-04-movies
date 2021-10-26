import PropTypes from 'prop-types';

import Api from '../../Services/API'; //import файла, который прописывает логику настроек Api для http-запросов
import s from './Cast.module.css';
import { useParams } from 'react-router-dom';
import defaultImg from '../../noFound.jpg';
import { useState, useEffect } from 'react';

export default function Cast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    Api.fetchMovieByCast(movieId)
      .then(res => setCasts(res))
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);

  // window.scrollTo({
  //   top: document.documentElement.scrollHeight,
  //   behavior: 'smooth',

  return (
    <>
      <ul className={s.CastGallery}>
        {casts.map(({ id, name, character, profile_path }) => (
          <li key={id} className={s.CastGalleryItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w92/${profile_path}`
                  : defaultImg
              }
              alt={name}
              width="92"
              className={s.ItemImage}
            />
            <p className={s.text}>{name}</p>
            <p className={s.textName}>Character: {character}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
Cast.propTypes = {
  movieId: PropTypes.string,
};
