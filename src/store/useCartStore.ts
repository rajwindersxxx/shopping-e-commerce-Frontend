import { create } from "zustand";
import type { ProductData } from "../types/product.type";

const CART_KEY = "cartItems";

// This is the product type with quantity for cart
interface CartProduct extends ProductData {
  id: number
  quantity: number;
}

const getInitialCart = (): CartProduct[] => {
  const saved = localStorage.getItem(CART_KEY);
  return saved ? JSON.parse(saved) : [];
};

interface CartStore {
  cartItems: CartProduct[];
  totalCartItems: () => number;
  addToCart: (product: ProductData) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartItems: getInitialCart(),
  totalCartItems: () => get().cartItems.reduce((acc, item) => acc + item.quantity, 0),
  addToCart: (product: ProductData) =>
    set((state) => {
      const existing = state.cartItems.find((p) => p.id === product.id);
      let newCart;
      if (existing) {
        // increase quantity if item already exists
        newCart = state.cartItems.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // first time adding, set quantity = 1
        newCart = [...state.cartItems, { ...product, quantity: 1 }];
      }
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      return { cartItems: newCart };
    }),

  removeCartItem: (id: number) =>
    set((state) => {
      const newCart = state.cartItems.filter((p) => p.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
      return { cartItems: newCart };
    }),

  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    set({ cartItems: [] });
  },
}));

export default useCartStore;
