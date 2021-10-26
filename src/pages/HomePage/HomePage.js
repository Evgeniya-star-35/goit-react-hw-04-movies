import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Api from '../../Services/API';
import PageHeading from '../../components/PageHeading/PageHeading';
import MovieList from '../../components/MovieList/MovieList';

export default function HomeViews() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Api.fetchTrending().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      <MovieList movies={movies} />
    </>
  );
}
