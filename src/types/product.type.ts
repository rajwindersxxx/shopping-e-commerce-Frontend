export interface  CreateProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  images: File[];
  inventoryCount: number;
};
// Product returned from API
export interface  ProductData  {
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
};





