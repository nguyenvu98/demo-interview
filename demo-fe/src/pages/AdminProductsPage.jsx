import { useState } from 'react';
import ProductForm from '../components/products/ProductForm';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import PaginationControls from '../components/ui/PaginationControls';
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from '../hooks/useProducts';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(null);
  const { data, isLoading, isError, error } = useProducts({ page, size: 8, keyword: '' });
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const handleCreate = async (payload) => {
    await createMutation.mutateAsync(payload);
  };

  const handleUpdate = async (payload) => {
    await updateMutation.mutateAsync({ id: editing.id, payload });
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  if (isLoading) return <LoadingState text="Loading admin products..." />;
  if (isError) return <ErrorState message={error?.response?.data?.message || 'Cannot load products'} />;

  return (
    <div>
      <h2>Admin - Manage Products</h2>
      <div className="split">
        <div>
          <h3>{editing ? `Edit #${editing.id}` : 'Create Product'}</h3>
          <ProductForm
            initialValues={editing || undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
            submitText={editing ? 'Update' : 'Create'}
            onCancel={editing ? () => setEditing(null) : undefined}
          />
        </div>
        <div>
          {data.content.map((product) => (
            <div key={product.id} className="card">
              <strong>{product.name}</strong> - ${product.price} - stock {product.inventory}
              <div className="actions">
                <button onClick={() => setEditing(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
          <PaginationControls
            page={data.number}
            totalPages={data.totalPages}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => p + 1)}
          />
        </div>
      </div>
    </div>
  );
}
