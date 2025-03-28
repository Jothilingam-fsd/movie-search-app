
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/omdbService';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <img src={movie.Poster} alt={movie.Title} className="w-64" />
        <div>
          <h1 className="text-2xl font-bold">{movie.Title}</h1>
          <p>{movie.Released} | {movie.Genre}</p>
          <p>{movie.Plot}</p>
          <p><strong>Ratings:</strong> {movie.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
