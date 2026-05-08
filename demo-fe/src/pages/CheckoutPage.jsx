import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ui/ErrorState';
import { useCreateOrder } from '../hooks/useOrders';
import { useCartStore } from '../store/cartStore';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCartStore();
  const createOrderMutation = useCreateOrder();
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    setMessage('');
    try {
      await createOrderMutation.mutateAsync({
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      });
      clearCart();
      setMessage('Checkout success!');
      navigate('/orders');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Checkout failed');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.productId}>
                {item.productName} - {item.quantity} x ${item.unitPrice}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount().toFixed(2)}</h3>
          <button onClick={handleCheckout} disabled={createOrderMutation.isPending}>
            {createOrderMutation.isPending ? 'Processing...' : 'Place Order'}
          </button>
        </>
      )}
      {message && <ErrorState message={message} />}
    </div>
  );
}
