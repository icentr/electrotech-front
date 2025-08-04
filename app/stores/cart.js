import { defineStore } from "pinia";
import { getImageUrl } from "../api";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    promoCode: "",
    discountPercent: 0,
  }),

  getters: {
    subtotal: (state) => {
      return state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    discount: (state) => {
      return (state.subtotal * state.discountPercent) / 100;
    },
    total: (state) => {
      return state.subtotal - state.discount;
    },
    totalItems: (state) => {
      return state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartItemsCount: (state) => {
      return state.cartItems.length;
    },
  },

  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({
          id: product.id,
          name: product.name,
          code: product.code || `PRD-${product.id}`,
          price: parseFloat(product.price.toString().replace(/\s/g, "")),
          quantity: 1,
          imagePath: getImageUrl(product.imagePath),
        });
      }
    },

    removeFromCart(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      if (this.cartItems.length === 0) {
        this.promoCode = "";
        this.discountPercent = 0;
      }
    },

    updateQuantity(id, newQuantity) {
      if (newQuantity < 1) newQuantity = 1;
      const item = this.cartItems.find((item) => item.id === id);
      if (item) item.quantity = newQuantity;
    },

    applyPromoCode(code) {
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
