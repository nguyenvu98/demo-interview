export default function PaginationControls({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page <= 0}>
        Prev
      </button>
      <span>
        Page {page + 1} / {totalPages || 1}
      </span>
      <button onClick={onNext} disabled={totalPages === 0 || page + 1 >= totalPages}>
        Next
      </button>
    </div>
  );
}
