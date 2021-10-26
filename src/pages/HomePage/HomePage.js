import { useState, useEffect } from 'react';
import Api from '../../Services/API';
import PageHeading from '../../components/PageHeading/PageHeading';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
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
