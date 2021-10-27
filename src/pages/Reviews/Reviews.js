import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Api from '../../Services/API';
// import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    Api.fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h2>{author}</h2>
              <span>{content}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have reviews for this movie.</p>
      )}
    </>
  );
}
