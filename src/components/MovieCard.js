import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="border p-2 rounded shadow hover:shadow-lg">
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
      <h2 className="text-lg font-semibold">{movie.Title}</h2>
      <p className="text-sm">{movie.Year}</p>
    </Link>
  );
}
