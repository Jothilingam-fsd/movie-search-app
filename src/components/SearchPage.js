
import { useState, useEffect } from 'react';
import { fetchMovies } from '../api/omdbService';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState('');

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      const data = await fetchMovies(query, page, type);
      setMovies(data.Search || []);
      setTotalResults(data.totalResults);
      setLoading(false);
    };

    if (query) {
      handleSearch();
    }
  }, [query, page, type]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      <select
        onChange={(e) => setType(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-56 object-cover" />
            <h3 className="text-lg font-semibold">{movie.Title}</h3>
            <p>{movie.Year}</p>
            <Link to={`/movie/${movie.imdbID}`} className="text-blue-500">View Details</Link>
          </div>
        ))}
      </div>
      {totalResults > 0 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            className="px-4 py-2 border rounded"
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded"
            disabled={page * 10 >= totalResults}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
