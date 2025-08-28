import { create } from "zustand";
import type { ProductData } from "../types/product.type";

const CART_KEY = "cartItems";

// Cart product with quantity
interface CartProduct extends ProductData {
  id: number;
  quantity: number;
}

const getInitialCart = (): CartProduct[] => {
  const saved = localStorage.getItem(CART_KEY);
  return saved ? JSON.parse(saved) : [];
};

interface CartStore {
  cartItems: CartProduct[];
  totalCartItems: number;
  addToCart: (product: ProductData) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  cartItems: getInitialCart(),
  totalCartItems: getInitialCart().reduce(
    (acc, item) => acc + item.quantity,
    0,
  ),
  addToCart: (product: ProductData) =>
    set((state) => {
      const existing = state.cartItems.find((p) => p.id === product.id);
      let newCart;
      if (existing) {
        newCart = state.cartItems.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      } else {
        newCart = [...state.cartItems, { ...product, quantity: 1 }];
      }
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      return {
        cartItems: newCart,
        totalCartItems: getInitialCart().reduce(
          (acc, item) => acc + item.quantity,
          0,
        ),
      };
    }),

  removeCartItem: (id: number) =>
    set((state) => {
      const newCart = state.cartItems.filter((p) => p.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      return {
        cartItems: newCart,
        totalCartItems: getInitialCart().reduce(
          (acc, item) => acc + item.quantity,
          0,
        ),
      };
    }),

  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    set({ cartItems: [], totalCartItems: 0 });
  },
}));

export default useCartStore;
