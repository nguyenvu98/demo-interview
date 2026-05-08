import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function CartPanel() {
  const { items, updateQty, removeItem, totalAmount } = useCartStore();

  return (
    <aside className="cart">
      <h3>Cart</h3>
      {items.length === 0 && <p>Empty cart</p>}
      {items.map((item) => (
        <div key={item.productId} className="cart-item">
          <div>
            <strong>{item.productName}</strong>
            <div>
              ${item.unitPrice} x {item.quantity}
            </div>
          </div>
          <div className="cart-actions">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQty(item.productId, Number(e.target.value))}
            />
            <button onClick={() => removeItem(item.productId)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">Total: ${totalAmount().toFixed(2)}</div>
      <Link to="/checkout">
        <button disabled={items.length === 0}>Go to checkout</button>
      </Link>
    </aside>
  );
}
