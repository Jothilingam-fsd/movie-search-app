export default function FilterDropdown({ selected, onSelect }) {
    return (
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="border p-2"
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
    );
  }
  