import { useCallback, useEffect, useState } from 'react';
import { searchMovies } from '../api/omdb';

const Home = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  const fetchResults = useCallback(async () => {
    try {
      const data = await searchMovies(query, page, type);
      if (data.Response === 'True') {
        setResults(data.Search);
        setTotal(Number(data.totalResults));
        setError('');
      } else {
        setResults([]);
        setTotal(0);
        setError(data.Error || 'No results found');
      }
    } catch {
      setError('Failed to fetch movies.');
    }
  }, [query, page, type]);

  useEffect(() => {
    if (query) fetchResults();
  }, [fetchResults, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchResults();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie Search App</h1>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="border border-gray-300 p-2 rounded flex-1"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {total > 0 && <p className="mb-4">Total Results: {total}</p>}

      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((movie) => (
          <li key={movie.imdbID} className="border rounded overflow-hidden shadow hover:shadow-lg transition-shadow">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
              alt={movie.Title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{movie.Title}</h2>
              <p className="text-sm text-gray-600">{movie.Year}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
