import { useState } from 'react';
import ErrorState from '../components/ui/ErrorState';
import LoadingState from '../components/ui/LoadingState';
import PaginationControls from '../components/ui/PaginationControls';
import { useMyOrders } from '../hooks/useOrders';

export default function OrderHistoryPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error } = useMyOrders({ page, size: 10 });

  if (isLoading) return <LoadingState text="Loading orders..." />;
  if (isError) return <ErrorState message={error?.response?.data?.message || 'Cannot load orders'} />;

  return (
    <div>
      <h2>My Orders</h2>
      {data.content.map((order) => (
        <div key={order.orderId} className="card">
          <h4>Order #{order.orderId}</h4>
          <div>Status: {order.status}</div>
          <div>Total: ${order.totalAmount}</div>
          <ul>
            {order.items.map((item) => (
              <li key={item.productId}>
                {item.productName} - qty {item.quantity} x ${item.unitPrice}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <PaginationControls
        page={data.number}
        totalPages={data.totalPages}
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
