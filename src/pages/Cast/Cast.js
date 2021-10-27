import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../Services/API';
import { castUrl } from '../../Services/API';
import s from './Cast.module.css';
import defaultImg from '../../images/noFound.jpg';
export default function Cast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    Api.fetchMovieByCast(movieId)
      .then(res => {
        setCasts(res);
        // window.scrollTo({
        //   top: document.documentElement.clientWidth,
        //   behavior: 'smooth',
        // });
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [movieId]);

  return (
    <>
      <ul className={s.CastGallery}>
        {casts.map(({ id, name, character, profile_path }) => (
          <li key={id} className={s.CastGalleryItem}>
            <img
              src={profile_path ? `${castUrl}${profile_path}` : defaultImg}
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
