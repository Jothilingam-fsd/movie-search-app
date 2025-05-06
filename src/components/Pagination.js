export default function Pagination({ currentPage, totalResults, onPageChange }) {
    const totalPages = Math.ceil(totalResults / 10);
  
    return (
      <div className="flex gap-2 justify-center my-4">
        {currentPage > 1 && (
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => onPageChange(currentPage - 1)}>
            Prev
          </button>
        )}
        {currentPage < totalPages && (
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    );
  }
  