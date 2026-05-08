import { useState } from 'react';
import CartPanel from '../components/cart/CartPanel';
import ProductCard from '../components/products/ProductCard';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import PaginationControls from '../components/ui/PaginationControls';
import { useProducts } from '../hooks/useProducts';

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { data, isLoading, isError, error } = useProducts({ page, size: 8, keyword });

  if (isLoading) return <LoadingState text="Loading products..." />;
  if (isError) return <ErrorState message={error?.response?.data?.message || 'Cannot load products'} />;

  return (
    <div className="products-layout">
      <section>
        <h2>Products</h2>
        <div className="toolbar">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Filter by keyword..."
          />
          <button
            onClick={() => {
              setPage(0);
              setKeyword(searchInput);
            }}
          >
            Search
          </button>
        </div>
        <div className="grid">
          {data.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <PaginationControls
          page={data.number}
          totalPages={data.totalPages}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      </section>
      <CartPanel />
    </div>
  );
}
