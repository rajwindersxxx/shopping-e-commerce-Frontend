import { create } from "zustand";
interface ProductState {
  paginationLimit: number;
  totalProducts: number;
  search: string | undefined;
  category: string | undefined;
  setTotalProducts: (total: number) => void;
  setSearch: (x: string) => void;
  setCategory: (x: string) => void;
}
const useProductStore = create<ProductState>((set) => ({
  paginationLimit: 10,
  totalProducts: 0,
  search: undefined,
  category: undefined,
  setCategory: (category: string) => set(() => ({ category: category })),
  setSearch: (search: string) => set(() => ({ search: search.trim() })),
  setTotalProducts: (total: number) => set(() => ({ totalProducts: total })),
}));
export default useProductStore;
