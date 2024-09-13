interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalElementsCount: number;
  onPageChange: (newPageNumber: number) => void;
}

const Pagination = ({
  pageNumber,
  pageSize,
  totalElementsCount,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalElementsCount / pageSize);

  return (
    <div className="flex items-center space-x-2">
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(pageNumber - 1)}
        disabled={pageNumber === 0}
        className={`px-3 py-1 rounded ${
          pageNumber === 0
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        &#60;
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`px-3 py-1 rounded ${
            pageNumber === index
              ? "bg-petrol text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(pageNumber + 1)}
        disabled={(pageNumber + 1) * pageSize >= totalElementsCount}
        className={`px-3 py-1 rounded ${
          (pageNumber + 1) * pageSize >= totalElementsCount
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-petrol text-white"
        }`}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
