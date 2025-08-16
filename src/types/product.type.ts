export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  images: FileList | File[] | { [key: string]: File };
  inventoryCount: number;
}
export interface UpdateProduct extends CreateProduct {
  id: number;
}
// Product returned from API
export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inventoryCount: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  userId: number;
}
