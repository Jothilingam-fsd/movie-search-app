import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/omdb';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={movie.Poster} alt={movie.Title} className="w-64" />
        <div>
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}
