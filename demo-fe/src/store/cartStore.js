import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((item) => item.productId === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            productName: product.name,
            unitPrice: product.price,
            quantity,
          },
        ],
      };
    }),
  updateQty: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    })),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
  clearCart: () => set({ items: [] }),
  totalAmount: () =>
    get().items.reduce((sum, item) => sum + Number(item.unitPrice) * Number(item.quantity), 0),
}));
