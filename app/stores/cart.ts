import { defineStore } from "pinia";
import { getImageUrl } from "@/utils";
import type { Product } from "~/models";

export interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as CartItem[],
    promoCode: "",
    discountPercent: 0,
  }),

  getters: {
    subtotal(): number {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    discount(): number {
      return (this.subtotal * this.discountPercent) / 100;
    },
    total(): number {
      return this.subtotal - this.discount;
    },
    totalItems(): number {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartItemsCount(): number {
      return this.cartItems.length;
    },
  },

  actions: {
    isInCart(product: Product) {
      return this.cartItems.some((item) => item.id === product.id);
    },
    addToCart(product: Product) {
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        console.log(product);
        this.cartItems.push({
          description: product.description,
          count: product.count,
          id: product.id,
          name: product.name,
          articleNumber: product.articleNumber,
          price: product.price,
          imagePath: getImageUrl(product.imagePath),
          currency: product.currency,

          quantity: 1,
        });
      }
    },

    removeFromCart(id: string) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      if (this.cartItems.length === 0) {
        this.promoCode = "";
        this.discountPercent = 0;
      }
    },

    updateQuantity(id: string, newQuantity: number) {
      if (newQuantity < 1) newQuantity = 1;
      const item = this.cartItems.find((item) => item.id === id);
      if (item) item.quantity = newQuantity;
    },

    applyPromoCode(code: string) {
      if (code.toUpperCase() === "SALE10") {
        this.discountPercent = 10;
        this.promoCode = code;
        return true;
      }
      return false;
    },

    clearCart() {
      this.cartItems = [];
      this.promoCode = "";
      this.discountPercent = 0;
    },
  },

  persist: true,
});
