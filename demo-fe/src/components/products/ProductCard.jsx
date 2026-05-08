import { useCartStore } from '../../store/cartStore';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.description || 'No description'}</p>
      <div>Price: ${product.price}</div>
      <div>Inventory: {product.inventory}</div>
      <button onClick={() => addToCart(product, 1)} disabled={product.inventory <= 0}>
        Add to cart
      </button>
    </div>
  );
}
