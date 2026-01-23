import type { Product } from "./product";

export type { Product };

export type OrderItem = {
  quantity: number;
  productPrice: number;
  productId: string;
  imagePath: string;
  price: number;
  description: string;
  /**
   * @deprecated Do not use this field
   */
  manufacturer: string;
  productName: string;
};

export type Order = {
  id: number;
  creationDate: string;
  amount: number;
  products: OrderItem[];
};
